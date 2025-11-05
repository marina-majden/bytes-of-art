import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/homepage.tsx"),

        route("portraits", "routes/portraits.tsx"),
        route("symbolism", "routes/symbolism.tsx"),
        route("city", "components/CityMap.tsx/"),
        route("city/:locationId", "routes/city.tsx"),
    ]),
] satisfies RouteConfig;
