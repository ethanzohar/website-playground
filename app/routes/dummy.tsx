import type { Route } from "./+types/home";
import { Dummy } from "../pages/dummy/dummy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dummy Page" },
    { name: "description", content: "This is a dummy page for testing purposes." },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Dummy message={loaderData.message} />;
}
