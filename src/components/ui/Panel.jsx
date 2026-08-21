import { PANEL, LINE, INK, GREEN, GREEN_BG } from "../../utils/constants.js";
import StepBadge from "./StepBadge.jsx";
import Icon from "./Icon.jsx";

export default function Panel({
  step,
  title,
  description,
  active,
  children,
  trailing
}) {
  return (
    <section
      className="panel-surface"
      style={{
        background: PANEL,

        border:
          `1px solid ${LINE}`,

        borderRadius: 12,

        marginBottom: 20,

        opacity:
          active ? 1 : 0.62,

        transition:
          "opacity 0.25s ease, border-color 0.25s ease"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,

          padding:
            "16px 20px",

          borderBottom:
            `1px solid ${LINE}`
        }}
      >

        <StepBadge
          n={step}
          active={active}
        />

        <div
          style={{
            flex: 1,
            minWidth: 0
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap"
            }}
          >
            <span
              style={{
                fontFamily:
                  "'Space Grotesk', sans-serif",

                fontWeight: 600,
                fontSize: 15,

                letterSpacing:
                  "0.01em",

                color: INK
              }}
            >
              {title}
            </span>

            {active && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: GREEN_BG,
                  color: GREEN,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase"
                }}
              >
                <Icon name="Check" size={11} />
                Concluída
              </span>
            )}
          </div>

          {description && (
            <div
              className="muted-text"
              style={{ fontSize: 12.5, marginTop: 3 }}
            >
              {description}
            </div>
          )}
        </div>

        {trailing}

      </div>

      <div
        style={{
          padding: 20
        }}
      >
        {children}
      </div>

    </section>
  );
}
