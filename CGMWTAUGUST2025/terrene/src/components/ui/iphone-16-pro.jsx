import React from "react";

export function Iphone16Pro({
  width = 280,
  height = 570,
  src,
  children,
  style = {},
  className = "",
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        display: "block",
        maxWidth: "100%",
        ...style,
      }}
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="titaniumRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="25%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#475569" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <clipPath id="roundedCorners">
          <rect
            fill="#ffffff"
            x="14.08"
            y="12.81"
            width="171.98"
            height="374.37"
            rx="24.62"
            ry="24.62"
          />
        </clipPath>
      </defs>

      {/* Titanium outer rim stroke */}
      <rect
        x="4.8"
        y="4.2"
        width="190.4"
        height="391.6"
        rx="32.5"
        fill="none"
        stroke="url(#titaniumRim)"
        strokeWidth="1.8"
      />

      {/* Outer bezel / frame */}
      <path
        fill="#232528"
        stroke="#475569"
        strokeWidth="0.5"
        d="M196.11,128.09c0-.25-.2-.45-.45-.45-.11.04-.37.03-.69,0V36.69c0-17.84-14.46-32.31-32.31-32.31H37.48C19.63,4.39,5.17,18.85,5.17,36.69v48.99c-.3.02-.55.03-.66-.02-.25,0-.45.2-.45,0,0,0,17.29,0,17.29-.03.41.5.49,1.11.48v13.63c-.61,0-1.14.08-1.11.48,0,0,0,28.54,0,28.54-.03.42.5.49,1.11.48v7.95c-.61,0-1.14.08-1.11.48,0,0,0,28.54,0,28.54-.03.42.5.49,1.11.48v178.86c0,17.84,14.46,32.31,32.31,32.31h125.2c17.84,0,32.31-14.46,32.31-32.31v-188.87c.32-.02.58-.03.69.04,1.26.1.03-45.94.45-46.38ZM186.07,362.63c0,13.56-10.99,24.56-24.56,24.56H38.64c-13.56,0-24.56-10.99-24.56-24.56V37.37c0-13.56,10.99-24.56,24.56-24.56h122.87c13.56,0,24.56,10.99,24.56,24.56v325.26Z"
      />
      {/* Inner dark border */}
      <path
        fill="#050505"
        d="M161.38,7.29H38.78c-16.54,0-29.95,13.41-29.95,29.95v325.52c0,16.54,13.41,29.95,29.95,29.95h122.6c16.54,0,29.95-13.41,29.95-29.95V37.24c0-16.54-13.41-29.95-29.95-29.95ZM186.07,362.57c0,13.6-11.02,24.62-24.62,24.62H38.7c-13.6,0-24.62-11.02-24.62-24.62V37.43c0-13.6,11.02-24.62,24.62-24.62h122.75c13.6,0,24.62,11.02,24.62,24.62v325.14Z"
      />

      {/* Screen background (White like mockup) */}
      <rect
        fill="#ffffff"
        x="14.08"
        y="12.81"
        width="171.98"
        height="374.37"
        rx="24.62"
        ry="24.62"
      />
      {src && (
        <image
          href={src}
          x="14.08"
          y="12.81"
          width="171.98"
          height="374.37"
          rx="24.62"
          ry="24.62"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}
      {children && (
        <foreignObject
          x="14.08"
          y="12.81"
          width="171.98"
          height="374.37"
          clipPath="url(#roundedCorners)"
        >
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            {children}
          </div>
        </foreignObject>
      )}

      {/* Dynamic Island */}
      <path
        fill="#000000"
        d="M119.61,33.86h-38.93c-10.48-.18-10.5-15.78,0-15.96,0,0,38.93,0,38.93,0,4.41,0,7.98,3.57,7.98,7.98,0,4.41-3.57,7.98-7.98,7.98Z"
      />
      <circle
        cx="110.5"
        cy="25.88"
        r="3.5"
        fill="#0d1117"
      />
      <circle
        cx="110.5"
        cy="25.88"
        r="1.5"
        fill="#1e293b"
      />

    </svg>
  );
}
