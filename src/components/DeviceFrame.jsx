import { useEffect, useState } from "react";

export default function DeviceFrame({ children }) {
  const DEVICE_W = 402;
  const DEVICE_H = 874;

  const [scale, setScale] = useState(1);

  // Auto-scale frame to fit viewport
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 430) {
        setScale(1);
        document.documentElement.style.setProperty("--device-scale", "1");
        return;
      }
      const padding = 32;
      const scaleX = (window.innerWidth - padding) / (DEVICE_W + 40);
      const scaleY = (window.innerHeight - padding) / (DEVICE_H + 40);
      const s = Math.min(scaleX, scaleY, 1);
      setScale(s);
      document.documentElement.style.setProperty(
        "--device-scale",
        s.toString(),
      );
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Scaled dimensions for the wrapper (so no extra empty space)
  const wrappedW = DEVICE_W * scale;
  const wrappedH = DEVICE_H * scale;

  return (
    <div className="device-outer w-full h-screen bg-[#0f1115] flex items-center justify-center overflow-hidden">
      {/* Wrapper — takes exactly the scaled size, so it centers perfectly */}
      <div
        className="relative"
        style={{
          width: wrappedW,
          height: wrappedH,
        }}
      >
        {/* iPhone frame — 402×874, then scaled */}
        <div
          className="device-frame absolute top-0 left-0 origin-top-left bg-black rounded-[3.2rem] shadow-[0_0_0_2px_#3a3d42,0_0_0_12px_#1c1e22,0_30px_80px_rgba(0,0,0,0.7)]"
          style={{
            width: DEVICE_W,
            height: DEVICE_H,
            transform: `scale(${scale})`,
          }}
        >
          {/* Titanium side buttons */}
          <div className="absolute -left-[3px] top-[110px] w-[3px] h-8 bg-[#2a2c30] rounded-l"></div>
          <div className="absolute -left-[3px] top-[170px] w-[3px] h-14 bg-[#2a2c30] rounded-l"></div>
          <div className="absolute -left-[3px] top-[250px] w-[3px] h-14 bg-[#2a2c30] rounded-l"></div>
          <div className="absolute -right-[3px] top-[190px] w-[3px] h-20 bg-[#2a2c30] rounded-r"></div>

          {/* Screen */}
          <div className="absolute inset-[3px] rounded-[2.9rem] overflow-hidden bg-[#faf8ff]">
            {/* Scrollable content */}
            <div
              id="device-scroll"
              className="w-full h-full overflow-y-auto scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="device-inner">{children}</div>
            </div>

            {/* Dynamic Island */}
            <div className="device-island absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-[60] pointer-events-none flex items-center justify-end pr-3">
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div>
            </div>

            {/* Status bar */}
            <div className="device-statusbar absolute top-0 inset-x-0 h-[44px] z-[59] flex items-center justify-between px-6 text-[12px] font-semibold text-black pointer-events-none">
              <span style={{ textShadow: "0 0 4px rgba(250,248,255,0.9)" }}>
                9:41
              </span>
              <span
                className="flex items-center gap-1 pr-1"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(250,248,255,0.9))",
                }}
              >
                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  fill="currentColor"
                >
                  <rect x="0" y="7" width="3" height="4" rx="0.5" />
                  <rect x="4.3" y="5" width="3" height="6" rx="0.5" />
                  <rect x="8.6" y="3" width="3" height="8" rx="0.5" />
                  <rect x="12.9" y="0" width="3" height="11" rx="0.5" />
                </svg>
                <svg
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="currentColor"
                >
                  <path d="M7.5 9.5a1 1 0 100 2 1 1 0 000-2z" />
                  <path d="M7.5 6c1 0 2 .4 2.8 1.1l1-1A5.4 5.4 0 007.5 4.6a5.4 5.4 0 00-3.8 1.5l1 1A4 4 0 017.5 6z" />
                  <path d="M7.5 2.6c1.8 0 3.4.7 4.6 1.8l1-1A8 8 0 007.5 1.2a8 8 0 00-5.6 2.2l1 1A6.5 6.5 0 017.5 2.6z" />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="21"
                    height="11"
                    rx="3"
                    stroke="currentColor"
                    strokeOpacity="0.4"
                  />
                  <rect
                    x="2"
                    y="2"
                    width="18"
                    height="8"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="22.5"
                    y="4"
                    width="1.5"
                    height="4"
                    rx="0.5"
                    fill="currentColor"
                    fillOpacity="0.4"
                  />
                </svg>
              </span>
            </div>

            {/* Home indicator */}
            <div className="device-homebar absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-[60] opacity-80 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
