import { INK_SOFT } from "../../utils/constants.js";

export default function ColorOption({ label, value, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12.5,
        color: INK_SOFT
      }}
    >
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 28, height: 24, padding: 0, border: 0, cursor: "pointer" }}
      />
      {label}
    </label>
  );
}
