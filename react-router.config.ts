// react-router.config.ts

import type { Config } from "@react-router/dev/config";

export default {
    // Set ssr to false for Single-Page Application (SPA) mode.
    ssr: false,
    // Set the basename for deploying to a subdirectory. This should match your repository name.
    basename: "/bytes-of-art/",
} satisfies Config;
