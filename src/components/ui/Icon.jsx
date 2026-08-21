export default function Icon({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
  style
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "inline-block",
      flexShrink: 0,
      ...style
    }
  };

  const icons = {
    UploadCloud: (
      <svg {...common}>
        <path d="M16 16l-4-4-4 4" />
        <path d="M12 12v9" />
        <path d="M20.39 17.39A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.3" />
      </svg>
    ),

    FileSpreadsheet: (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
        <path d="M15 9v12" />
        <path d="M9 15h6" />
      </svg>
    ),

    Settings2: (
      <svg {...common}>
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="7" r="3" />
        <circle cx="7" cy="17" r="3" />
      </svg>
    ),

    Search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),

    X: (
      <svg {...common}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),

    Check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),

    RotateCcw: (
      <svg {...common}>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),

    AlertTriangle: (
      <svg {...common}>
        <path d="m21 21-1.8-3.2" />
        <path d="M5 17.8 3 21" />
        <path d="M3.3 16.5 12 3l8.7 13.5a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),

    Printer: (
      <svg {...common}>
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 14h12v8H6z" />
      </svg>
    ),

    Sun: (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),

    Moon: (
      <svg {...common}>
        <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
      </svg>
    ),

    Activity: (
      <svg {...common}>
        <path d="M3 12h4l2-7 4 14 2-7h6" />
      </svg>
    ),

    Camera: (
      <svg {...common}>
        <path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
    )
  };

  return icons[name] || null;
}
