import { useState, useEffect } from "react";
import { MOBILE_BREAKPOINT } from "./bento.helpers"; // Importat ćemo konstantu

export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () =>
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
};
