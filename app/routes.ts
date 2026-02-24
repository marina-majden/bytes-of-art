import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes";

export default [
    index("routes/start.tsx"),
    layout("routes/layout.tsx", [
        route("portraits", "routes/portraits.tsx"),
        route("symbols", "routes/symbolism.tsx"),
        route("city", "routes/city.tsx/"),
    ]),
    route("about", "pages/portraits/Protopropaganda.tsx"),
    route("city/:locationId", "pages/city/CurrentCity.tsx"),
    route("city/quiz", "pages/city/QuizGame.tsx"),
    route("city/theory", "pages/city/TheoryLine.tsx"),
    route("story", "routes/story.tsx"),
    route("time", "routes/time.tsx"),
    route("iceberg", "pages/story/IcebergTheory.tsx"),
    route("artwork", "routes/artwork-detail.tsx"),
    route("colors", "routes/colors.tsx"),
    route("walls", "routes/walls.tsx"),
    route("walls/street", "pages/walls/StreetArtGallery.tsx"),
    route("walls/social", "pages/walls/InstaPoetry.tsx"),
    route("walls/studio", "pages/walls/CreativeStudio.tsx"),
] satisfies RouteConfig;
