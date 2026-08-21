import Panel from "./ui/Panel.jsx";
import Icon from "./ui/Icon.jsx";
import { LINE, LINE_STRONG, GREEN, GREEN_BG, RED, RED_BG, INK, INK_SOFT, PANEL } from "../utils/constants.js";

export default function ImportadorPlanilha({
  hasData,
  fileName,
  rowCount,
  columnCount,
  dragOver,
  parseError,
  inputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onOpenPicker,
  onFileInputChange,
  onReset
}) {
  return (
    <Panel
      step={1}
      title="Importar planilha"
      description="Carregue sua base de materiais"
      active={true}

      trailing={
        hasData && (

          <button
            onClick={onReset}

            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,

              background:
                "transparent",

              border:
                `1px solid ${LINE_STRONG}`,

              borderRadius: 4,

              padding:
                "6px 10px",

              fontSize: 12,

              color: INK_SOFT,

              cursor:
                "pointer",

              fontFamily:
                "'IBM Plex Sans', sans-serif"
            }}
          >

            <Icon
              name="RotateCcw"
              size={13}
            />

            Trocar arquivo

          </button>
        )
      }
    >

      {!hasData ? (

        <div
          className="drop-zone"
          role="button"
          tabIndex={0}
          aria-label="Importar planilha"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (inputRef.current) inputRef.current.click();
            }
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onOpenPicker}

          style={{
            border:
              `2px dashed ${
                dragOver
                  ? GREEN
                  : LINE_STRONG
              }`,

            borderRadius: 12,

            padding:
              "40px 20px",

            textAlign: "center",

            cursor: "pointer",

            background:
              dragOver
                ? GREEN_BG
                : "var(--surface-soft)",

            transition:
              "all 0.15s ease"
          }}
        >

          <div
            style={{
              width: 52,
              height: 52,
              margin: "0 auto 12px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background: GREEN_BG,
              color: GREEN
            }}
          >
            <Icon
              name="UploadCloud"
              size={26}
              color={GREEN}
            />
          </div>

          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 4,
              color: INK
            }}
          >
            {dragOver ? "Solte a planilha aqui" : "Arraste a planilha aqui"}
          </div>

          <div
            style={{
              fontSize: 13,
              color: INK_SOFT,
              marginBottom: 10
            }}
          >
            ou clique para selecionar o arquivo
          </div>

          <div
            style={{
              display: "inline-flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: INK_SOFT
            }}
          >
            {["XLSX", "XLS", "XLSB", "CSV"].map((format) => (
              <span key={format} style={{ padding: "3px 8px", borderRadius: 5, border: `1px solid ${LINE}`, background: PANEL, fontFamily: "'IBM Plex Mono', monospace" }}>
                {format}
              </span>
            ))}
          </div>

          <input
            ref={inputRef}

            type="file"

            accept=".xlsx,.xls,.xlsb,.csv"

            onChange={
              onFileInputChange
            }

            style={{
              display: "none"
            }}
          />

        </div>

      ) : (

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 16px",
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            background: "var(--surface-soft)"
          }}
        >

          <div
            style={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: 10,
              background: GREEN_BG,
              color: GREEN,
              flexShrink: 0
            }}
          >
            <Icon
              name="FileSpreadsheet"
              size={20}
              color={GREEN}
            />
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0
            }}
          >

            <div
              style={{
                fontWeight: 600,
                fontSize: 13.5,
                overflowWrap: "anywhere"
              }}
            >
              {fileName}
            </div>

            <div
              style={{
                fontSize: 12,
                color: INK_SOFT
              }}
            >
              {rowCount}

              {" "}

              {rowCount === 1
                ? "linha"
                : "linhas"}

              {" · "}

              {columnCount}

              {" "}

              {columnCount === 1
                ? "coluna"
                : "colunas"}
            </div>

          </div>

        </div>
      )}


      {parseError && (

        <div
          style={{
            marginTop: 12,

            display: "flex",

            gap: 8,

            alignItems:
              "flex-start",

            background: RED_BG,

            color: RED,

            border:
              `1px solid ${RED}`,

            borderRadius: 8,

            padding:
              "10px 12px",

            fontSize: 12.5
          }}
        >

          <Icon
            name="AlertTriangle"
            size={15}
            color={RED}
          />

          <span>
            {parseError}
          </span>

        </div>
      )}

    </Panel>
  );
}
