import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    // Set the base for deploying to a subdirectory on GitHub Pages.
    // This should match your repository name.
    base: "/bytes-of-art/",
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
