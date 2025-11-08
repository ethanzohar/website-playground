import{a as z,p as Q,w as it}from"./chunk-NISHYRIK-BGyfKEvS.js";import{j as W,e as p,k as at,l as he,m as Ue,L as lt,n as se,F as Ge,o as G,a as He,p as k,q as oe,r as ct,g as ut,D as je,s as q,V as P,I as dt,Q as be,t as ft,O as ze,u as Ke,v as mt,B as ae,w as ht,x as Ve,N as pt,y as gt,z as xt,G as pe,H as We,J as ge,K as xe,U as _t,X as At,Y as le,Z as Tt,_ as Ye,$ as Et,h as V,a0 as bt,a1 as Xe,a2 as K,i as Z,a3 as yt,a4 as wt,a5 as Mt,a6 as Ct,a7 as ue,f as Qe,b as qe,a8 as Lt,a9 as ye,aa as vt,ab as re,ac as Rt,ad as Ze,ae as St,af as Me,ag as Ce,ah as Le,ai as ve,aj as Ft,ak as Dt,al as It,am as Nt,an as Je,ao as $e,ap as Ot,aq as Pt,ar as kt,as as Re,d as Bt,W as Ut,at as Se,au as Gt,av as Ht,A as jt,aw as zt}from"./three.module-1MDMhjAP.js";const Kt=W?W.workingColorSpace:"",_e=d=>new p().setHex(d,Kt),Vt=4212558,Wt=[13770260,16739865,16767008,7918112,30768,673972,3975902,16079485,7547053,4732952,14737632,1579028],Yt=10/7;function Ae(d){return d*(Math.PI/180)}function Fe(d,e){if(e===at)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),d;if(e===he||e===Ue){let t=d.getIndex();if(t===null){const o=[],a=d.getAttribute("position");if(a!==void 0){for(let i=0;i<a.count;i++)o.push(i);d.setIndex(o),t=d.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),d}const s=t.count-2,n=[];if(e===he)for(let o=1;o<=s;o++)n.push(t.getX(0)),n.push(t.getX(o)),n.push(t.getX(o+1));else for(let o=0;o<s;o++)o%2===0?(n.push(t.getX(o)),n.push(t.getX(o+1)),n.push(t.getX(o+2))):(n.push(t.getX(o+2)),n.push(t.getX(o+1)),n.push(t.getX(o)));n.length/3!==s&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=d.clone();return r.setIndex(n),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),d}class Xt extends lt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new $t(t)}),this.register(function(t){return new en(t)}),this.register(function(t){return new un(t)}),this.register(function(t){return new dn(t)}),this.register(function(t){return new fn(t)}),this.register(function(t){return new nn(t)}),this.register(function(t){return new sn(t)}),this.register(function(t){return new on(t)}),this.register(function(t){return new rn(t)}),this.register(function(t){return new Jt(t)}),this.register(function(t){return new an(t)}),this.register(function(t){return new tn(t)}),this.register(function(t){return new cn(t)}),this.register(function(t){return new ln(t)}),this.register(function(t){return new qt(t)}),this.register(function(t){return new mn(t)}),this.register(function(t){return new hn(t)})}load(e,t,s,n){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=se.extractUrlBase(e);o=se.resolveURL(l,this.path)}else o=se.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){n?n(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},i=new Ge(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},s,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,s,n){let r;const o={},a={},i=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(i.decode(new Uint8Array(e,0,4))===et){try{o[L.KHR_BINARY_GLTF]=new pn(e)}catch(c){n&&n(c);return}r=JSON.parse(o[L.KHR_BINARY_GLTF].content)}else r=JSON.parse(i.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new vn(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const c=this.pluginCallbacks[u](l);c.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[c.name]=c,o[c.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const c=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(c){case L.KHR_MATERIALS_UNLIT:o[c]=new Zt;break;case L.KHR_DRACO_MESH_COMPRESSION:o[c]=new gn(r,this.dracoLoader);break;case L.KHR_TEXTURE_TRANSFORM:o[c]=new xn;break;case L.KHR_MESH_QUANTIZATION:o[c]=new _n;break;default:f.indexOf(c)>=0&&a[c]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+c+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(s,n)}parseAsync(e,t){const s=this;return new Promise(function(n,r){s.parse(e,t,n,r)})}}function Qt(){let d={};return{get:function(e){return d[e]},add:function(e,t){d[e]=t},remove:function(e){delete d[e]},removeAll:function(){d={}}}}const L={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class qt{constructor(e){this.parser=e,this.name=L.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let s=0,n=t.length;s<n;s++){const r=t[s];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,s="light:"+e;let n=t.cache.get(s);if(n)return n;const r=t.json,i=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new p(16777215);i.color!==void 0&&u.setRGB(i.color[0],i.color[1],i.color[2],k);const c=i.range!==void 0?i.range:0;switch(i.type){case"directional":l=new je(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ut(u),l.distance=c;break;case"spot":l=new ct(u),l.distance=c,i.spot=i.spot||{},i.spot.innerConeAngle=i.spot.innerConeAngle!==void 0?i.spot.innerConeAngle:0,i.spot.outerConeAngle=i.spot.outerConeAngle!==void 0?i.spot.outerConeAngle:Math.PI/4,l.angle=i.spot.outerConeAngle,l.penumbra=1-i.spot.innerConeAngle/i.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+i.type)}return l.position.set(0,0,0),U(l,i),i.intensity!==void 0&&(l.intensity=i.intensity),l.name=t.createUniqueName(i.name||"light_"+e),n=Promise.resolve(l),t.cache.add(s,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,s=this.parser,r=s.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(i){return s._getNodeRef(t.cache,a,i)})}}class Zt{constructor(){this.name=L.KHR_MATERIALS_UNLIT}getMaterialType(){return V}extendParams(e,t,s){const n=[];e.color=new p(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],k),e.opacity=o[3]}r.baseColorTexture!==void 0&&n.push(s.assignTexture(e,"map",r.baseColorTexture,oe))}return Promise.all(n)}}class Jt{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=n.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class $t{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(s.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(s.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(s.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new He(a,a)}return Promise.all(r)}}class en{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_DISPERSION}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=n.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class tn{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(s.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(s.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class nn{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_SHEEN}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new p(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=n.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],k)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(s.assignTexture(t,"sheenColorMap",o.sheenColorTexture,oe)),o.sheenRoughnessTexture!==void 0&&r.push(s.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class sn{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(s.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class on{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_VOLUME}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(s.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new p().setRGB(a[0],a[1],a[2],k),Promise.all(r)}}class rn{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_IOR}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=n.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class an{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_SPECULAR}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(s.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new p().setRGB(a[0],a[1],a[2],k),o.specularColorTexture!==void 0&&r.push(s.assignTexture(t,"specularColorMap",o.specularColorTexture,oe)),Promise.all(r)}}class ln{constructor(e){this.parser=e,this.name=L.EXT_MATERIALS_BUMP}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(s.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class cn{constructor(e){this.parser=e,this.name=L.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const s=this.parser.json.materials[e];return!s.extensions||!s.extensions[this.name]?null:G}extendMaterialParams(e,t){const s=this.parser,n=s.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const r=[],o=n.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(s.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class un{constructor(e){this.parser=e,this.name=L.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,s=t.json,n=s.textures[e];if(!n.extensions||!n.extensions[this.name])return null;const r=n.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(s.extensionsRequired&&s.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class dn{constructor(e){this.parser=e,this.name=L.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,s=this.parser,n=s.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=n.images[o.source];let i=s.textureLoader;if(a.uri){const l=s.options.manager.getHandler(a.uri);l!==null&&(i=l)}return s.loadTextureImage(e,o.source,i)}}class fn{constructor(e){this.parser=e,this.name=L.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,s=this.parser,n=s.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=n.images[o.source];let i=s.textureLoader;if(a.uri){const l=s.options.manager.getHandler(a.uri);l!==null&&(i=l)}return s.loadTextureImage(e,o.source,i)}}class mn{constructor(e){this.name=L.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,s=t.bufferViews[e];if(s.extensions&&s.extensions[this.name]){const n=s.extensions[this.name],r=this.parser.getDependency("buffer",n.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const i=n.byteOffset||0,l=n.byteLength||0,u=n.count,c=n.byteStride,f=new Uint8Array(a,i,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,c,f,n.mode,n.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(u*c);return o.decodeGltfBuffer(new Uint8Array(m),u,c,f,n.mode,n.filter),m})})}else return null}}class hn{constructor(e){this.name=L.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,s=t.nodes[e];if(!s.extensions||!s.extensions[this.name]||s.mesh===void 0)return null;const n=t.meshes[s.mesh];for(const l of n.primitives)if(l.mode!==N.TRIANGLES&&l.mode!==N.TRIANGLE_STRIP&&l.mode!==N.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=s.extensions[this.name].attributes,a=[],i={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(i[l]=u,i[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),c=u.isGroup?u.children:[u],f=l[0].count,m=[];for(const A of c){const M=new q,g=new P,h=new be,y=new P(1,1,1),b=new dt(A.geometry,A.material,f);for(let T=0;T<f;T++)i.TRANSLATION&&g.fromBufferAttribute(i.TRANSLATION,T),i.ROTATION&&h.fromBufferAttribute(i.ROTATION,T),i.SCALE&&y.fromBufferAttribute(i.SCALE,T),b.setMatrixAt(T,M.compose(g,h,y));for(const T in i)if(T==="_COLOR_0"){const v=i[T];b.instanceColor=new ft(v.array,v.itemSize,v.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&A.geometry.setAttribute(T,i[T]);ze.prototype.copy.call(b,A),this.parser.assignFinalMaterial(b),m.push(b)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}}const et="glTF",ne=12,De={JSON:1313821514,BIN:5130562};class pn{constructor(e){this.name=L.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ne),s=new TextDecoder;if(this.header={magic:s.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==et)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-ne,r=new DataView(e,ne);let o=0;for(;o<n;){const a=r.getUint32(o,!0);o+=4;const i=r.getUint32(o,!0);if(o+=4,i===De.JSON){const l=new Uint8Array(e,ne+o,a);this.content=s.decode(l)}else if(i===De.BIN){const l=ne+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class gn{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=L.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const s=this.json,n=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},i={},l={};for(const u in o){const c=Te[u]||u.toLowerCase();a[c]=o[u]}for(const u in e.attributes){const c=Te[u]||u.toLowerCase();if(o[u]!==void 0){const f=s.accessors[e.attributes[u]],m=ee[f.componentType];l[c]=m.name,i[c]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(c,f){n.decodeDracoFile(u,function(m){for(const A in m.attributes){const M=m.attributes[A],g=i[A];g!==void 0&&(M.normalized=g)}c(m)},a,l,k,f)})})}}class xn{constructor(){this.name=L.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class _n{constructor(){this.name=L.KHR_MESH_QUANTIZATION}}class tt extends Dt{constructor(e,t,s,n){super(e,t,s,n)}copySampleValue_(e){const t=this.resultBuffer,s=this.sampleValues,n=this.valueSize,r=e*n*3+n;for(let o=0;o!==n;o++)t[o]=s[r+o];return t}interpolate_(e,t,s,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,i=a*2,l=a*3,u=n-t,c=(s-t)/u,f=c*c,m=f*c,A=e*l,M=A-l,g=-2*m+3*f,h=m-f,y=1-g,b=h-f+c;for(let T=0;T!==a;T++){const v=o[M+T+a],I=o[M+T+i]*u,F=o[A+T+a],R=o[A+T]*u;r[T]=y*v+b*I+g*F+h*R}return r}}const An=new be;class Tn extends tt{interpolate_(e,t,s,n){const r=super.interpolate_(e,t,s,n);return An.fromArray(r).normalize().toArray(r),r}}const N={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ee={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ie={9728:We,9729:pe,9984:xt,9985:gt,9986:pt,9987:Ve},Ne={33071:_t,33648:xe,10497:ge},de={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Te={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},j={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},En={CUBICSPLINE:void 0,LINEAR:Ze,STEP:Rt},fe={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function bn(d){return d.DefaultMaterial===void 0&&(d.DefaultMaterial=new Ye({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ft})),d.DefaultMaterial}function X(d,e,t){for(const s in t.extensions)d[s]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[s]=t.extensions[s])}function U(d,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(d.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yn(d,e,t){let s=!1,n=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const c=e[l];if(c.POSITION!==void 0&&(s=!0),c.NORMAL!==void 0&&(n=!0),c.COLOR_0!==void 0&&(r=!0),s&&n&&r)break}if(!s&&!n&&!r)return Promise.resolve(d);const o=[],a=[],i=[];for(let l=0,u=e.length;l<u;l++){const c=e[l];if(s){const f=c.POSITION!==void 0?t.getDependency("accessor",c.POSITION):d.attributes.position;o.push(f)}if(n){const f=c.NORMAL!==void 0?t.getDependency("accessor",c.NORMAL):d.attributes.normal;a.push(f)}if(r){const f=c.COLOR_0!==void 0?t.getDependency("accessor",c.COLOR_0):d.attributes.color;i.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(i)]).then(function(l){const u=l[0],c=l[1],f=l[2];return s&&(d.morphAttributes.position=u),n&&(d.morphAttributes.normal=c),r&&(d.morphAttributes.color=f),d.morphTargetsRelative=!0,d})}function wn(d,e){if(d.updateMorphTargets(),e.weights!==void 0)for(let t=0,s=e.weights.length;t<s;t++)d.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(d.morphTargetInfluences.length===t.length){d.morphTargetDictionary={};for(let s=0,n=t.length;s<n;s++)d.morphTargetDictionary[t[s]]=s}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Mn(d){let e;const t=d.extensions&&d.extensions[L.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+me(t.attributes):e=d.indices+":"+me(d.attributes)+":"+d.mode,d.targets!==void 0)for(let s=0,n=d.targets.length;s<n;s++)e+=":"+me(d.targets[s]);return e}function me(d){let e="";const t=Object.keys(d).sort();for(let s=0,n=t.length;s<n;s++)e+=t[s]+":"+d[t[s]]+";";return e}function Ee(d){switch(d){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Cn(d){return d.search(/\.jpe?g($|\?)/i)>0||d.search(/^data\:image\/jpeg/)===0?"image/jpeg":d.search(/\.webp($|\?)/i)>0||d.search(/^data\:image\/webp/)===0?"image/webp":d.search(/\.ktx2($|\?)/i)>0||d.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Ln=new q;class vn{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Qt,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let s=!1,n=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;s=/^((?!chrome|android).)*safari/i.test(a)===!0;const i=a.match(/Version\/(\d+)/);n=s&&i?parseInt(i[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||s&&n<17||r&&o<98?this.textureLoader=new Ke(this.options.manager):this.textureLoader=new mt(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ge(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const s=this,n=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([s.getDependencies("scene"),s.getDependencies("animation"),s.getDependencies("camera")])}).then(function(o){const a={scene:o[0][n.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:n.asset,parser:s,userData:{}};return X(r,a,n),U(a,n),Promise.all(s._invokeAll(function(i){return i.afterRoot&&i.afterRoot(a)})).then(function(){for(const i of a.scenes)i.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],s=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){const o=t[n].joints;for(let a=0,i=o.length;a<i;a++)e[o[a]].isBone=!0}for(let n=0,r=e.length;n<r;n++){const o=e[n];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(s[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,s){if(e.refs[t]<=1)return s;const n=s.clone(),r=(o,a)=>{const i=this.associations.get(o);i!=null&&this.associations.set(a,i);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(s,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let s=0;s<t.length;s++){const n=e(t[s]);if(n)return n}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const s=[];for(let n=0;n<t.length;n++){const r=e(t[n]);r&&s.push(r)}return s}getDependency(e,t){const s=e+":"+t;let n=this.cache.get(s);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":n=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(s,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){const s=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(r,o){return s.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],s=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[L.KHR_BINARY_GLTF].body);const n=this.options;return new Promise(function(r,o){s.load(se.resolveURL(t.uri,n.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(s){const n=t.byteLength||0,r=t.byteOffset||0;return s.slice(r,r+n)})}loadAccessor(e){const t=this,s=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){const o=de[n.type],a=ee[n.componentType],i=n.normalized===!0,l=new a(n.count*o);return Promise.resolve(new ae(l,o,i))}const r=[];return n.bufferView!==void 0?r.push(this.getDependency("bufferView",n.bufferView)):r.push(null),n.sparse!==void 0&&(r.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],i=de[n.type],l=ee[n.componentType],u=l.BYTES_PER_ELEMENT,c=u*i,f=n.byteOffset||0,m=n.bufferView!==void 0?s.bufferViews[n.bufferView].byteStride:void 0,A=n.normalized===!0;let M,g;if(m&&m!==c){const h=Math.floor(f/m),y="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+h+":"+n.count;let b=t.cache.get(y);b||(M=new l(a,h*m,n.count*m/u),b=new ht(M,m/u),t.cache.add(y,b)),g=new St(b,i,f%m/u,A)}else a===null?M=new l(n.count*i):M=new l(a,f,n.count*i),g=new ae(M,i,A);if(n.sparse!==void 0){const h=de.SCALAR,y=ee[n.sparse.indices.componentType],b=n.sparse.indices.byteOffset||0,T=n.sparse.values.byteOffset||0,v=new y(o[1],b,n.sparse.count*h),I=new l(o[2],T,n.sparse.count*i);a!==null&&(g=new ae(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let F=0,R=v.length;F<R;F++){const H=v[F];if(g.setX(H,I[F*i]),i>=2&&g.setY(H,I[F*i+1]),i>=3&&g.setZ(H,I[F*i+2]),i>=4&&g.setW(H,I[F*i+3]),i>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=A}return g})}loadTexture(e){const t=this.json,s=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const i=s.manager.getHandler(o.uri);i!==null&&(a=i)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,s){const n=this,r=this.json,o=r.textures[e],a=r.images[t],i=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[i])return this.textureCache[i];const l=this.loadImageSource(t,s).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Ie[f.magFilter]||pe,u.minFilter=Ie[f.minFilter]||Ve,u.wrapS=Ne[f.wrapS]||ge,u.wrapT=Ne[f.wrapT]||ge,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==We&&u.minFilter!==pe,n.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[i]=l,l}loadImageSource(e,t){const s=this,n=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(c=>c.clone());const o=n.images[e],a=self.URL||self.webkitURL;let i=o.uri||"",l=!1;if(o.bufferView!==void 0)i=s.getDependency("bufferView",o.bufferView).then(function(c){l=!0;const f=new Blob([c],{type:o.mimeType});return i=a.createObjectURL(f),i});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(i).then(function(c){return new Promise(function(f,m){let A=f;t.isImageBitmapLoader===!0&&(A=function(M){const g=new Me(M);g.needsUpdate=!0,f(g)}),t.load(se.resolveURL(c,r.path),A,void 0,m)})}).then(function(c){return l===!0&&a.revokeObjectURL(i),U(c,o),c.userData.mimeType=o.mimeType||Cn(o.uri),c}).catch(function(c){throw console.error("THREE.GLTFLoader: Couldn't load texture",i),c});return this.sourceCache[e]=u,u}assignTexture(e,t,s,n){const r=this;return this.getDependency("texture",s.index).then(function(o){if(!o)return null;if(s.texCoord!==void 0&&s.texCoord>0&&(o=o.clone(),o.channel=s.texCoord),r.extensions[L.KHR_TEXTURE_TRANSFORM]){const a=s.extensions!==void 0?s.extensions[L.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const i=r.associations.get(o);o=r.extensions[L.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,i)}}return n!==void 0&&(o.colorSpace=n),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let s=e.material;const n=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+s.uuid;let i=this.cache.get(a);i||(i=new At,le.prototype.copy.call(i,s),i.color.copy(s.color),i.map=s.map,i.sizeAttenuation=!1,this.cache.add(a,i)),s=i}else if(e.isLine){const a="LineBasicMaterial:"+s.uuid;let i=this.cache.get(a);i||(i=new Tt,le.prototype.copy.call(i,s),i.color.copy(s.color),i.map=s.map,this.cache.add(a,i)),s=i}if(n||r||o){let a="ClonedMaterial:"+s.uuid+":";n&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let i=this.cache.get(a);i||(i=s.clone(),r&&(i.vertexColors=!0),o&&(i.flatShading=!0),n&&(i.normalScale&&(i.normalScale.y*=-1),i.clearcoatNormalScale&&(i.clearcoatNormalScale.y*=-1)),this.cache.add(a,i),this.associations.set(i,this.associations.get(s))),s=i}e.material=s}getMaterialType(){return Ye}loadMaterial(e){const t=this,s=this.json,n=this.extensions,r=s.materials[e];let o;const a={},i=r.extensions||{},l=[];if(i[L.KHR_MATERIALS_UNLIT]){const c=n[L.KHR_MATERIALS_UNLIT];o=c.getMaterialType(),l.push(c.extendParams(a,r,t))}else{const c=r.pbrMetallicRoughness||{};if(a.color=new p(1,1,1),a.opacity=1,Array.isArray(c.baseColorFactor)){const f=c.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],k),a.opacity=f[3]}c.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",c.baseColorTexture,oe)),a.metalness=c.metallicFactor!==void 0?c.metallicFactor:1,a.roughness=c.roughnessFactor!==void 0?c.roughnessFactor:1,c.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",c.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",c.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Et);const u=r.alphaMode||fe.OPAQUE;if(u===fe.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===fe.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==V&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new He(1,1),r.normalTexture.scale!==void 0)){const c=r.normalTexture.scale;a.normalScale.set(c,c)}if(r.occlusionTexture!==void 0&&o!==V&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==V){const c=r.emissiveFactor;a.emissive=new p().setRGB(c[0],c[1],c[2],k)}return r.emissiveTexture!==void 0&&o!==V&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,oe)),Promise.all(l).then(function(){const c=new o(a);return r.name&&(c.name=r.name),U(c,r),t.associations.set(c,{materials:e}),r.extensions&&X(n,c,r),c})}createUniqueName(e){const t=bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,s=this.extensions,n=this.primitiveCache;function r(a){return s[L.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(i){return Oe(i,a,t)})}const o=[];for(let a=0,i=e.length;a<i;a++){const l=e[a],u=Mn(l),c=n[u];if(c)o.push(c.promise);else{let f;l.extensions&&l.extensions[L.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Oe(new Xe,l,t),n[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,s=this.json,n=this.extensions,r=s.meshes[e],o=r.primitives,a=[];for(let i=0,l=o.length;i<l;i++){const u=o[i].material===void 0?bn(this.cache):this.getDependency("material",o[i].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(i){const l=i.slice(0,i.length-1),u=i[i.length-1],c=[];for(let m=0,A=u.length;m<A;m++){const M=u[m],g=o[m];let h;const y=l[m];if(g.mode===N.TRIANGLES||g.mode===N.TRIANGLE_STRIP||g.mode===N.TRIANGLE_FAN||g.mode===void 0)h=r.isSkinnedMesh===!0?new K(M,y):new Z(M,y),h.isSkinnedMesh===!0&&h.normalizeSkinWeights(),g.mode===N.TRIANGLE_STRIP?h.geometry=Fe(h.geometry,Ue):g.mode===N.TRIANGLE_FAN&&(h.geometry=Fe(h.geometry,he));else if(g.mode===N.LINES)h=new yt(M,y);else if(g.mode===N.LINE_STRIP)h=new wt(M,y);else if(g.mode===N.LINE_LOOP)h=new Mt(M,y);else if(g.mode===N.POINTS)h=new Ct(M,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(h.geometry.morphAttributes).length>0&&wn(h,r),h.name=t.createUniqueName(r.name||"mesh_"+e),U(h,r),g.extensions&&X(n,h,g),t.assignFinalMaterial(h),c.push(h)}for(let m=0,A=c.length;m<A;m++)t.associations.set(c[m],{meshes:e,primitives:m});if(c.length===1)return r.extensions&&X(n,c[0],r),c[0];const f=new ue;r.extensions&&X(n,f,r),t.associations.set(f,{meshes:e});for(let m=0,A=c.length;m<A;m++)f.add(c[m]);return f})}loadCamera(e){let t;const s=this.json.cameras[e],n=s[s.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return s.type==="perspective"?t=new Qe(qe.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):s.type==="orthographic"&&(t=new Lt(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),s.name&&(t.name=this.createUniqueName(s.name)),U(t,s),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],s=[];for(let n=0,r=t.joints.length;n<r;n++)s.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?s.push(this.getDependency("accessor",t.inverseBindMatrices)):s.push(null),Promise.all(s).then(function(n){const r=n.pop(),o=n,a=[],i=[];for(let l=0,u=o.length;l<u;l++){const c=o[l];if(c){a.push(c);const f=new q;r!==null&&f.fromArray(r.array,l*16),i.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ye(a,i)})}loadAnimation(e){const t=this.json,s=this,n=t.animations[e],r=n.name?n.name:"animation_"+e,o=[],a=[],i=[],l=[],u=[];for(let c=0,f=n.channels.length;c<f;c++){const m=n.channels[c],A=n.samplers[m.sampler],M=m.target,g=M.node,h=n.parameters!==void 0?n.parameters[A.input]:A.input,y=n.parameters!==void 0?n.parameters[A.output]:A.output;M.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",h)),i.push(this.getDependency("accessor",y)),l.push(A),u.push(M))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(i),Promise.all(l),Promise.all(u)]).then(function(c){const f=c[0],m=c[1],A=c[2],M=c[3],g=c[4],h=[];for(let b=0,T=f.length;b<T;b++){const v=f[b],I=m[b],F=A[b],R=M[b],H=g[b];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const te=s._createAnimationTracks(v,I,F,R,H);if(te)for(let J=0;J<te.length;J++)h.push(te[J])}const y=new vt(r,void 0,h);return U(y,n),y})}createNodeMesh(e){const t=this.json,s=this,n=t.nodes[e];return n.mesh===void 0?null:s.getDependency("mesh",n.mesh).then(function(r){const o=s._getNodeRef(s.meshCache,n.mesh,r);return n.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let i=0,l=n.weights.length;i<l;i++)a.morphTargetInfluences[i]=n.weights[i]}),o})}loadNode(e){const t=this.json,s=this,n=t.nodes[e],r=s._loadNodeShallow(e),o=[],a=n.children||[];for(let l=0,u=a.length;l<u;l++)o.push(s.getDependency("node",a[l]));const i=n.skin===void 0?Promise.resolve(null):s.getDependency("skin",n.skin);return Promise.all([r,Promise.all(o),i]).then(function(l){const u=l[0],c=l[1],f=l[2];f!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(f,Ln)});for(let m=0,A=c.length;m<A;m++)u.add(c[m]);return u})}_loadNodeShallow(e){const t=this.json,s=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?n.createUniqueName(r.name):"",a=[],i=n._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return i&&a.push(i),r.camera!==void 0&&a.push(n.getDependency("camera",r.camera).then(function(l){return n._getNodeRef(n.cameraCache,r.camera,l)})),n._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new re:l.length>1?u=new ue:l.length===1?u=l[0]:u=new ze,u!==l[0])for(let c=0,f=l.length;c<f;c++)u.add(l[c]);if(r.name&&(u.userData.name=r.name,u.name=o),U(u,r),r.extensions&&X(s,u,r),r.matrix!==void 0){const c=new q;c.fromArray(r.matrix),u.applyMatrix4(c)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!n.associations.has(u))n.associations.set(u,{});else if(r.mesh!==void 0&&n.meshCache.refs[r.mesh]>1){const c=n.associations.get(u);n.associations.set(u,{...c})}return n.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,s=this.json.scenes[e],n=this,r=new ue;s.name&&(r.name=n.createUniqueName(s.name)),U(r,s),s.extensions&&X(t,r,s);const o=s.nodes||[],a=[];for(let i=0,l=o.length;i<l;i++)a.push(n.getDependency("node",o[i]));return Promise.all(a).then(function(i){for(let u=0,c=i.length;u<c;u++)r.add(i[u]);const l=u=>{const c=new Map;for(const[f,m]of n.associations)(f instanceof le||f instanceof Me)&&c.set(f,m);return u.traverse(f=>{const m=n.associations.get(f);m!=null&&c.set(f,m)}),c};return n.associations=l(r),r})}_createAnimationTracks(e,t,s,n,r){const o=[],a=e.name?e.name:e.uuid,i=[];j[r.path]===j.weights?e.traverse(function(f){f.morphTargetInfluences&&i.push(f.name?f.name:f.uuid)}):i.push(a);let l;switch(j[r.path]){case j.weights:l=Le;break;case j.rotation:l=ve;break;case j.translation:case j.scale:l=Ce;break;default:switch(s.itemSize){case 1:l=Le;break;case 2:case 3:default:l=Ce;break}break}const u=n.interpolation!==void 0?En[n.interpolation]:Ze,c=this._getArrayFromAccessor(s);for(let f=0,m=i.length;f<m;f++){const A=new l(i[f]+"."+j[r.path],t.array,c,u);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(A),o.push(A)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const s=Ee(t.constructor),n=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)n[r]=t[r]*s;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(s){const n=this instanceof ve?Tn:tt;return new n(this.times,this.values,this.getValueSize()/3,s)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Rn(d,e,t){const s=e.attributes,n=new It;if(s.POSITION!==void 0){const a=t.json.accessors[s.POSITION],i=a.min,l=a.max;if(i!==void 0&&l!==void 0){if(n.set(new P(i[0],i[1],i[2]),new P(l[0],l[1],l[2])),a.normalized){const u=Ee(ee[a.componentType]);n.min.multiplyScalar(u),n.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new P,i=new P;for(let l=0,u=r.length;l<u;l++){const c=r[l];if(c.POSITION!==void 0){const f=t.json.accessors[c.POSITION],m=f.min,A=f.max;if(m!==void 0&&A!==void 0){if(i.setX(Math.max(Math.abs(m[0]),Math.abs(A[0]))),i.setY(Math.max(Math.abs(m[1]),Math.abs(A[1]))),i.setZ(Math.max(Math.abs(m[2]),Math.abs(A[2]))),f.normalized){const M=Ee(ee[f.componentType]);i.multiplyScalar(M)}a.max(i)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(a)}d.boundingBox=n;const o=new Nt;n.getCenter(o.center),o.radius=n.min.distanceTo(n.max)/2,d.boundingSphere=o}function Oe(d,e,t){const s=e.attributes,n=[];function r(o,a){return t.getDependency("accessor",o).then(function(i){d.setAttribute(a,i)})}for(const o in s){const a=Te[o]||o.toLowerCase();a in d.attributes||n.push(r(s[o],a))}if(e.indices!==void 0&&!d.index){const o=t.getDependency("accessor",e.indices).then(function(a){d.setIndex(a)});n.push(o)}return W.workingColorSpace!==k&&"COLOR_0"in s&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${W.workingColorSpace}" not supported.`),U(d,e),Rn(d,e,t),Promise.all(n).then(function(){return e.targets!==void 0?yn(d,e.targets,t):d})}function Sn(d){const e=new Map,t=new Map,s=d.clone();return nt(d,s,function(n,r){e.set(r,n),t.set(n,r)}),s.traverse(function(n){if(!n.isSkinnedMesh)return;const r=n,o=e.get(n),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(i){return t.get(i)}),r.bind(r.skeleton,r.bindMatrix)}),s}function nt(d,e,t){t(d,e);for(let s=0;s<d.children.length;s++)nt(d.children[s],e.children[s],t)}const Fn=`
// 頂点シェーダーに入力される attribute 変数
//attribute vec4 position;       //!< 入力: 位置情報
//attribute vec2 uv;             //!< 入力: テクスチャー座標
//attribute vec3 normal;         //!< 入力: 法線ベクトル
// All provided by three.js ^^

// vertex color is not actually the color of the shape, as such
// it is a custom attribute _COLOR in the glTF

attribute vec4 _color;           //!< 入力: 頂点の色
attribute vec3 tangent;          //!< 入力: 異方位

// フラグメントシェーダーへの入力
varying   vec4 v_color;          //!< 出力: 頂点の色
varying   vec4 v_position;       //!< 出力: 位置情報
varying   vec3 v_normal;         //!< 出力: 法線ベクトル
varying   vec3 v_tangent;        //!< 出力: 異方位
varying   vec2 v_texCoord;       //!< 出力: テクスチャー座標

// ユニフォーム
//uniform mat3 normalMatrix;     //!< ユニフォーム: モデルの法線用行列
//uniform mat4 modelViewMatrix;  //!< ユニフォーム: プロジェクション行列
//uniform mat4 projectionMatrix; //!< ユニフォーム: モデル行列
// All provided by three.js ^^

// skinning_pars_vertex.glsl.js
#ifdef USE_SKINNING
    uniform mat4 bindMatrix;
    uniform mat4 bindMatrixInverse;
    uniform highp sampler2D boneTexture;
    mat4 getBoneMatrix( const in float i ) {
        int size = textureSize( boneTexture, 0 ).x;
        int j = int( i ) * 4;
        int x = j % size;
        int y = j / size;
        vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
        vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
        vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
        vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
        return mat4( v1, v2, v3, v4 );
    }
#endif

void main()
{

    // begin_vertex.glsl.js
    vec3 transformed = vec3( position );
// skinbase_vertex.glsl.js
#ifdef USE_SKINNING
    mat4 boneMatX = getBoneMatrix( skinIndex.x );
    mat4 boneMatY = getBoneMatrix( skinIndex.y );
    mat4 boneMatZ = getBoneMatrix( skinIndex.z );
    mat4 boneMatW = getBoneMatrix( skinIndex.w );
    // skinning_vertex.glsl.js
    vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
    vec4 skinned = vec4( 0.0 );
    skinned += boneMatX * skinVertex * skinWeight.x;
    skinned += boneMatY * skinVertex * skinWeight.y;
    skinned += boneMatZ * skinVertex * skinWeight.z;
    skinned += boneMatW * skinVertex * skinWeight.w;
    transformed = ( bindMatrixInverse * skinned ).xyz;
#endif

//#ifdef FFL_COORDINATE_MODE_NORMAL
    // 頂点座標を変換
    v_position = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position =  projectionMatrix * v_position;

    vec3 objectNormal = normal;
    vec3 objectTangent = tangent.xyz;
// skinnormal_vertex.glsl.js
#ifdef USE_SKINNING
    mat4 skinMatrix = mat4( 0.0 );
    skinMatrix += skinWeight.x * boneMatX;
    skinMatrix += skinWeight.y * boneMatY;
    skinMatrix += skinWeight.z * boneMatZ;
    skinMatrix += skinWeight.w * boneMatW;
    skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

    objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
    objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

#endif

    // 法線も変換
    //v_normal = mat3(inverse(u_mv)) * a_normal;
    v_normal = normalize(normalMatrix * objectNormal);
//#elif defined(FFL_COORDINATE_MODE_NONE)
//    // 頂点座標を変換
//    gl_Position = vec4(a_position.x, a_position.y * -1.0, a_position.z, a_position.w);
//    v_position = a_position;
//
//    v_normal = a_normal;
//#endif

     // その他の情報も書き出す
    v_texCoord = uv;
    // safe normalize
    if (tangent != vec3(0.0, 0.0, 0.0))
    {
        v_tangent = normalize(normalMatrix * objectTangent);
    }
    else
    {
        v_tangent = vec3(0.0, 0.0, 0.0);
    }

    v_color = _color;
}
`,Dn=`
//
//  sample.flg
//  Fragment shader
//  Copyright (c) 2014 Nintendo Co., Ltd. All rights reserved.
//
//

#ifdef GL_ES
precision mediump float;
#else
#   define lowp
#   define mediump
#   define highp
#endif


//
//  定数定義ファイル
//

/// シェーダーモード
#define FFL_SHADER_MODE_UR 0
#define FFL_SHADER_MODE_UB 1

/// 変調処理のマクロ
#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5

/// スペキュラのモード
#define FFL_SPECULAR_MODE_BLINN 0
#define FFL_SPECULAR_MODE_ANISO 1

/// ライトのON/OFF
#define FFL_LIGHT_MODE_DISABLE 0
#define FFL_LIGHT_MODE_ENABLE 1

/// フラグメントのディスカードモード
#define FFL_DISCARD_FRAGMENT_DISABLE 0
#define FFL_DISCARD_FRAGMENT_ENABLE  1

/// 座標変換モード
#define FFL_COORDINATE_MODE_NONE   0
#define FFL_COORDINATE_MODE_NORMAL 1

//
//  関数の定義ファイル
//

/**
 * @brief 異方性反射の反射率を計算します。
 * @param[in] light   ライトの向き
 * @param[in] tangent 接線
 * @param[in] eye     視線の向き
 * @param[in] power   鋭さ
 */
mediump float calculateAnisotropicSpecular(mediump vec3 light, mediump vec3 tangent, mediump vec3 eye, mediump float power )
{
	mediump float dotLT = dot(light, tangent);
	mediump float dotVT = dot(eye, tangent);
	mediump float dotLN = sqrt(1.0 - dotLT * dotLT);
	mediump float dotVR = dotLN*sqrt(1.0 - dotVT * dotVT) - dotLT * dotVT;

	return pow(max(0.0, dotVR), power);
}

/**
 * @brief 異方性反射の反射率を計算します。
 * @param[in] light   ライトの向き
 * @param[in] normal  法線
 * @param[in] eye     視線の向き
 * @param[in] power   鋭さ
 */
mediump float calculateBlinnSpecular(mediump vec3 light, mediump vec3 normal, mediump vec3 eye, mediump float power)
{
	return pow(max(dot(reflect(-light, normal), eye), 0.0), power);
}

/**
 * @brief 異方性反射、ブリン反射をブレンドします。
 * @param[in] blend ブレンド率
 * @param[in] blinn ブリンの値
 * @param[in] aniso 異方性の値
 */
mediump float calculateSpecularBlend(mediump float blend, mediump float blinn, mediump float aniso)
{
	return mix(aniso, blinn, blend);
}

/**
 * @brief アンビエントを計算します。
 * @param[in] light    ライト
 * @param[in] material マテリアル
 */
mediump vec3 calculateAmbientColor(mediump vec3 light, mediump vec3 material)
{
	return light * material;
}

/**
 * @brief 拡散を計算します。
 * @param[in] light    ライト
 * @param[in] material マテリアル
 * @param[in] ln       ライトと法線の内積
 */
mediump vec3 calculateDiffuseColor(mediump vec3 light, mediump vec3 material, mediump float ln)
{
	return light * material * ln;
}

/**
 * @brief 鏡面反射を計算します。
 * @param[in] light      ライト
 * @param[in] material   マテリアル
 * @param[in] reflection 反射率
 * @param[in] strength   幅
 */
mediump vec3 calculateSpecularColor(mediump vec3 light, mediump vec3 material, mediump float reflection, mediump float strength)
{
	return light * material * reflection * strength;
}

/**
 * @brief リムを計算します。
 * @param[in] color   リム色
 * @param[in] normalZ 法線のZ方向
 * @param[in] width   リム幅
 * @param[in] power   リムの鋭さ
 */
mediump vec3 calculateRimColor(mediump vec3 color, mediump float normalZ, mediump float width, mediump float power)
{
	return color * pow(width * (1.0 - abs(normalZ)), power);
}

/**
 * @brief ライト方向と法線の内積を求める
 * @note 特殊な実装になっています。
 */
mediump float calculateDot(mediump vec3 light, mediump vec3 normal)
{
	return max(dot(light, normal), 0.1);
}

// フラグメントシェーダーに入力される varying 変数
varying mediump vec4 v_color;          //!< 出力: 頂点の色
varying highp   vec4 v_position;       //!< 出力: 位置情報
varying highp   vec3 v_normal;         //!< 出力: 法線ベクトル
// NOTE: ^^ Those two need to be highp to avoid weird black dot issue on Android
varying mediump vec3 v_tangent;        //!< 出力: 異方位
varying mediump vec2 v_texCoord;       //!< 出力: テクスチャー座標

/// constカラー
uniform mediump vec4  u_const1; ///< constカラー1
uniform mediump vec4  u_const2; ///< constカラー2
uniform mediump vec4  u_const3; ///< constカラー3

/// ライト設定
uniform mediump vec3 u_light_ambient;  ///< カメラ空間のライト方向
uniform mediump vec3 u_light_diffuse;  ///< 拡散光用ライト
uniform mediump vec3 u_light_dir;
uniform bool u_light_enable;
uniform mediump vec3 u_light_specular; ///< 鏡面反射用ライト強度

/// マテリアル設定
uniform mediump vec3 u_material_ambient;         ///< 環境光用マテリアル設定
uniform mediump vec3 u_material_diffuse;         ///< 拡散光用マテリアル設定
uniform mediump vec3 u_material_specular;        ///< 鏡面反射用マテリアル設定
uniform int u_material_specular_mode;            ///< スペキュラの反射モード(CharModelに依存する設定のためub_modulateにしている)
uniform mediump float u_material_specular_power; ///< スペキュラの鋭さ(0.0を指定すると頂点カラーの設定が利用される)

/// 変調設定
uniform int u_mode;   ///< 描画モード

/// リム設定
uniform mediump vec3  u_rim_color;
uniform mediump float u_rim_power;

// サンプラー
uniform sampler2D s_texture;


// -------------------------------------------------------
// メイン文
void main()
{
    mediump vec4 color;

    mediump float specularPower    = u_material_specular_power;
    mediump float rimWidth         = v_color.a;

//#ifdef FFL_MODULATE_MODE_CONSTANT
    if(u_mode == FFL_MODULATE_MODE_CONSTANT)
    {
      color = u_const1;
    }
    // modified to handle u_const1 alpha:
//#elif defined(FFL_MODULATE_MODE_TEXTURE_DIRECT)
    else if(u_mode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.rgb, u_const1.a * texel.a);
    }
//#elif defined(FFL_MODULATE_MODE_RGB_LAYERED)
    else if(u_mode == FFL_MODULATE_MODE_RGB_LAYERED)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, u_const1.a * texel.a);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA)
    else if(u_mode == FFL_MODULATE_MODE_ALPHA)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(u_const1.rgb, u_const1.a * texel.r);
    }
//#elif defined(FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    else if(u_mode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.g * u_const1.rgb, u_const1.a * texel.r);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA_OPA)
    else if(u_mode == FFL_MODULATE_MODE_ALPHA_OPA)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.r * u_const1.rgb, u_const1.a);
    }
//#endif

    // avoids little outline around mask elements
    if(u_mode != FFL_MODULATE_MODE_CONSTANT && color.a == 0.0)
    {
        discard;
    }

//#ifdef FFL_LIGHT_MODE_ENABLE
    if(u_light_enable)
    {
        /// 環境光の計算
        mediump vec3 ambient = calculateAmbientColor(u_light_ambient.xyz, u_material_ambient.xyz);

        /// 法線ベクトルの正規化
        mediump vec3 norm = normalize(v_normal);

        /// 視線ベクトル
        mediump vec3 eye = normalize(-v_position.xyz);

        // ライトの向き
        mediump float fDot = calculateDot(u_light_dir, norm);

        /// Diffuse計算
        mediump vec3 diffuse = calculateDiffuseColor(u_light_diffuse.xyz, u_material_diffuse.xyz, fDot);

        /// Specular計算
        mediump float specularBlinn = calculateBlinnSpecular(u_light_dir, norm, eye, u_material_specular_power);

        /// Specularの値を確保する変数を宣言
        mediump float reflection;
        mediump float strength = v_color.g;
        if(u_material_specular_mode == 0)
        {
            /// Blinnモデルの場合
            strength = 1.0;
            reflection = specularBlinn;
        }
        else
        {
            /// Aisoモデルの場合
            mediump float specularAniso = calculateAnisotropicSpecular(u_light_dir, v_tangent, eye, u_material_specular_power);
            reflection = calculateSpecularBlend(v_color.r, specularBlinn, specularAniso);
        }
        /// Specularの色を取得
        mediump vec3 specular = calculateSpecularColor(u_light_specular.xyz, u_material_specular.xyz, reflection, strength);

        // リムの色を計算
        mediump vec3 rimColor = calculateRimColor(u_rim_color.rgb, norm.z, rimWidth, u_rim_power);

        // カラーの計算
        color.rgb = (ambient + diffuse) * color.rgb + specular + rimColor;
    }
//#endif

    gl_FragColor = color;
}
`;class O extends Je{static defaultLightAmbient=new p(.73,.73,.73);static defaultLightDiffuse=new p(.6,.6,.6);static defaultLightSpecular=new p(.7,.7,.7);static defaultLightDir=new P(-.4531539381,.4226179123,.7848858833);static defaultRimColor=new p(.3,.3,.3);static defaultRimColorBody=new p(.4,.4,.4);static defaultRimPower=2;static defaultLightDirection=this.defaultLightDir;static materialParams=[{ambient:new p(.85,.75,.75),diffuse:new p(.75,.75,.75),specular:new p(.3,.3,.3),specularPower:1.2,specularMode:0},{ambient:new p(1,1,1),diffuse:new p(.7,.7,.7),specular:new p(0,0,0),specularPower:40,specularMode:1},{ambient:new p(.9,.85,.85),diffuse:new p(.75,.75,.75),specular:new p(.22,.22,.22),specularPower:1.5,specularMode:0},{ambient:new p(.85,.75,.75),diffuse:new p(.75,.75,.75),specular:new p(.3,.3,.3),specularPower:1.2,specularMode:0},{ambient:new p(1,1,1),diffuse:new p(.7,.7,.7),specular:new p(.35,.35,.35),specularPower:10,specularMode:1},{ambient:new p(.75,.75,.75),diffuse:new p(.72,.72,.72),specular:new p(.3,.3,.3),specularPower:1.5,specularMode:0},{ambient:new p(1,1,1),diffuse:new p(.7,.7,.7),specular:new p(0,0,0),specularPower:40,specularMode:1},{ambient:new p(1,1,1),diffuse:new p(.7,.7,.7),specular:new p(0,0,0),specularPower:40,specularMode:1},{ambient:new p(1,1,1),diffuse:new p(.7,.7,.7),specular:new p(0,0,0),specularPower:40,specularMode:1},{ambient:new p(.95622,.95622,.95622),diffuse:new p(.49673,.49673,.49673),specular:new p(.24099,.24099,.24099),specularPower:3,specularMode:0},{ambient:new p(.95622,.95622,.95622),diffuse:new p(1.08497,1.08497,1.08497),specular:new p(.2409,.2409,.2409),specularPower:3,specularMode:0}];constructor(e={}){const t={u_light_ambient:{value:O.defaultLightAmbient},u_light_diffuse:{value:O.defaultLightDiffuse},u_light_specular:{value:O.defaultLightSpecular},u_light_dir:{value:O.defaultLightDir.clone()},u_light_enable:{value:!0},u_rim_power:{value:O.defaultRimPower}};super({vertexShader:Fn,fragmentShader:Dn,uniforms:t}),this._modulateType=0,this.useSpecularModeBlinn=!1,this.setValues(e)}get color(){if(this.uniforms.u_const1){if(this._color3)return this._color3}else return null;const e=this.uniforms.u_const1.value,t=new p(e.x,e.y,e.z);return this._color3=t,t}set color(e){function t(r,o=1){return new $e(r.r,r.g,r.b,o)}if(Array.isArray(e)){this.uniforms.u_const1={value:t(e[0])},this.uniforms.u_const2={value:t(e[1])},this.uniforms.u_const3={value:t(e[2])};return}const s=e||new p(1,1,1);this._color3=s;const n=this.opacity;this._opacity&&delete this._opacity,this.uniforms.u_const1={value:t(s,n)}}get opacity(){return this.uniforms.u_const1?this.uniforms.u_const1.value.w:this._opacity||1}set opacity(e){if(!this.uniforms||!this.uniforms.u_const1){this._opacity=1;return}this.uniforms.u_const1.value.w=e}get modulateMode(){return this.uniforms.u_mode?this.uniforms.u_mode.value:null}set modulateMode(e){this.uniforms.u_mode={value:e}}get lightEnable(){return this.uniforms.u_light_enable?this.uniforms.u_light_enable.value:null}set lightEnable(e){this.uniforms.u_light_enable={value:e}}set useSpecularModeBlinn(e){this._useSpecularModeBlinn=e,this._modulateType!==void 0&&(this.modulateType=this._modulateType)}get useSpecularModeBlinn(){return this._useSpecularModeBlinn}get modulateType(){return this._modulateType}set modulateType(e){const t=O.materialParams[e];if(!t)return;this._modulateType=e,this.uniforms.u_material_ambient={value:t.ambient},this.uniforms.u_material_diffuse={value:t.diffuse},this.uniforms.u_material_specular={value:t.specular},this.uniforms.u_material_specular_mode={value:this._useSpecularModeBlinn?0:t.specularMode},this.uniforms.u_material_specular_power={value:t.specularPower};const s=e>8?O.defaultRimColorBody:O.defaultRimColor;this.uniforms.u_rim_color={value:s}}get map(){return this.uniforms.s_texture?this.uniforms.s_texture.value:null}set map(e){this.uniforms.s_texture={value:e}}get lightDirection(){return this.uniforms.u_light_dir.value}set lightDirection(e){this.uniforms.u_light_dir={value:e}}}const In=`
//#define VARYING_QUALIFIER out
#define VARYING_QUALIFIER varying
#define VARYING_INSTANCE Out

// v_ prefix was added to avoid conflicts.
VARYING_QUALIFIER vec2 v_texCoord;
VARYING_QUALIFIER vec3 v_normal;
VARYING_QUALIFIER float v_specularMix;

/// ================================================================
/// 頂点シェーダーの実装
/// ================================================================

//layout( location = 0 ) in vec4 i_Position;
//layout( location = 1 ) in vec3 i_Normal;
//layout( location = 2 ) in vec2 i_TexCoord;
//layout( location = 3 ) in vec4 i_Parameter;

//attribute vec4 position;
//attribute vec2 uv;
//attribute vec3 normal;
// All provided by three.js ^^

// vertex color is not actually the color of the shape, as such
// it is a custom attribute _COLOR in the glTF

attribute vec4 _color; // i_Parameter

// A bunch of unnecessary code was removed.
// See: https://github.com/ariankordi/FFL-Testing/blob/renderer-server-prototype/fs/content/shaders/SampleShader.vert

//uniform mat4 mv;
//uniform mat4 proj;

#include <skinning_pars_vertex>

void main()
{

  #include <begin_vertex>
  #include <skinbase_vertex>
  #include <skinning_vertex>

  /// ビュー行列に変換
  //vec3 vPos = TRANSFORM_POS(mv,i_Position);
  //gl_Position = PROJECT(proj,vec4(vPos,1.0));

  vec4 vPos = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * vPos;

  vec3 objectNormal = normal;

  #include <skinnormal_vertex>

  v_normal = normalize(normalMatrix * objectNormal);

  v_texCoord = uv.xy;
  //normal = TRANSFORM_VEC(mv,i_Normal);
  v_specularMix = _color.r;
}
`,Nn=`
//#define VARYING_QUALIFIER in
#define VARYING_QUALIFIER varying
#define VARYING_INSTANCE In

VARYING_QUALIFIER vec2 v_texCoord;
VARYING_QUALIFIER highp vec3 v_normal; // Modified to add highp.
VARYING_QUALIFIER float v_specularMix;

/// ================================================================
/// ピクセルシェーダーの実装
/// ================================================================

//layout( location = 0 ) out vec4 o_Color;

// NOTE: NOT SURE HOW TO SET UNIFORM BLOCKS IN RIO
//layout( std140 ) uniform u_Modulate
//{
    uniform int  modulateType;
    uniform int  gammaType;
    uniform int  drawType;
    uniform bool lightEnable; // custom
    uniform vec4 constColor1;
    uniform vec4 constColor2;
    uniform vec4 constColor3;
    uniform vec4 lightDirInView;
    // Modified to be vec3:
    uniform vec3 lightColor;
    uniform vec3 u_SssColor;
    uniform vec3 u_SpecularColor;
    uniform vec3 u_RimColor;
    // End

    uniform float u_HalfLambertFactor;
    uniform float u_SssSpecularFactor;

    uniform float u_SpecularFactorA;
    uniform float u_SpecularFactorB;
    uniform float u_SpecularShinness;
    uniform float u_RimPower;

    uniform float u_RimWidth;
//};


uniform sampler2D s_Tex;

/// 変調モード
#define MODULATE_TYPE_CONSTANT        ( 0 )
#define MODULATE_TYPE_TEXTRUE         ( 1 )
#define MODULATE_TYPE_LAYERED         ( 2 )
#define MODULATE_TYPE_ALPHA           ( 3 )

// NOTE: Glass/Luminance Alpha is usually 4 in FFL.
//#define MODULATE_TYPE_ALPHA_OPA       ( 4 )
// Alpha Opa is usually 5. The two values are swapped around.
//#define MODULATE_TYPE_GLASS           ( 5 )

// For consistency with FFL, these values will be swapped in the shader.
#define MODULATE_TYPE_GLASS             ( 4 )
#define MODULATE_TYPE_ALPHA_OPA         ( 5 )

#define MODULATE_TYPE_ICONBODY        ( 6 )

#define USE_DEGAMMA(type) (type != 0)

#define DRAW_TYPE_NORMAL   0
#define DRAW_TYPE_FACELINE 1
#define DRAW_TYPE_HAIR     2

// All occurrences of ".0" were find-replaced to ".0"

vec4 GetAlbedo()
{
    vec4 texel;
    vec4 albedo;

    if(modulateType != MODULATE_TYPE_CONSTANT &&
        modulateType != MODULATE_TYPE_ICONBODY)
    {
        texel = texture(s_Tex,v_texCoord);
    }
    switch(modulateType)
    {
    case MODULATE_TYPE_CONSTANT:
        //albedo = vec4(constColor1.rgb,1.0);
        albedo = constColor1;
        break;
    // modified to handle constColor1 alpha:
    case MODULATE_TYPE_TEXTRUE:
        //albedo = texel;
        albedo = vec4(texel.rgb, constColor1.a * texel.a);
        break;
    case MODULATE_TYPE_LAYERED:
        albedo = vec4(constColor1.rgb * texel.r
            + constColor2.rgb * texel.g
            + constColor3.rgb * texel.b
            , constColor1.a * texel.a);
        break;
    case MODULATE_TYPE_ALPHA:
        albedo = vec4(constColor1.rgb, constColor1.a * texel.r);
        break;
    case MODULATE_TYPE_ALPHA_OPA:
        albedo = vec4(constColor1.rgb * texel.r, constColor1.a);
        break;
    case MODULATE_TYPE_GLASS:
        // NOTE: glass background color on switch is R but here it's G
        albedo = vec4(constColor1.rgb * texel.g,
          constColor1.a * texel.r);//pow(texel.r, constColor2.g));
          // Not sure why it has pow? without it looks better...
        break;
    case MODULATE_TYPE_ICONBODY:
        albedo = vec4(constColor1.rgb, constColor1.a);
        break;
    default:
        albedo = vec4(0.0);
        break;
    }
    return albedo;
}

vec3 ToLinear(vec3 rgb)
{
    return pow(rgb,vec3(2.2));
}

vec3 ToSrgb(vec3 rgb)
{
    return pow(rgb,vec3(1.0/2.2));
}

vec3 GetRimColor(vec3 color,float normalZ,float width,float power)
{
    return color * pow(width * (1.0 - abs(normalZ)),power);
}

void main()
{
    /// ModulateTypeを考慮してアルベドを取得
    vec4 albedo = GetAlbedo();
    // NOTE: faceline color A channel is 1 here but 0 on switch, needs to be modified
    // NOTE: THE BELOW CODE ALSO TARGETS BEARD!!!!
    /*if(drawType == DRAW_TYPE_FACELINE &&
        modulateType == MODULATE_TYPE_TEXTRUE &&
        albedo.a != 0.0)
    {
        albedo.a = 0.0;
    }*/
    if(albedo.a == 0.0 && drawType != DRAW_TYPE_FACELINE)
    {
        discard;
    }
    if(!lightEnable)
    {
        gl_FragColor = albedo;
        return;
    }

    if(USE_DEGAMMA(gammaType))
    {
        /// SRGB to Linear
        albedo.rgb = ToLinear(albedo.rgb);
    }

    vec3 preNormal = v_normal;

    /// ライティング向け計算
    vec3 normal = normalize(preNormal); ///< ビュー空間法線
    vec3 lightDir = normalize(lightDirInView.xyz); ///< ビュー空間ライト方向

    /// diffuseの計算
    float diffuseFactor = max(0.0,dot(normal, lightDir));

    /// 拡散値計算
    float halfLambert = ((diffuseFactor) * u_HalfLambertFactor + (1.0 - u_HalfLambertFactor));

    /// スペキュラ計算
    vec3 halfDir = normalize(lightDir + vec3(0.0,0.0,1.0));
    float specAngle = max(dot(halfDir,normal),0.0);
    float specular = pow(specAngle,u_SpecularShinness);

    /// 髪型は、スペキュラの係数をParameterのr値でAB補間
    float specularFactor;
    if(drawType != DRAW_TYPE_HAIR)
    {
        specularFactor = u_SpecularFactorA;
    }
    else
    {
        specularFactor = mix(u_SpecularFactorA,u_SpecularFactorB,v_specularMix);
    }

    vec4 outputColor = vec4(vec3(0.0),albedo.a);

    vec3 diffuseColor = lightColor.rgb * albedo.rgb * halfLambert;
    vec3 specularColor = specular * specularFactor * lightColor.rgb * u_SpecularColor.rgb;
    vec3 sssColor =  u_SssColor.rgb * (1.0 - halfLambert);
    float sssSpecularFactor = (1.0 - albedo.a * u_SssSpecularFactor);
    //float sssSpecularFactor = 1.0;

    /// FACELINEは、アルファ値を考慮して計算する
    if(drawType == DRAW_TYPE_FACELINE)
    {
        outputColor = vec4(diffuseColor + (specularColor + sssColor) * sssSpecularFactor,1.0);
    }
    else
    {
        outputColor = vec4(diffuseColor + (specularColor + sssColor),albedo.a);
    }

    outputColor.rgb += GetRimColor(u_RimColor.rgb,clamp(normal.z,0.0,1.0),u_RimWidth,u_RimPower);

    if(USE_DEGAMMA(gammaType))
    {
        /// Linear to SRGB
        outputColor.rgb = ToSrgb(outputColor.rgb);
    }

    gl_FragColor = outputColor;
}
`,$={drawParamMaterials:[{halfLambertFactor:.4,sssSpecularBlendFactor:1,specularFactorA:2.6,specularFactorB:.02,specularShinness:.8,rimLightPower:2,rimLightWidth:.3},{halfLambertFactor:.2,sssSpecularBlendFactor:0,specularFactorA:1,specularFactorB:0,specularShinness:1.3,rimLightPower:1,rimLightWidth:.5},{halfLambertFactor:.3,sssSpecularBlendFactor:0,specularFactorA:2.6,specularFactorB:.02,specularShinness:.8,rimLightPower:.55,rimLightWidth:0},{halfLambertFactor:.4,sssSpecularBlendFactor:1,specularFactorA:2.6,specularFactorB:.02,specularShinness:.8,rimLightPower:2,rimLightWidth:.3},{halfLambertFactor:.45,sssSpecularBlendFactor:1,specularFactorA:1,specularFactorB:.06,specularShinness:.8,rimLightPower:1,rimLightWidth:.5},{halfLambertFactor:.6,sssSpecularBlendFactor:1,specularFactorA:2,specularFactorB:.02,specularShinness:.8,rimLightPower:1,rimLightWidth:.5},{halfLambertFactor:0,sssSpecularBlendFactor:1,specularFactorA:0,specularFactorB:0,specularShinness:.1,rimLightPower:1,rimLightWidth:.5},{halfLambertFactor:0,sssSpecularBlendFactor:1,specularFactorA:0,specularFactorB:0,specularShinness:.1,rimLightPower:1,rimLightWidth:.5},{halfLambertFactor:.35,sssSpecularBlendFactor:1,specularFactorA:.3,specularFactorB:0,specularShinness:30,rimLightPower:1,rimLightWidth:0},{halfLambertFactor:.5,sssSpecularBlendFactor:0,specularFactorA:1,specularFactorB:0,specularShinness:.8,rimLightPower:1,rimLightWidth:0},{halfLambertFactor:.6,sssSpecularBlendFactor:1,specularFactorA:1,specularFactorB:.02,specularShinness:.7,rimLightPower:1,rimLightWidth:.5}],sssFacelineColors:[10822144,10750208,4915200,11667968,3343104,983296,10954752,9837577,1310977,327680],sssFavoriteColorsBody:[2753281,4587520,3347713,398598,3081,1828,201004,788761,328738,4,726572,0],sssFavoriteColorsCap:[5570561,8537610,6562570,1986570,663053,331570,1325400,5246740,1967959,656642,8158308,0],sssCommonColors:[131329,196864,262400,393729,394759,197376,394241,657411,0,328965,328450,263170,197640,132356,262656,524288,66053,525312,394501,656384,0,787203,788229,459779,393473,787717,788488,788745,328194,459011,393475,590595,590084,525318,590853,787719,788490,789002,131331,131587,196867,328456,394249,591370,526090,591883,723212,657675,65795,773,132618,264460,395531,395276,395532,527116,514,770,772,66820,132615,198664,395527,395785,396041,770,198144,1284,132869,198657,461056,264454,461571,461574,592904,460546,526084,657666,657670,657926,657925,658182,658439,393984,723206,789251,789254,789255,789511,525057,788224,657157,788485,788743,723464,197379,460551,592137,723466,394758],sssPantsColors:[0,2621440],specularFacelineColors:[2954511,2299914,2034179,1904133,2098947,524801,2954511,2298890,984321,328193],specularFavoriteColorsBody:[2754052,3347973,3353350,1583622,6153,134692,797751,3215897,1509410,525057,3681324,328965],specularFavoriteColorsCap:[4128770,3613959,3939850,1851141,335365,67395,1059389,4591380,1442604,656642,2631710,131586],specularCommonColors:[328708,2100226,3016961,4069123,2368550,2562050,4465411,6832139,197379,2105890,3348486,3155207,1384788,1059884,3151362,5506561,594740,5514752,2368031,7086081,328965,8002570,7879953,4595721,4329221,8334863,8338712,8342555,3740168,4983817,4524297,5904393,6491148,5775635,6496528,8203798,8274974,8343584,1575689,1052702,2492683,3611162,4334619,6304798,3291748,3884147,4672637,4148854,461856,334131,799850,1722489,2379375,2703997,2575229,3168895,201243,6173,204588,665649,930374,1525080,2379343,2511968,2644827,335111,2174976,77326,1785104,2442499,4803585,3231508,5200137,4937746,6119449,4995590,5454606,6704136,6703636,7098643,6968848,6970387,7103511,4070144,7555602,8346123,8214547,8084759,8217367,5447172,8338433,6831631,8341263,8342805,7492122,1315860,3092271,3750201,4341822,65793],specularPantsColors:[328965,3942400],rimFacelineForeheadColors:[4398614,3942417,4068358,3939850,4197894,4198408,4398870,3941653,3935235,3937290],specularGlassColors:[1644825],getTypeToSssColorTable(){return[this.sssFacelineColors,this.sssCommonColors,this.sssFacelineColors,this.sssFacelineColors,this.sssCommonColors,this.sssFavoriteColorsCap,null,null,null,this.sssFavoriteColorsBody,this.sssPantsColors]},getTypeToSpecularColorTable(){return[this.specularFacelineColors,this.specularCommonColors,this.specularFacelineColors,this.specularFacelineColors,this.specularCommonColors,this.specularFavoriteColorsCap,null,null,this.specularGlassColors,this.specularFavoriteColorsBody,this.specularPantsColors]},modifyCapMaterial(d,e){switch(e){case 0:d.specularFactorB=0;break;case 2:d.specularFactorA=1.1;break;case 6:d.specularFactorB=.8;break;case 9:d.specularShinness=2;break}}};class ie extends Je{static needsFacelineAlpha=!0;static defaultLightColor=new p(1,1,1);static defaultLightDir=new P(-.1227878,.70710677,.6963642);static defaultLightDirection=this.defaultLightDir;constructor(e={}){const t={lightColor:{value:ie.defaultLightColor},lightDirInView:{value:ie.defaultLightDir.clone()},lightEnable:{value:!0},gammaType:{value:1}};super({vertexShader:In,fragmentShader:Nn,uniforms:t}),this._modulateType=0,this._sssColorTable=$.getTypeToSssColorTable(),this._specularColorTable=$.getTypeToSpecularColorTable(),this.setValues(e)}get color(){if(this.uniforms.constColor1){if(this._color3)return this._color3}else return null;const e=this.uniforms.constColor1.value,t=new p(e.x,e.y,e.z);return this._color3=t,t}set color(e){function t(r,o=1){return new $e(r.r,r.g,r.b,o)}if(Array.isArray(e)){this.uniforms.constColor1={value:t(e[0])},this.uniforms.constColor2={value:t(e[1])},this.uniforms.constColor3={value:t(e[2])};return}const s=e||new p(1,1,1);this._color3=s;const n=this.opacity;this._opacity&&delete this._opacity,this.uniforms.constColor1={value:t(s,n)},e&&this._modulateType===0&&(this.uniforms.drawType={value:0})}get opacity(){return this.uniforms.constColor1?this.uniforms.constColor1.value.w:this._opacity||1}set opacity(e){if(!this.uniforms||!this.uniforms.constColor1){this._opacity=1;return}this.uniforms.constColor1.value.w=e}get modulateMode(){return this.uniforms.modulateType?this.uniforms.modulateType.value:null}set modulateMode(e){this.uniforms.modulateType={value:e}}get lightEnable(){return this.uniforms.lightEnable?this.uniforms.lightEnable.value:null}set lightEnable(e){this.uniforms.lightEnable={value:e}}get modulateType(){return this._modulateType}setUniformsFromMatParam(e){this.uniforms.u_HalfLambertFactor={value:e.halfLambertFactor},this.uniforms.u_SssSpecularFactor={value:e.sssSpecularBlendFactor},this.uniforms.u_SpecularFactorA={value:e.specularFactorA},this.uniforms.u_SpecularFactorB={value:e.specularFactorB},this.uniforms.u_SpecularShinness={value:e.specularShinness},this.uniforms.u_RimPower={value:e.rimLightPower},this.uniforms.u_RimWidth={value:e.rimLightWidth}}set modulateType(e){const t=$.drawParamMaterials[e];if(!t)return;this._modulateType=e;let s=0;e===0?s=1:e===4&&(s=2),this.uniforms.drawType={value:s},this.setUniformsFromMatParam(t)}get map(){return this.uniforms.s_Tex?this.uniforms.s_Tex.value:null}set map(e){this.uniforms.s_Tex={value:e}}get lightDirection(){return this.uniforms.lightDirInView.value}set lightDirection(e){this.uniforms.lightDirInView={value:e}}get colorInfo(){return null}set colorInfo(e){console.assert(this._modulateType!==void 0,"modulateType must be set before colorInfo");const t=l=>l===0?8:l&2147483647,s=()=>this._sssColorTable[this._modulateType],n=()=>this._specularColorTable[this._modulateType];let r=new p(0),o=new p(0);const a=W?W.workingColorSpace:"",i=l=>new p().setHex(l,a);switch(this._modulateType){case 0:case 3:r=i(s()[e.facelineColor]),o=i(n()[e.facelineColor]);break;case 1:case 4:{const l=t(this._modulateType===1?e.beardColor:e.hairColor);r=i(s()[l]),o=i(n()[l]);break}case 5:{const l=$.drawParamMaterials[this._modulateType];$.modifyCapMaterial(l,e.favoriteColor),this.setUniformsFromMatParam(l)}case 9:{r=i(s()[e.favoriteColor]),o=i(n()[e.favoriteColor]);break}case 8:{o=i(n()[0]);break}case 10:{const l=e.pantsColor===3?1:0;r=i(s()[l]),o=i(n()[l]);break}}if(this.uniforms.u_SssColor={value:r},this.uniforms.u_SpecularColor={value:o},this._modulateType===0||this._modulateType===3){const l=new p($.rimFacelineForeheadColors[e.facelineColor]);this.uniforms.u_RimColor={value:l}}else this.uniforms.u_RimColor={value:new p(0)}}static getColorInfoFromCharInfoB64(e){const t=Uint8Array.from(atob(e),n=>n.charCodeAt(0));if(t.length!==288)throw new Error("getColorInfoFromCharInfoB64: Input is not FFLiCharInfo.");const s=new DataView(t.buffer);return{facelineColor:s.getUint32(8,!0),favoriteColor:s.getUint32(236,!0),hairColor:s.getUint32(24,!0),beardColor:s.getUint32(128,!0),pantsColor:0}}static assignNormalsForGlass(e){const t=new Float32Array([-.10568,-.70254,.70254,.10568,-.70254,.70254,-.10568,.70254,.70254,.10568,.70254,.70254]),s=new ae(t,3);e.setAttribute("normal",s)}static modifyBufferGeometry(e,t){e.modulateParam.type===8&&this.assignNormalsForGlass(t)}}/*!
 * @file Descriptions (tables) of how to scale
 * different Mii body models and their bone names.
 * @author Arian Kordi <https://github.com/ariankordi>
 */const On={root:"skl_root",head:"head",xyz:null,xyzYMin1:["head"],yxz:["arm_l1","arm_l2","arm_r1","arm_r2","elbow_l","elbow_r"],scalar:["wrist_l","wrist_r","shoulder_l","shoulder_r","ankle_l","ankle_r","knee_l","knee_r","body"],shadow:"body",none:["all_root"]},Pn={root:"Skl_Root",head:"Head",xyz:[],xyzYMin1:[],yxz:null,scalar:["Ankle_R","Ankle_L","Wrist_R","Wrist_L"],shadow:"Waist",none:["jointRoot","Head","nw4f_root"]};function Pe(d){let e=null;if(d.traverse(t=>{switch(t.name){case"Skl_Root":e=Pn;break;case"skl_root":e=On;break}}),!e)throw new Error("detectModelDesc: Could not detect based on bone names.");return e}function kn(d,e,t){if(!("attach"in ye.prototype))throw new Error('applyScaleDescription: This function to apply "scalling" has no effect, until "addSkeletonScalingExtensions" is run to patch THREE.Skeleton.prototype to allow per-bone scaling. Try running that first.');d.traverse(n=>{if(!(n instanceof re))return;const r=n,o=r.name;if(o===t.root){r.scaleForRootAdjust=e;return}if(t.none?.includes(r.name))return;const a=new P;t.xyz?.includes(o)?a.set(e.x,e.y,e.z):t.yxz?.includes(o)?a.set(e.y,e.x,e.z):t.scalar.includes(o)?a.setScalar(e.x):t.xyzYMin1.includes(o)?a.set(e.x,Math.max(e.y,1),e.z):t.xyz===null?a.set(e.x,e.y,e.z):t.yxz===null&&a.set(e.y,e.x,e.z),r.scalling=a});const s=d.getObjectByProperty("type","SkinnedMesh");s&&s instanceof K&&s.skeleton.update()}/*!
 * @file Extensions for Three.js to help allow per-bone scaling of skeletons.
 * @author Arian Kordi <https://github.com/ariankordi>
 */function Bn(d){if(d.prototype._attachments){console.warn("addSkeletonScalingExtensions: Already run, skipping.");return}d.prototype.update=(function(){const e=new q().identity(),t=new q,s=new q,n=new P,r=new be,o=new P;function a(l,u){if(!l.scalling||!(l.parent instanceof re)||!l.parent.scaleForRootAdjust)return;const c=o.setFromMatrixPosition(u),f=l.parent.scaleForRootAdjust;c.x*=f.y,c.y*=f.y,c.z*=f.x,c.y+=f.x-f.y,u.setPosition(c)}function i(l,u){for(const c of l){t.fromArray(u,c.boneIdx*16),c.localScale&&(t.decompose(o,r,n),t.compose(o,r,c.localScale));const f=c.obj.parent?c.obj.parent.matrixWorld:e;s.copy(f).invert(),c.obj.matrix.multiplyMatrices(s,t),c.obj.updateMatrixWorld(!0)}}return function(){for(let u=0;u<this.bones.length;u++){const c=this.bones[u];let f=c?c.matrixWorld:e;if(c&&c.scalling){f=t.copy(f).scale(c.scalling),a(c,f);for(const m of c.children)s.copy(f).multiply(m.matrix),n.setFromMatrixPosition(s),m.matrixWorld.setPosition(n)}t.multiplyMatrices(f,this.boneInverses[u]),t.toArray(this.boneMatrices,u*16)}this._attachments&&i(this._attachments,this.boneMatrices),this.boneTexture&&(this.boneTexture.needsUpdate=!0)}})(),d.prototype.attach=function(e,t,s=!1){const n=this.bones.findIndex(a=>a.name===t);if(n===-1)throw new Error(`Bone '${t}' not found.`);e.matrixAutoUpdate=!1;const r=s?null:e.scale,o={obj:e,boneIdx:n,localScale:r};this._attachments?this._attachments.push(o):this._attachments=[o]},d.prototype.detach=function(e){this._attachments&&(this._attachments=this._attachments.filter(t=>t.obj!==e))},d.prototype.detachAll=function(){this._attachments=null}}const ce={Male:0,Female:1},Un="https://cdn.jsdelivr.net/gh/ariankordi/ffl-raylib-samples@latest/models/miibodymiddle%20male%20test.glb",Gn="https://cdn.jsdelivr.net/gh/ariankordi/ffl-raylib-samples@latest/models/miibodymiddle%20female%20test.glb",B={gender:ce.Male,favoriteColor:11,height:100,build:55,colorInfo:null},Hn={FFLShaderMaterial:O};function jn({scene:d,miiUrl:e,overrides:t,position:s=[0,0,0],scale:n=1}){const r={},o=n;let a=Object.keys(Hn)[0],i=55,l=100,u=ce.Male,c=null,f=null,m=null;const A=new kt;let M=0;const g=async x=>new Promise((_,E)=>{new Xt().load(x,_,void 0,E)}),h=()=>Promise.all([g(Un),g(Gn)]).then(x=>{r[ce.Male]=x[0],r[ce.Female]=x[1]}),y=(x,_,E)=>{const C="modulateMode"in _.prototype,w=x.material,S=x.geometry.userData,D=C?{modulateMode:"modulateMode"in w?w.modulateMode:S.modulateMode??0,modulateType:"modulateType"in w?w.modulateType:S.modulateType??0}:{},Y={side:"_side"in w?w._side:w.side,...D,color:w.color,transparent:!!(w.transparent||w.alphaTest)};w.map&&(Y.map=w.map),"modulateType"in S&&(Y.modulateMode=S.modulateMode??0,Y.modulateType=S.modulateType),E&&"colorInfo"in _.prototype&&(Y.colorInfo=E),x.material=new _(Y),w.dispose(),x.material instanceof ie&&S.modulateType===0&&(x.material.uniforms.drawType.value=0)},b=(x,_,E)=>{const C=O;if(!C)throw new Error(`Unknown shader: ${_}`);x.traverse(w=>{w instanceof Z&&y(w,C,E)})},T=async x=>{const _=await g(x),E=_.asset.extras;if(E&&E.additionalInfo){const w=E.additionalInfo;B.height=t?.height||w.height,B.build=t?.build||w.build,B.gender=t?.gender||w.gender,B.favoriteColor=t?.favoriteColor||w.favoriteColor,B.colorInfo=ie.getColorInfoFromCharInfoB64(E.charInfo)}const C=_.scene;return b(C,a,B.colorInfo),C.traverse(w=>{if(!(w instanceof Z))return;const S=w.geometry.userData,D=w.material;"modulateType"in S&&(w.renderOrder=S.modulateType),Array.isArray(S.modulateColor)&&(D.color=D.color.fromArray(S.modulateColor)),"modifyBufferGeometry"in D.constructor&&typeof D.constructor.modifyBufferGeometry=="function"&&D.constructor.modifyBufferGeometry({modulateParam:{type:S.modulateType}},w.geometry),D.map&&(D.map.colorSpace=k)}),C},v=x=>{let _=null;x.traverse(C=>{C instanceof K&&(_=C)});let E=0;x.traverse(C=>{if(!(C instanceof K))return;const w=_?C.id===_.id:E%2===0;C.geometry.userData.modulateMode=0,C.geometry.userData.modulateType=w?10:9,E++})};function I(x,_){const C=x*(_*.003671875+.4)/128+_*.001796875+.4,w=_*(.77/128)+.5;return{x:C,y:w,z:C}}const F=(x,_,E)=>{const C=I(_,E);kn(x,C,Pe(x))},R=(x,_,E,C)=>{v(x),b(x,a,_.colorInfo);const w=_e(Vt),S=_e(Wt[_.favoriteColor]);x.traverse(D=>{!(D instanceof K)||!("modulateType"in D.geometry.userData)||(D.geometry.userData.modulateType===9?D.material.color=S:D.geometry.userData.modulateType===10&&(D.material.color=w))}),F(x,E,C)},H=(x,_)=>{let E=null;return x.traverse(C=>{E||!(C instanceof K)||C.skeleton.bones.some(w=>w.name===_)&&(E=C)}),E},te=(x,_)=>{_.position.set(s[0],s[1],s[2]);const E=x.scaleDesc.head;if(E==="Head"){console.error("TODO: Head is not attached correctly to the Miitomo body. Skipping it so you can see what the model looks like anyway.");return}const C=x.model.getObjectByName(E);if(!(C instanceof re))throw new Error("Head bone not found.");const w=H(x.model,E);if(!w)throw new Error("No skinned mesh with head bone.");const S=w.skeleton;_.scale.setScalar(o*.1*Yt),C.add(_),S.attach(_,E)},J=x=>{x.traverse(_=>{if(_ instanceof Z&&(_.geometry.dispose(),_.material instanceof le)){const E=_.material.map;E&&E.dispose(),_.material.dispose()}_ instanceof K&&_.skeleton&&_.skeleton.dispose()})},st=(x,_)=>{x.model.position.set(s[0],s[1],s[2]),x.model.scale.setScalar(o),R(x.model,B,i,l),c&&te(x,c),f&&(d.remove(f.model),_&&(_.stopAllAction(),_.uncacheRoot(f.model)),J(f.model),f.model.traverse(E=>{if(E instanceof K){const C=E.skeleton;c&&C.detachAll&&C.detachAll()}})),d.add(x.model),f=x},ot=x=>{const _=r[x];if(!_)throw new Error(`No body template for gender ${x}`);const E=Sn(_.scene),C=_.animations;if(console.log({animations:C}),m=new Ot(E),C.length){let S=C.find(Y=>Y.name==="Wait")??C[0];m.clipAction(S).play().setLoop(Pt,1/0),m.update(0)}const w=Pe(E);return{model:E,scaleDesc:w,animations:C,mixer:m}},rt=x=>{i=B.build,l=B.height,u=B.gender;const _=m,E=ot(u);c&&(c.removeFromParent(),J(c)),c=x,st(E,_)},we=()=>{if(requestAnimationFrame(we),m){M+=A.getDelta(),m.setTime(M);const x=f?.model,_=f?.scaleDesc?.head;if(x&&_){const E=x.getObjectByName(_);E&&E instanceof re&&(E.rotation.x=qe.degToRad(-45),E.updateMatrixWorld(!0))}}};return z.useEffect(()=>{d&&requestAnimationFrame(()=>{Bn(ye),h().then(()=>{T(e).then(x=>{rt(x)})}),requestAnimationFrame(we)})},[d]),null}const ke=80,Be=45;function zn({scene:d}){const e=()=>{const t=new Re(ke,Be),s=new V({color:16777215}),n=new Z(t,s);n.position.y=0,n.rotation.x=-Math.PI/2,d.add(n);const r=new Re(.9,.9),o={r:239/255,g:236/255,b:221/255},a={r:222/255,g:227/255,b:222/255},i=Math.sqrt(Math.pow(16*1.2,2)+Math.pow(10*1.2,2));for(let l=0;l<ke/2;l++)for(let u=0;u<Be/2;u++){const c=l-u,f=10,m=.61;for(let A=0;A<2;A++)for(let M=0;M<2;M++){const g=M===0?1:-1,h=A===0?1:-1,y=m*g+l*1.2*g,b=m*h+u*1.2*h,T=Math.sqrt(y*y+b*b),v=Math.min(T/i,1),I={r:o.r+(a.r-o.r)*v,g:o.g+(a.g-o.g)*v,b:o.b+(a.b-o.b)*v},F=new V({color:new p(I.r,I.g,I.b)}),R=new Z(r,F);R.position.x=y,R.position.y=.01,R.position.z=b,R.rotation.x=Ae(-90),R.rotation.z=Ae(45+c*f)*g*h,d.add(R)}}};return z.useEffect(()=>{d&&requestAnimationFrame(()=>{e()})},[d]),null}const Kn=[{miiUrl:"https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=JasmineChlora&texResolution=256&resourceType=middle",redirect:"dummy",position:[0,0,0],overrides:{favoriteColor:16767008}},{miiUrl:"https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=Pompeyed&data=AwAAQIDDGQSA5EBQ1DCu7iAsjUgCugAAAFRQAG8AbQBwAGUAeQBlAGQAAAAAAEBnJgAeBSBpRBimNEYUhxIhaA0AKCkAUkhQRQBkAGQAaQBlAAAAAAAAAAAAAAAAADF0&type=face&width=270",redirect:"dummy",position:[4,0,4],overrides:{}},{miiUrl:"https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=Yokaiwatcher888&data=AwAAEPBBGKRApABAhGhediyc9OGcEwAAkVlMAHkAbABhAAAAAAAAAAAAAAAAAAB%2FBAA9AgppRRjNNEYUgRIAaAwAMCkwUkhQQQBsAGwAYQBuAAAAAAAAAAAAAAAAAPp4&type=face&width=270",redirect:"dummy",position:[-4,0,4]}];function Vn(){const d=z.useRef(null),e=z.useRef(null),t=z.useRef(null),s=z.useRef(null),[n,r]=z.useState(!1);let o=!1,a={x:0,y:0};const i=.02,l=h=>{o=!0,a={x:h.clientX,y:h.clientY},e.current.domElement.style.cursor="grabbing"},u=h=>{if(!o)return;const y=h.clientX-a.x,b=-1*(h.clientY-a.y);s.current.position.x-=y*i,s.current.position.z+=b*i;const T=d.current.clientWidth/2,v=d.current.clientHeight/2;s.current.position.x=Math.max(-T,Math.min(T,s.current.position.x)),s.current.position.z=Math.max(-v,Math.min(v,s.current.position.z)),a={x:h.clientX,y:h.clientY}},c=()=>{o=!1,e.current.domElement.style.cursor="grab"},f=h=>{const y=Number(zt)>=155?Math.PI:1,b=new jt(new p(.73,.73,.73),y),T=new je(new p(.6,.6,.6),y);T.position.set(-.455,.348,.5),h.add(b,T)},m=h=>{const y=new Bt;y.background=_e(15132410);const b=new Ut({antialias:!0});b.setSize(h.clientWidth,h.clientHeight),h.appendChild(b.domElement),f(y),W&&(W.enabled=!1),b.outputColorSpace=k;const T=new Qe(75,h.clientWidth/h.clientHeight,.1,1e3);T.position.set(0,10,1.75),T.rotation.set(Ae(-70),0,0),window.addEventListener("resize",()=>{T.aspect=window.innerWidth/window.innerHeight,T.updateProjectionMatrix(),b.setSize(window.innerWidth,window.innerHeight)}),e.current=b,t.current=y,s.current=T},A=()=>{const h=new Float32Array([-3.75,0,-3.75,3.75,0,3.75,3.75,0,-3.75,-3.75,0,3.75]),y=new Float32Array([0,0,2,2,2,0,0,2]),b=new Uint8Array([0,1,2,3,1,0]),T=new Xe;T.setAttribute("position",new Se(h,3)),T.setAttribute("uv",new Se(y,2)),T.setIndex(new Gt(b,1));const I=new Ke().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAACXBIWXMAAA3XAAAN1wFCKJt4AAABJUlEQVQ4y3WTSXLDMAwEgdmo/784B4iUnDg4+IKunoHK7Pp/0N3V33dNEI3/AFEkgO7uL4AliQS/G+wbINCo3wY6Q/DO+GVwEtuWKPAP0FlJYsuidsvX2WtlbcXc8WHAuoZwLG/gMWBd61onZGp2t3b+uh5iDgGBrg1kvQjHkgg+Bq9PwtaUuA1MVvIQcwiBbXCStW5iasjTUnuf5E1MTWAibL+ICYmkbfBMkpVcp4bE2yD5OO6Y+Vpkt6okyXokhxCJVhUlyZYdexNZsQdozVgfjixbQqu4Rzo5udaVRAJUuJdbEydrCLNKRYA8lCVvwlVVKIAAwYeanNkX0GgA2J5JcuL9/h7iqEjJrwfa88ZeKkp8A9XPbOH5r1Z1dVVX9/PTfYAfsQsMgS5LNfoAAAAASUVORK5CYII=",R=>{R.wrapS=xe,R.wrapT=xe,R.flipY=!1,R.needsUpdate=!0}),F=new V({map:I,transparent:!0,depthWrite:!1,blending:Ht,color:6710886});return new Z(T,F)},M=()=>{requestAnimationFrame(M),e.current&&t.current&&s.current&&e.current.render(t.current,s.current)},g=h=>{m(h),A(),e.current.domElement.addEventListener("mousedown",l),e.current.domElement.addEventListener("mousemove",u),e.current.domElement.addEventListener("mouseup",c),e.current.domElement.addEventListener("mouseleave",c),e.current.domElement.style.cursor="grab",requestAnimationFrame(M)};return z.useEffect(()=>(g(d.current),r(!0),()=>{e.current?.dispose(),d.current&&(d.current.innerHTML="")}),[]),Q.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh"},children:[Q.jsx("div",{ref:d,style:{width:"100%",height:"100%"}}),n&&t.current&&Q.jsxs(Q.Fragment,{children:[Q.jsx(zn,{scene:t.current}),Kn.map((h,y)=>Q.jsx(jn,{scene:t.current,miiUrl:h.miiUrl,position:h.position,overrides:h.overrides,scale:.15},y))]})]})}function Xn({}){return[{title:"Mii Plaza"},{name:"description",content:"This is a Mii Plaza page."}]}const Qn=it(function({loaderData:e}){return Q.jsx(Vn,{})});export{Qn as default,Xn as meta};
