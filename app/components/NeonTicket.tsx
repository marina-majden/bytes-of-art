import React from "react";

interface NeonTicketProps {
    text: string;
    icon: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const NeonTicket: React.FC<NeonTicketProps> = ({
    text,
    icon,
    className,
    onClick,
}) => {
    return (
        <>
            <style>
                {`
.neon-ticket {
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  width: 18rem;
  height: 6rem;
  background: #19192c;
  border-radius: 1rem;
  overflow: hidden;
  font-size: 1.2rem;
  cursor: pointer;
  --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
  --color: #32a6ff
}

.neon-ticket:before {
  position: absolute;
  content: "";
  inset: 0.0625rem;
  border-radius: 0.9375rem;
  background: #181930;
  z-index: 2
}

.neon-ticket:after {
  position: absolute;
  content: "";
  width: 0.25rem;
  inset: 0.65rem auto 0.65rem 0.5rem;
  border-radius: 0.125rem;
  background: var(--gradient);
  transition: transform 300ms ease;
  z-index: 4;
}

.neon-ticket:hover:after {
  transform: translateX(0.15rem)
}


.neon-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  font-size: 1.4rem;
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
}

.neon-ticket:hover .neon-body {
  transform: translateX(0.20rem)
}

.neon-glow,
.neon-borderglow {
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle closest-side at center, #9466cb, transparent);
  opacity: 0;
  transition: opacity 300ms ease;
}

.neon-glow {
  z-index: 3;
}

.neon-borderglow {
  z-index: 1;
}

.neon-ticket:hover .neon-glow {
  opacity: 0.1
}

.neon-ticket:hover .neon-borderglow {
  opacity: 0.1
}

} `}
            </style>

            <div className={`neon-ticket ${className}`} onClick={onClick}>
                <div className='neon-glow'></div>
                <div className='neon-borderglow'></div>
                <div className='neon-body'>
                    {text}
                    {icon}
                </div>
            </div>
        </>
    );
};

export default NeonTicket;
