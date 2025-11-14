import React from "react";

interface BentoStylesProps {
    glowColor: string;
}

export const BentoStyles: React.FC<BentoStylesProps> = ({ glowColor }) => (
    <style>
        {`
      .bento-section {
        --glow-x: 50%;
        --glow-y: 50%;
        --glow-intensity: 0;
        --glow-radius: 200px;
        --glow-color: ${glowColor};
        --border-color: #392e4e;
        --background-dark: #060010;
        --white: hsl(0, 0%, 100%);
        --purple-primary: rgba(105, 70, 255, 1);
        --purple-glow: rgba(105, 70, 255, 0.2);
        --purple-border: rgba(105, 70, 255, 0.6);
      }
      
      .card-responsive {
        grid-template-columns: 1fr;
        width: 90%;
        margin: 0 auto;
        padding: 0;
      }
      
      @media (min-width: 600px) {
        .card-responsive {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (min-width: 1024px) {
        .card-responsive {
          grid-template-columns: repeat(4, 1fr);
          grid-auto-flow: dense; /* Iz našeg poboljšanja! */
        }
      }
      
      .card--border-glow::after {
        content: '';
        position: absolute;
        inset: 0;
        padding: 6px;
        background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%);
        border-radius: inherit;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: subtract;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1;
      }
      
      .card--border-glow:hover::after {
        opacity: 1;
      }
      
      .card--border-glow:hover {
        box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
      }
      
      .particle::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: rgba(${glowColor}, 0.2);
        border-radius: 50%;
        z-index: -1;
      }
      
      .particle-container:hover {
        box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
      }
      
      .text-clamp-1 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .text-clamp-2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      @media (max-width: 599px) {
        .card-responsive {
          grid-template-columns: 1fr;
          width: 90%;
          margin: 0 auto;
          padding: 0.5rem;
        }
        
        .card-responsive .card {
          width: 100%;
          min-height: 180px;
        }
      }
    `}
    </style>
);
