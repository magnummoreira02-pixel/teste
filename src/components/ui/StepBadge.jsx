import { GREEN, LINE_STRONG, INK_SOFT, GREEN_BG } from "../../utils/constants.js";

export default function StepBadge({ n, active }) {
  return (
    <div
      className="step-badge"
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",

        border:
          `1.5px solid ${
            active ? GREEN : LINE_STRONG
          }`,

        color:
          active ? "#fff" : INK_SOFT,

        background:
          active ? GREEN : "transparent",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontFamily:
          "'IBM Plex Mono', monospace",

        fontWeight: 700,
        fontSize: 12,

        flexShrink: 0,

        boxShadow:
          active ? `0 0 0 4px ${GREEN_BG}` : "none",

        transition:
          "background-color 180ms ease, border-color 180ms ease, color 180ms ease"
      }}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}
