import type { Route } from "./+types/home";
import { ImageExplode } from "../pages/image_explode/image_explode";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Image Explode" },
    { name: "description", content: "AAA" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <ImageExplode />;
}
