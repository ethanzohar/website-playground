import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dummy", "routes/dummy.tsx"),
  route("mii_plaza", "routes/mii_plaza.tsx")
] satisfies RouteConfig;
