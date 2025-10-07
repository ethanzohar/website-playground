import type { Route } from "./+types/home";
import MiiPlaza from "../pages/mii_plaza/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mii Plaza" },
    { name: "description", content: "This is a Mii Plaza page." },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return {};
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <MiiPlaza />;
}
