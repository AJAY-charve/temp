import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home", { replace: true }), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fbf7f3]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&display=swap');
        @keyframes dm-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dm-line { from { transform: scaleX(0); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }
        .dm-word { opacity: 0; animation: dm-rise 0.5s ease-out forwards; }
        .dm-line { transform: scaleX(0); opacity: 0; animation: dm-line 0.6s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .dm-word, .dm-line { animation-duration: 0.01s; animation-delay: 0s !important; }
        }
      `}</style>

      {/* wall + diagonal window-light streaks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* diagonal light/shadow bands (rise left -> right like the reference) */}
        <div
          className="absolute -left-[60%] -top-[60%] h-[220%] w-[220%] -rotate-[24deg] blur-2xl"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e3d4cd 0%, #f2e2d6 6%, #fff8f1 11%, #f6e2cf 16%, #efdcd3 21%, #fffaf4 27%, #f8e6d4 33%, #fffdf9 39%, #f3e3da 45%, #fff9f3 51%, #f5e1d0 56%, #fffcf8 62%, #efdfd8 68%, #fbf0e7 74%, #f4e3da 80%, #fffaf6 86%, #eadbd5 93%, #e2d4d0 100%)",
          }}
        />
        {/* warm glow top-right */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 28% at 75% 4%, rgba(250,225,198,0.85), transparent 70%), radial-gradient(55% 25% at 10% 0%, rgba(222,206,200,0.8), transparent 70%)",
          }}
        />
        {/* soft pink-grey corners at the bottom */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 22% at 0% 100%, rgba(226,210,206,0.9), transparent 70%), radial-gradient(60% 22% at 100% 100%, rgba(228,212,208,0.85), transparent 70%)",
          }}
        />
        {/* bright centre so the logo pops */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(70% 38% at 50% 48%, rgba(255,255,255,0.65), transparent 75%)",
          }}
        />
      </div>

      {/* logo */}
      <div className="relative w-[88vw] max-w-[440px]">
        <svg
          viewBox="100 390 850 700"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full drop-shadow-[3px_5px_4px_rgba(60,40,30,0.28)]"
          role="img"
          aria-label="DiabMeta"
        >
          <defs>
            <linearGradient id="green" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#52c41a" />
              <stop offset="1" stopColor="#0b6b1c" />
            </linearGradient>
            <linearGradient id="greenArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1f8a1f" />
              <stop offset="1" stopColor="#0f7a1f" />
            </linearGradient>
            <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4cc417" />
              <stop offset="1" stopColor="#157a1f" />
            </linearGradient>
            <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1d4ed8" />
              <stop offset="1" stopColor="#0b2f9a" />
            </linearGradient>
            <linearGradient id="blueDumb" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1e6fe0" />
              <stop offset="1" stopColor="#0a3fb0" />
            </linearGradient>
          </defs>

          {/* circle arcs */}
          <g fill="none" stroke="url(#greenArc)" strokeWidth="14">
            <path d="M 305 548 A 250 250 0 0 1 735 568" strokeLinecap="round" />
            <path d="M 342 795 A 250 250 0 0 0 435 880" strokeLinecap="butt" />
            <path d="M 722 768 A 250 250 0 0 1 620 865" strokeLinecap="butt" />
          </g>

          {/* person */}
          <circle cx="517" cy="486" r="47" fill="url(#green)" />
          <path
            d="M 386 504 Q 384 494 398 497 L 517 565 L 636 497 Q 650 494 648 504 L 575 600 Q 565 640 575 680 L 600 800 L 540 800 L 517 735 L 495 800 L 435 800 L 462 680 Q 470 640 458 600 Z"
            fill="url(#green)"
          />

          {/* leaves under person */}
          <path
            d="M 405 795 Q 500 790 518 905 Q 430 892 405 795 Z"
            fill="url(#leaf)"
          />
          <path
            d="M 632 792 Q 535 790 518 905 Q 605 892 632 792 Z"
            fill="url(#leaf)"
          />
          <g
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          >
            <path d="M 418 805 Q 470 840 508 895" />
            <path d="M 620 803 Q 568 840 528 895" />
          </g>

          {/* glucometer */}
          <rect
            x="298"
            y="762"
            width="32"
            height="44"
            rx="5"
            fill="url(#blue)"
          />
          <rect
            x="233"
            y="570"
            width="170"
            height="190"
            rx="38"
            fill="url(#blue)"
          />
          <rect x="257" y="593" width="123" height="100" rx="16" fill="#fff" />
          <path
            d="M 318 603 Q 342 638 344 654 A 26 26 0 1 1 292 654 Q 294 638 318 603 Z"
            fill="url(#blue)"
          />
          <g fill="#fff">
            <circle cx="281" cy="725" r="12" />
            <circle cx="318" cy="725" r="12" />
            <circle cx="355" cy="725" r="12" />
          </g>

          {/* dumbbell */}
          <g fill="url(#blueDumb)">
            <rect x="597" y="597" width="98" height="168" rx="49" />
            <rect x="722" y="597" width="98" height="168" rx="49" />
            <rect x="670" y="645" width="80" height="72" />
          </g>
          <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round">
            <path d="M 650 630 Q 628 680 650 732" />
            <path d="M 638 636 Q 618 680 638 726" opacity="0.8" />
            <path d="M 768 630 Q 790 680 768 732" />
            <path d="M 780 636 Q 800 680 780 726" opacity="0.8" />
          </g>

          {/* small leaf by wordmark */}
          <path
            d="M 262 950 Q 252 888 337 872 Q 337 938 262 950 Z"
            fill="url(#leaf)"
          />
          <path
            d="M 268 944 Q 295 910 325 884"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* wordmark */}
          <text
            x="113"
            y="1068"
            fontSize="192"
            fontWeight="900"
            textLength="824"
            lengthAdjust="spacingAndGlyphs"
            style={{
              fontFamily: "'Nunito','Poppins','Segoe UI',system-ui,sans-serif",
            }}
          >
            <tspan fill="#0b3d9e">Diab</tspan>
            <tspan fill="#17811c">Meta</tspan>
          </text>
        </svg>

        {/* tagline: words appear one by one, finishes within ~2s */}
        <div className="mt-1 flex items-center justify-center gap-3 px-1">
          <span
            className="dm-line h-[3px] w-[8%] shrink-0 origin-right rounded-full bg-[#1a8a1f]"
            style={{ animationDelay: "0.1s" }}
          />
          <p
            className="flex flex-wrap justify-center gap-x-[0.3em] text-center text-[clamp(13px,4.3vw,21px)] font-bold leading-tight text-[#0b2a6b]"
            style={{
              fontFamily: "'Nunito','Poppins','Segoe UI',system-ui,sans-serif",
            }}
          >
            {["A", "Step", "Towards", "Better", "Health"].map((word, i) => (
              <span
                key={word}
                className="dm-word"
                style={{ animationDelay: `${0.5 + i * 0.2}s` }}
              >
                {word}
              </span>
            ))}
          </p>
          <span
            className="dm-line h-[3px] w-[8%] shrink-0 origin-left rounded-full bg-[#1a8a1f]"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
      </div>
    </div>
  );
}
