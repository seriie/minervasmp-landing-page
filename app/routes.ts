import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("donate", "routes/donate.tsx"),
  route("paypal-success", "routes/paypal-success.tsx"),
] satisfies RouteConfig;
