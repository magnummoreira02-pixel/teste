import Panel from "./ui/Panel.jsx";

export default function Movimentacoes({ movements, showFullHistory }) {
  return (
    <Panel step={6} title="Histórico de movimentações" description="Movimentações de caixas e materiais" active={movements.length > 0}>
      {!movements.length ? (
        <div className="muted-text" style={{ fontSize: 13 }}>As movimentações de caixas aparecerão aqui.</div>
      ) : (
        <div className="history-cards" style={{ display: "grid" }}>
          {movements.slice(0, showFullHistory ? movements.length : 10).map((movement) => (
            <div className="history-card" key={movement.id}>
              <div><div className="history-card-label">Data e hora</div><div className="history-card-value">{movement.date} {movement.time}</div></div>
              <div style={{ textAlign: "right" }}><div className="history-card-label">Ação</div><div className="history-card-value" style={{ fontWeight: 700 }}>{movement.action}</div></div>
              <div><div className="history-card-label">Código</div><div className="history-card-value history-card-code">{movement.code || "-"}</div></div>
              <div style={{ textAlign: "right" }}><div className="history-card-label">Caixa</div><div className="history-card-value">{movement.box ? `CAIXA ${movement.box}` : "-"}</div></div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
