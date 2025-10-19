import type { Route } from "./+types/home";
import {MiiBuilder} from "../pages/mii/mii_builder/mii_builder";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mii Builder" },
    { name: "description", content: "This is a Mii Builder page." },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return {};
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <MiiBuilder />;
}
