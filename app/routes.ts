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
    route("story", "routes/story.tsx"),
    route("time", "routes/time.tsx"),
    route("iceberg", "components/IcebergTheory.tsx"),
    route("artwork:id", "routes/artwork-detail.tsx"),
    route("walls", "routes/walls.tsx"),
] satisfies RouteConfig;
