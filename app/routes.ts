import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("routes/layout.tsx", [
        route("portraits", "routes/portraits.tsx"),
        route("symbolism", "routes/symbolism.tsx"),
        route("city", "routes/city.tsx/"),
    ]),
    route("city/:locationId", "components/CurrentCity.tsx"),
] satisfies RouteConfig;
