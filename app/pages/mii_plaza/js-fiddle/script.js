import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Optional.
// Dependencies for body scaling.
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { addSkeletonScalingExtensions } from './FFL.js/helpers/SkeletonScalingExtensions.js';
import { detectModelDesc, applyScaleDesc } from './FFL.js/helpers/ModelScaleDesc.js';
// Material classes.
import FFLShaderMaterial from './FFL.js/materials/FFLShaderMaterial.js';
import SampleShaderMaterial from './FFL.js/materials/SampleShaderMaterial.js';

// Enable extensions to Three.js needed to enable body scaling.
addSkeletonScalingExtensions(THREE.Skeleton); // Only call once.

/**
 * Global object for storing all available material classes.
 * @type {Object<string, function(new: import('three').Material, ...*): import('three').Material>}
 */
const materials = {
	// from ffl.js
	FFLShaderMaterial
};

// URLs for body models.
const maleBodyUrl = "https://cdn.jsdelivr.net/gh/ariankordi/ffl-raylib-samples@latest/models/miibodymiddle%20male%20test.glb";
const femaleBodyUrl = "https://cdn.jsdelivr.net/gh/ariankordi/ffl-raylib-samples@latest/models/miibodymiddle%20female%20test.glb";
// TODO: It may be worth having different "sets" of the two models.

// // ---------------------------------------------------------------------
// //  Mii Definitions (All below are available in FFL.js.)
// //  Gender, getBodyScale, favorite and pants colors
// // ---------------------------------------------------------------------

/**
 * Genders for each body model.
 * @enum {number}
 */
const Gender = {
	Male: 0,
	Female: 1
};

/**
 * Also available in FFL.js as CharModel.getBodyScale().
 * @param {number} build - Build value from 0-127.
 * @param {number} height - Height value from 0-127.
 * @returns {THREE.Vector3Like} Scale vector for the body model.
 */
function getBodyScale(build, height) {
	// calculated here in libnn_mii/draw/src/detail/mii_VariableIconBodyImpl.cpp:
	// void nn::mii::detail::`anonymous namespace'::GetBodyScale(struct nn::util::Float3 *, int, int)
	// also in Mii Maker USA (0x000500101004A100 v50 ffl_app.rpx): FUN_020737b8
	const m = 128.0;
	const x = (build * (height * (0.47 / m) + 0.4)) / m +
		height * (0.23 / m) + 0.4;
	const y = (height * (0.77 / m)) + 0.5;

	return { x, y, z: x }; // z is always set to x
}

/* Generate below table using:
function floatsToHex(r, g, b) {
  const ri = Math.round(parseFloat(r) * 255);
  const gi = Math.round(parseFloat(g) * 255);
  const bi = Math.round(parseFloat(b) * 255);
  return (ri << 16) | (gi << 8) | bi;
}
const favoriteColorTable = source
  .trim()
  .split(/\n/)
  .map(line => {
    const nums = line.match(/[\d.]+/g); // grab numbers
    if (!nums) return null;
    const hex = floatsToHex(nums[0], nums[1], nums[2]);
    return `new THREE.Color(0x${hex.toString(16).padStart(6, "0")})`;
  })
  .filter(Boolean);
  console.log("const favoriteColorTable = [\n\t" + favoriteColorTable.join(",\n\t") + "\n];");
*/
/**
 * Mii favorite color to THREE.Color table.
 * Reference: https://github.com/aboood40091/ffl/blob/73fe9fc70c0f96ebea373122e50f6d3acc443180/src/FFLiColor.cpp#L324-L337
 */
const favoriteColorTable = [
	0xd21e14, 0xff6e19, 0xffd820, 0x78d220, 0x007830,
	0x0a48b4, 0x3caade, 0xf55a7d, 0x7328ad, 0x483818,
	0xe0e0e0, 0x181814
];

/** Constant pants color used. */
const pantsColorGrayNormal = 0x40474E;

// // ---------------------------------------------------------------------
// //  Globals, Renderer State, Mii Model Properties
// // ---------------------------------------------------------------------

/** @type {import('three').Scene} */
let scene;
/** @type {import('three').WebGLRenderer} */
let renderer;
/** @type {import('three').PerspectiveCamera} */
let camera;
/** @type {import('three/examples/jsm/controls/OrbitControls.js').OrbitControls} */
let controls;
// Animation-related state.
/** @type {THREE.AnimationMixer|null} */
let mixer = null;
/** @type {THREE.Clock} */
const clock = new THREE.Clock();

/**
 * A body model with its ModelScaleDesc and animations altogether.
 * @typedef {Object} BodyModel
 * @property {THREE.Object3D} model
 * @property {Array<THREE.AnimationClip>} animations - AnimationClips from the glTF.
 * @property {ModelScaleDesc} scaleDesc
 */

/**
 * Contains body models for each gender.
 * The value is the GLTFLoader GLTF type, since it contains animations.
 * @type {Record<Gender, import('three/examples/jsm/loaders/GLTFLoader.js').GLTF>}
 */
const bodyTemplates = [];

// State of Mii models in the scene.
/** @type {THREE.Group|null} */
let currentHead = null;
/** @type {BodyModel|null} */
let currentBody = null;
/** @type {THREE.Mesh|null} */
let currentShadowModel = null;

let activeMaterialClassName = Object.keys(materials)[0];

/** Mii properties extracted from the loaded head model. */
const additionalInfo = {
	gender: Gender.Male,
	favoriteColor: 11, // Black
	height: 100,
	build: 55,
	// All of the above are available in FFLAdditionalInfo.
	/**
	 * Info needed from Switch shader. This is available from
	 * the charInfo Base64 in glTF models, or .getColorInfo() for FFL.js CharModel.
	 * @type {SampleShaderMaterialColorInfo|null}
	 */
	colorInfo: null
};
// Current properties for the Mii model.
let build = 55;
let height = 100;
let gender = Gender.Male;

// // ---------------------------------------------------------------------
// //  Scene Setup
// // ---------------------------------------------------------------------

/**
 * Adds {@link THREE.AmbientLight} and {@link THREE.DirectionalLight} to
 * a scene, using values similar to what the FFLShader is using.
 * @param {import('three').Scene} scene - The scene to add lights to.
 * @todo Why does it look worse when WebGLRenderer.useLegacyLights is not enabled?
 */
function addLightsToScene(scene) {
	const intensity = Number(THREE.REVISION) >= 155 ? Math.PI : 1.0;
	const ambientLight = new THREE.AmbientLight(new THREE.Color(0.73, 0.73, 0.73), intensity);
	const directionalLight = new THREE.DirectionalLight(
		new THREE.Color(0.60, 0.60, 0.60), intensity);
	directionalLight.position.set(-0.455, 0.348, 0.5);
	scene.add(ambientLight, directionalLight);
}

/** The working color space, needed to set colors from hex without conversion. */
const workingSpace = THREE.ColorManagement ? THREE.ColorManagement.workingColorSpace : '';
/**
 * Loads a hex color that is always in the current space, assumed to be sRGB.
 * @param {number} hex - Hexadecimal/numerical color value.
 * @returns {import('three').Color} The THREE.Color corresponding to the value.
 */
const colorFromHex = hex => new THREE.Color().setHex(hex, workingSpace);

/**
 * Initializes the Three.js renderer, scene,
 * camera, controls, lights, and adds a grid.
 */
function initRendererAndScene() {
	// Create and initialize scene.
	scene = new THREE.Scene();
	scene.background = colorFromHex(0xE6E6FA);

	// Create the WebGLRenderer with antialiasing for more visual appeal.
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	addLightsToScene(scene);

	// Opt-out of color management and stick with sRGB.
	if (THREE.ColorManagement) {
		THREE.ColorManagement.enabled = false; // Ensures Color3s will be treated as sRGB.
	}
	renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // Makes shaders work in sRGB

	// Create camera.
	camera = new THREE.PerspectiveCamera(15,
		window.innerWidth / window.innerHeight, 10, 3000);
	camera.position.set(0.0, 11.0, 120);

	// @ts-ignore -- PerspectiveCamera is not assignable to Camera in my version?
	controls = new OrbitControls(camera, renderer.domElement);
	controls.minDistance = 8;
	controls.maxDistance = 2000;
	controls.target.set(0, 8.0, 0);
	controls.update();

	// Basic resize handler.
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}

// // ---------------------------------------------------------------------
// //  Model Loading Helpers
// // ---------------------------------------------------------------------

/**
 * Async wrapper to load a GLTF model from URL.
 * @param {string} url - The URL to load the glTF model from.
 * @returns {Promise<import('three/examples/jsm/loaders/GLTFLoader.js').GLTF>}
 * The GLTF object. `gltf.scene` contains the mesh group.
 */
const loadGLTF = async url =>
	new Promise((resolve, reject) => {
		new GLTFLoader().load(url, resolve, undefined, reject);
	});

/**
 * Loads and processes a head model from a glTF URL.
 * This can mimic creating a CharModel from ffl.js.
 * It applies the shader, renderOrder, and extracts props into {@link additionalInfo}.
 * @param {string} url - The URL of the glTF for the head/CharModel.
 * @returns {Promise<THREE.Group>} A new Promise that will return the head meshes in a group.
 */
async function loadCharModelFromGLTF(url) {
	const gltf = await loadGLTF(url);

	// Set additionalInfo and colorInfo from the metadata if available.
	const extras = gltf.asset.extras;
	if (extras && extras.additionalInfo) {
		// THIS IS WHERE THE CHANGES HAPPEN
		const info = extras.additionalInfo;
		additionalInfo.height = info.height;
		additionalInfo.build = info.build;
		additionalInfo.gender = info.gender;
		additionalInfo.favoriteColor = info.favoriteColor;
		additionalInfo.colorInfo =
			SampleShaderMaterial.getColorInfoFromCharInfoB64(extras.charInfo);
	}

	const model = gltf.scene;

	// Apply the material class. It will read modulateMode/Type from userData.
	applyMaterialToGroup(model, activeMaterialClassName, additionalInfo.colorInfo);

	// Set material color, set renderOrder, and fix texture color space.
	model.traverse((mesh) => {
		if (!(mesh instanceof THREE.Mesh)) {
			return;
		}
		const userData = mesh.geometry.userData;
		const material = /** @type {THREE.MeshBasicMaterial} */ (mesh.material);

		if ('modulateType' in userData) {
			// Set render order for translucent meshes.
			mesh.renderOrder = userData.modulateType;
		}
		// Set the material color from modulateColor.
		// It's worth noting that the default glTF color is always in linear space.
		if (Array.isArray(userData.modulateColor)) {
			material.color = material.color.fromArray(userData.modulateColor);
		}

		// HACK: Allow the material class to modify the geometry if it needs to.
		if ('modifyBufferGeometry' in material.constructor && // Static function
			typeof material.constructor.modifyBufferGeometry === 'function') {
			material.constructor.modifyBufferGeometry(
				{ modulateParam: { type: userData.modulateType } }, mesh.geometry);
		}

		if (material.map) {
			// Force the glTF's texture to use sRGB colors.
			material.map.colorSpace = THREE.LinearSRGBColorSpace;
		}
	});

	return model;
}

/**
 * Preloads male and female body GLTFs.
 * @returns {Promise<void>} A new Promise that completes when the models are loaded.
 */
const preloadBodyTemplates = () =>
	Promise.all([loadGLTF(maleBodyUrl), loadGLTF(femaleBodyUrl)]).then((values) => {
		bodyTemplates[Gender.Male] = values[0];
		bodyTemplates[Gender.Female] = values[1];
	});

/**
 * @param {number} gender
 */
function loadBodyModel(gender) {
	const gltf = bodyTemplates[gender];
	if (!gltf) {
		throw new Error(`No body template for gender ${gender}`);
	}

	/**
	 * Cloned scene/group to avoid modifying the template.
	 * In order to maintain proper skinning/armature animations,
	 * SkeletonUtils.clone is used instead of gltf.scene.clone(true);
	 * per donmccurdy's recommendation: https://discourse.threejs.org/t/how-to-clone-a-gltf/78858/2
	 * @type {THREE.Object3D}
	 */
	const model = SkeletonUtils.clone(gltf.scene);
	// model.position.y = 45;

	// Assign one animation from the glTF model.
	const animations = gltf.animations;
	if (animations.length) {
		// Always replace the existing mixer.
		mixer = new THREE.AnimationMixer(model);

		// Use the animation named 'Wait' if it exists, otherwise choose the first one.
		let clip = animations.find(a => a.name === 'Wait');
		if (!clip) {
			clip = animations[0];
		}

		mixer.clipAction(clip).play()
			.setLoop(THREE.LoopRepeat, Infinity);
	}

	const scaleDesc = detectModelDesc(model);

	return { model, scaleDesc, animations };
}

// // ---------------------------------------------------------------------
// //  Body Model Setup
// // ---------------------------------------------------------------------

/**
 * Searches the Object3D for a SkinnedMesh that contains the given bone.
 * @param {THREE.Object3D} root - Where to search for the SkinnedMesh.
 * @param {string} boneName - Name of the bone in the parent SkinnedMesh to find.
 * @returns {THREE.SkinnedMesh|null} The SkinnedMesh containing the bone, or null if it was not found.
 */
function findSkinnedMeshWithBone(root, boneName) {
	let found = /** @type {THREE.SkinnedMesh|null} */ (null);
	root.traverse((node) => {
		if (found || !(node instanceof THREE.SkinnedMesh)) {
			return;
		}
		if (node.skeleton.bones.some(bone => bone.name === boneName)) {
			found = node;
		}
	});
	return found;
}

/**
 * Finds body and pants meshes, and applies modulateMode/modulateType.
 * @param {THREE.Object3D} model - The body model meshes.
 */
function applyModulateToBody(model) {
	/** @type {THREE.SkinnedMesh|null} */
	let lastSkinnedMesh = null;
	// To find the pants, let's find the last SkinndMesh and assume that's it.
	model.traverse((node) => {
		if (node instanceof THREE.SkinnedMesh) {
			lastSkinnedMesh = node;
		}
	});
	// (TODO: This method will NOT WORK for body models extracted from Miitomo PODs.)

	let meshIndex = 0;
	model.traverse((mesh) => {
		// The reason this is identifying SkinnedMesh instead of just Mesh
		// is to avoid detecting the head model. But, if the head is also
		// a SkinnedMesh and it's attached to the body, then it will catch here.
		if (!(mesh instanceof THREE.SkinnedMesh)) {
			return;
		}

		/**
		 * Assume that the mesh is pants if it is the last
		 * skinned mesh, or even. Otherwise, a it's the body.
		 */
		const isPants = lastSkinnedMesh
			? mesh.id === lastSkinnedMesh.id
			// If there is no lastSkinnedMesh, then assume this
			// is the pants if it is the second mesh.
			: (meshIndex % 2 === 0);

		mesh.geometry.userData.modulateMode = 0; // Constant color/opaque.
		mesh.geometry.userData.modulateType = isPants
			? 10 // Pants
			: 9; // Body

		meshIndex++;
	});
}

/**
 * Applies colors and the current material to the body/pants.
 * @param {THREE.Object3D} body - The body model to prepare.
 * @param {typeof additionalInfo} info - The additionalInfo representing the CharModel's traits.
 * @param {number} build - The factor determining X/Z scale/weight.
 * @param {number} height - The factor determining Y scale/height.
 */
function prepareBodyForCharModel(body, info, build, height) {
	applyModulateToBody(body); // Add modulateMode/modulateType.
	applyMaterialToGroup(body, activeMaterialClassName, info.colorInfo);

	const pantsColor = colorFromHex(pantsColorGrayNormal);
	const favoriteColor = colorFromHex(favoriteColorTable[info.favoriteColor]);

	// Set the colors on the body model.
	body.traverse((mesh) => {
		// The reason this is identifying SkinnedMesh instead of just Mesh
		// is to avoid detecting the head model. But, if the head is also
		// a SkinnedMesh and it's attached to the body, then it will catch here.
		if (!(mesh instanceof THREE.SkinnedMesh) ||
			!('modulateType' in mesh.geometry.userData)) {
			return;
		}
		if (mesh.geometry.userData.modulateType === 9) { // Body
			mesh.material.color = favoriteColor;
		} else if (mesh.geometry.userData.modulateType === 10) { // Pants
			mesh.material.color = pantsColor;
		}
	});

	updateBodyScale(body, build, height);
}

/**
 * Updates scale for the bones on the body.
 * @param {THREE.Object3D} body - The body model.
 * @param {number} build - The factor determining X/Z scale/weight.
 * @param {number} height - The factor determining Y scale/height.
 * @returns {void}
 * @todo This uses {@link detectModelDesc} every time, but that
 * could instead be stored alongside the loaded body model
 * to avoid walking through it every time.
 */
const updateBodyScale = (body, build, height) => {
	const bodyScale = getBodyScale(build, height);
	console.log({body, build, height, bodyScale});

	applyScaleDesc(body, bodyScale, detectModelDesc(body));

	// applyScaleDesc(body,
	// 	/* scaleVector */ getBodyScale(build, height),
	// 	/* desc */ detectModelDesc(body))
};

/** The absolute world-scale of the head divided by the body's scale. */
const headToBodyScale = 10.0 / 7.0;

/**
 * Attaches the head model to the body model's head bone.
 * Also calls {@link SkeletonWithAttachments.attach} so that the head
 * model's position follows the scaled head bone without getting scaled itself.
 * @param {BodyModel} body - The body model to attach the head ot.
 * @param {THREE.Group} head - The head (CharModel) to attach.
 * @throws {Error} Throws if the head bone or SkinnedMesh was not found.
 */
function attachHeadToBody(body, head) {
	//  * @param {string} headBoneName - The name of the head bone from {@link typeof ModelScaleDesc.head}.
	const headBoneName = body.scaleDesc.head;
	if (headBoneName === 'Head') {
		console.error('TODO: Head is not attached correctly to the Miitomo body. Skipping it so you can see what the model looks like anyway.');
		return;
	}

	const headBone = body.model.getObjectByName(headBoneName);
	if (!(headBone instanceof THREE.Bone)) {
		throw new Error('Head bone not found.');
	}
	// Locate the skeleton in the SkinnedMesh, needed to call attach().
	const skinnedMesh = findSkinnedMeshWithBone(body.model, headBoneName);
	if (!skinnedMesh) {
		throw new Error('No skinned mesh with head bone.');
	}
	const skeleton = /** @type {SkeletonWithAttachments} */ (skinnedMesh.skeleton);

	// Set head to body scale ratio.
	// Multiply by 0.1, assuming the body's world scale was normalized to 1.0.
	head.scale.setScalar(0.1 * headToBodyScale);

	// Add the model to the scene, and attach it to the SkeletonWithAttachments.
	headBone.add(head); // This will render it.
	skeleton.attach(head, headBoneName); // This positions it with the scaled bone.
}

// // ---------------------------------------------------------------------
// //  Handlers for Swapping Models
// // ---------------------------------------------------------------------

/**
 * Updates the head and body based on the CharModel,
 * then removes the old ones from the scene.
 * @param {THREE.Group} headModel - The new head model.
 */
function updateCharModel(headModel) {
	// breakFrameCounter = 0; // Use with breakOnCounter
	// Update global state from the new CharModel.
	build = additionalInfo.build;
	height = additionalInfo.height;
	gender = additionalInfo.gender;

	// Load the new body.
	const oldMixer = mixer;
	const newBody = loadBodyModel(gender);

	// Dispose and remove the old head.
	if (currentHead) {
		currentHead.removeFromParent(); // Remove from body group.
		disposeModel(currentHead);
	}

	currentHead = headModel;

	// Ready to replace the old body model now.
	reloadBodyModelInScene(newBody, oldMixer);
}

/**
 * @param {BodyModel} newBody - The body model to replace in the scene.
 * @param {THREE.AnimationMixer|null} oldMixer - A reference to the mixer for the old model.
 */
function reloadBodyModelInScene(newBody, oldMixer) {
	// Set uniforms on the new body model, and attach the head to it.
	prepareBodyForCharModel(newBody.model, additionalInfo, build, height);
	if (currentHead) {
		attachHeadToBody(newBody, currentHead);
	}
	// Attach the shadow too, which should already be in the scene.
	if (currentShadowModel) {
		attachShadowModelToBody(newBody, currentShadowModel);
	}
	// Dispose and remove the current body model from the scene.
	if (currentBody) {
		scene.remove(currentBody.model);
		if (oldMixer) { // Dispose mixer resources for this.
			oldMixer.stopAllAction();
			oldMixer.uncacheRoot(currentBody.model);
		}
		disposeModel(currentBody.model);
		// Remove all skeleton attachments.
		currentBody.model.traverse((node) => {
			if (node instanceof THREE.SkinnedMesh) {
				const skeleton = /** @type {SkeletonWithAttachments} */ (node.skeleton);
				if (currentHead && skeleton.detachAll) {
					skeleton.detachAll();
				}
			}
		});
	}
	// Add the body, which contains the head, to the scene.
	scene.add(newBody.model);
	currentBody = newBody;
}

// // ---------------------------------------------------------------------
// //  Shadow Model/Texture
// // ---------------------------------------------------------------------

/**
 * Creates a quad mesh for the shadow below the body model.
 * @returns {THREE.Mesh} The shadow mesh.
 */
function createShadowModel() {
	// const geometry = new THREE.PlaneGeometry(7.5); // Not quite right.
	// Vertex data for the shadow_model from MiiTop.bfres.
	const position = new Float32Array([
		-3.75, 0, -3.75,
		3.75, 0, 3.75,
		3.75, 0, -3.75,
		-3.75, 0, 3.75
	]);
	const uv = new Float32Array([
		0, 0,
		2, 2,
		2, 0,
		0, 2
	]);
	const index = new Uint8Array([0, 1, 2, 3, 1, 0]);
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
	geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	geometry.setIndex(new THREE.Uint8BufferAttribute(index, 1));

	// The shadow texture, black = alpha, 32x32. Originally a BC4 texture in MiiTop.bfres.
	// It represents a radial gradient originating from the bottom right. SVG approximation:
	/*
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" baseProfile="tiny" style="transform:rotate(180deg)" version="1.2"><defs><radialGradient id="a" cx="0" cy="0" r="32" gradientUnits="userSpaceOnUse"><stop offset=".25" stop-color="#fff"/><stop offset="1"/></radialGradient></defs><rect fill="url(#a)" height="32" width="32" x="0" y="0"/></svg>
	*/
	const shadowImageDataUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAACXBIWXMAAA3XAAAN1wFCKJt4AAABJUlEQVQ4y3WTSXLDMAwEgdmo/784B4iUnDg4+IKunoHK7Pp/0N3V33dNEI3/AFEkgO7uL4AliQS/G+wbINCo3wY6Q/DO+GVwEtuWKPAP0FlJYsuidsvX2WtlbcXc8WHAuoZwLG/gMWBd61onZGp2t3b+uh5iDgGBrg1kvQjHkgg+Bq9PwtaUuA1MVvIQcwiBbXCStW5iasjTUnuf5E1MTWAibL+ICYmkbfBMkpVcp4bE2yD5OO6Y+Vpkt6okyXokhxCJVhUlyZYdexNZsQdozVgfjixbQqu4Rzo5udaVRAJUuJdbEydrCLNKRYA8lCVvwlVVKIAAwYeanNkX0GgA2J5JcuL9/h7iqEjJrwfa88ZeKkp8A9XPbOH5r1Z1dVVX9/PTfYAfsQsMgS5LNfoAAAAASUVORK5CYII=';

	// Load texture and set mirrored repeat wrapping.
	const shadowTexture = new THREE.TextureLoader().load(
		shadowImageDataUrl,
		(t) => {
			t.wrapS = THREE.MirroredRepeatWrapping;
			t.wrapT = THREE.MirroredRepeatWrapping;
			t.flipY = false; // Using GX2 coordinate system.
			t.needsUpdate = true;
		}
	);

	// From mt_shadow:
	// diffuse = 0.0, 0.0, 0.0
	// opacity = 0.2980392, 0.2980392, 0.2980392
	// ambient = 0.4, 0.4, 0.4
	// specular = 1.0, 1.0, 1.0
	const material = new THREE.MeshBasicMaterial({
		map: shadowTexture,
		transparent: true,
		depthWrite: false,
		blending: THREE.SubtractiveBlending,
		color: 0x666666 // 0.29804
	});

	return new THREE.Mesh(geometry, material);
}

/**
 * Attaches the shadow below the body model.
 * @param {BodyModel} body - The body model.
 * @param {THREE.Mesh} mesh - The existing shadow model.
 * @throws {Error} Throws if the bone on the body can't be found.
 */
function attachShadowModelToBody(body, mesh) {
	// const mesh = createShadowModel();
	// Anchor to the root.
	const boneName = body.scaleDesc.shadow;
	// I believe the way this is mounted in Wii U Mii Maker, is that "MiiTop.bfres"
	// is like a "wrapper" for the Mii body. shadow_model is in "MiiTopL", the body
	// is "mounted" in the bone "MiiL" but the shadow is high in the hierarchy.
	const shadowBone = body.model.getObjectByName(boneName);
	if (shadowBone && shadowBone instanceof THREE.Object3D) {
		const skinnedMesh = findSkinnedMeshWithBone(body.model, boneName);
		if (!skinnedMesh) {
			throw new Error(`Cannot find shadow bone: ${boneName}`);
		}
		// mesh.rotation.x = THREE.MathUtils.degToRad(-90); // Lay flat XZ

		// Add to scene.
		// shadowBone.add(mesh); // Add to scene.
		// Actually, if this is placed in the body model group, then
		// it will unintentionally be included for material changes.
		scene.add(mesh);
		// This will be a pain to track. detachAll() will control this.
		// Perhaps we should put attachment in the Object3D.
		/** @type {SkeletonWithAttachments} */ (skinnedMesh.skeleton)
			.attach(mesh, boneName, true);
	}
}

// // ---------------------------------------------------------------------
// //  Shader/Material Class Helpers
// // ---------------------------------------------------------------------

/**
 * Applies a new material class to the mesh and applying existing
 * parameters from the old material and userData to an FFL-compatible material.
 * Also see `onShaderMaterialChange` from FFL.js/examples/demo-basic.js.
 * @param {THREE.Mesh} mesh - The mesh to apply the material to.
 * @param {function(new: import('three').Material, ...*): import('three').Material} newMatClass -
 * The new material class to apply.
 * @param {SampleShaderMaterialColorInfo|null} colorInfo - Specific object needed for {@link SampleShaderMaterial}.
 */
function applyMaterialClassToMesh(mesh, newMatClass, colorInfo) {
	/** Whether the new material supports FFL swizzling. */
	const forFFLMaterial = 'modulateMode' in newMatClass.prototype;
	// Recreate material with same parameters but using the new shader class.
	const oldMat = /** @type {THREE.MeshBasicMaterial} */ (mesh.material);
	/** Get modulateMode/Type */
	const userData = mesh.geometry.userData;

	/** Do not include the parameters if forFFLMaterial is false. */
	const modulateModeType = forFFLMaterial
		? { // modulateMode/Type will be used from the userData or old material.
			modulateMode: 'modulateMode' in oldMat ? oldMat.modulateMode : userData.modulateMode ?? 0,
			// This setter will set side too:
			modulateType: 'modulateType' in oldMat ? oldMat.modulateType : userData.modulateType ?? 0
		}
		: {};

	/**
	 * Parameters for the shader material. Using SampleShaderMaterialParameters
	 * as a lowest common denominator, but others can also be used.
	 * @type {import('three').MeshBasicMaterialParameters
	 * & import('./FFL.js/materials/SampleShaderMaterial.js').SampleShaderMaterialParameters}
	 */
	const params = {
		// _side = original side from LUTShaderMaterial, must be set first
		side: ('_side' in oldMat) ? /** @type {THREE.Side} */ (oldMat._side) : oldMat.side,
		...modulateModeType,
		color: oldMat.color, // should be after modulateType
		transparent: Boolean(oldMat.transparent || oldMat.alphaTest)
	};
	if (oldMat.map) {
		params.map = oldMat.map;
	}

	if ('modulateType' in userData) {
		params.modulateMode = userData.modulateMode ?? 0;
		params.modulateType = userData.modulateType;
	}
	if (colorInfo && 'colorInfo' in newMatClass.prototype) {
		// console.debug('got colorinfo on', mesh)
		params.colorInfo = colorInfo;
	}

	mesh.material = new newMatClass(params);
	oldMat.dispose(); // Dispose the old material, keeping the map.

	// HACK: For SampleShaderMaterial with glTF head models, let's not
	// set drawType uniform to faceline. TODO: Specifically only
	// needs to be done if it's not from FFL.js, and, if faceline
	// color is not transparent (will also result in beards having wrong color)
	if (mesh.material instanceof SampleShaderMaterial &&
		userData.modulateType === 0) {
		// TODO: This will also break if you request: /miis/image.glb?shaderType=switch&data=
		// 0804400308040402020C0308060406020A0000020000000804100A01001E4004000214031304170D06020A040109
		// (Should we automatically include &shaderType=switch when SampleShaderMaterial is detected?)
		mesh.material.uniforms.drawType.value = 0;
	}
}

/**
 * Calls {@link applyMaterialClassToMesh} on a group of multiple
 * meshes (head or body model), using the name of the material.
 * @param {THREE.Object3D} group - The group to apply the material to.
 * @param {string} materialClassName - The name of the material class registered in {@link materials}.
 * @param {SampleShaderMaterialColorInfo|null} colorInfo - Needed for SampleShaderMaterial.
 * @throws {Error} Throws if the material does not exist in {@link materials}
 */
function applyMaterialToGroup(group, materialClassName, colorInfo) {
	const matClass = materials[materialClassName];
	if (!matClass) {
		throw new Error(`Unknown shader: ${materialClassName}`);
	}

	group.traverse((node) => {
		if (node instanceof THREE.Mesh) {
			applyMaterialClassToMesh(node, matClass, colorInfo);
		}
	});
}

/**
 * Disposes geometry, material and map, and skeleton.
 * @param {THREE.Object3D} model - The group of meshes or SkinnedMeshes to dispose.
 */
function disposeModel(model) {
	model.traverse((node) => {
		if (node instanceof THREE.Mesh) {
			node.geometry.dispose();
			if (node.material instanceof THREE.Material) {
				const map = /** @type {THREE.MeshBasicMaterial} */ (node.material).map;
				if (map) {
					map.dispose();
				}
				node.material.dispose();
			}
		}
		// Additionally dispose skeleton if it is a SkinnedMesh.
		if (node instanceof THREE.SkinnedMesh && node.skeleton) {
			node.skeleton.dispose();
		}
	});
}

// // ---------------------------------------------------------------------
// //  UI Setup and Updates
// // ---------------------------------------------------------------------

// DOM references.
const modelForm = /** @type {HTMLFormElement} */ (document.getElementById('modelForm'));
const modelUrl = /** @type {HTMLInputElement} */ (document.getElementById('modelUrl'));
const loadButton = /** @type {HTMLButtonElement} */ (document.getElementById('loadModelButton'));

/** Sets up UI event listeners. */
function setupUI() {
	modelForm.addEventListener('submit', (/** @type {SubmitEvent} */ e) => {
		// On updating new model with URL.
		e.preventDefault();
		loadButton.disabled = true;
		loadCharModelFromGLTF(modelUrl.value)
			.then(model => updateCharModel(model))
			// Disable the loading button while loading, re-enable when done.
			.finally(() => loadButton.disabled = false);
	});
}

/** The result of {@link THREE.Clock.getDelta} stored separately from the mixer. */
let animClockDelta = 0;

/** Animation loop. */
function animate() {
	requestAnimationFrame(animate);

	// breakOnFrameCounter();
	if (mixer) {
		// mixer.update(clock.getDelta());
		// Let's store the delta in this global, so that when
		// the mixer or animation changes, the time persists.
		animClockDelta += clock.getDelta();
		mixer.setTime(animClockDelta);
	}
	controls.update();
	renderer.render(scene, camera);
}

/** Main startup. */
function main() {
	initRendererAndScene();

	// Create shadow model.
	currentShadowModel = createShadowModel();

	// Try to load body models and CharModel glTF at once.
	Promise.all([preloadBodyTemplates(),
		loadCharModelFromGLTF(modelUrl.value)]).then((value) => {
		updateCharModel(value[1]);
	});

	setupUI(); // Initial load with default URL.

	requestAnimationFrame(animate); // Start animation loop.
}
document.addEventListener('DOMContentLoaded', main);
