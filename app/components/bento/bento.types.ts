export interface BentoCard {
    color: string;
    border?: boolean;
    label?: string;
    description?: string;
    href?: string;
    ariaLabel: string;
    image?: string;
    className?: string;
    breakout?: boolean;
}

export interface BentoProps {
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    enableTilt?: boolean;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}
