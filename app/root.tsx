import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ArtThemeProvider } from "./context/ArtThemeContext";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton+SC&family=Gowun+Dodum&family=League+Spartan:wght@100..900&family=Roboto+Flex:opsz,wght,XOPQ,XTRA,YOPQ,YTDE,YTFI,YTLC,YTUC@8..144,100..1000,96,468,79,-203,738,514,712&family=Saira+Stencil+One&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Ysabeau+SC:wght@1..1000&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />

                <Links />
            </head>
            <body>
                {children}
                {/* <ScrollRestoration /> */}

                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <ArtThemeProvider>
            <Outlet />
        </ArtThemeProvider>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <Layout>
            <main className='pt-16 p-4 container mx-auto'>
                <h1>{message}</h1>
                <p>{details}</p>
                {stack && (
                    <pre className='w-full p-4 overflow-x-auto'>
                        <code>{stack}</code>
                    </pre>
                )}
            </main>
        </Layout>
    );
}
