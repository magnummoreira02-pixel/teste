export const HISTORY_STORAGE_KEY = "selecao-material-historico-v1";
export const BOXES_STORAGE_KEY = "selecao-material-caixas-v1";
export const MOVEMENTS_STORAGE_KEY = "selecao-material-movimentacoes-v1";
export const THEME_STORAGE_KEY = "agro-material-theme";
export const BACKUP_VERSION = 1;

export const PAPER = "var(--surface-soft)";
export const PANEL = "var(--surface)";

export const INK = "var(--text)";
export const INK_SOFT = "var(--muted)";

export const LINE = "var(--border)";
export const LINE_STRONG = "var(--border-strong)";

export const AMBER = "var(--warn)";
export const AMBER_BG = "var(--warn-bg)";

export const GREEN = "var(--accent)";
export const GREEN_BG = "var(--accent-bg)";

export const RED = "var(--danger)";
export const RED_BG = "var(--danger-bg)";

export const PURPLE = "var(--purple)";
export const PURPLE_BG = "var(--purple-bg)";
export const BLUE = "var(--blue)";
export const BLUE_BG = "var(--blue-bg)";
export const ORANGE = "var(--orange)";
export const ORANGE_BG = "var(--orange-bg)";

export const DEFAULT_COLOR_RULES = {
  avanco: {
    sim: GREEN_BG,
    nao: RED_BG
  },
  trait: {
    ce3: PURPLE_BG,
    e3: GREEN_BG,
    i5: BLUE_BG,
    gmb: RED_BG,
    con: ORANGE_BG
  },
  manual: {
    color: "#FFF1B8"
  }
};

export const DEFAULT_HIGHLIGHTED_FIELDS = ["Trait", "Avanco", "Avanço"];
export const DEFAULT_HIGHLIGHT_COLOR = "rgba(234, 179, 8, 0.30)";

export const FONT_IMPORT = `
  @import url(
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700
    &family=IBM+Plex+Sans:wght@400;500;600
    &family=IBM+Plex+Mono:wght@400;500;600
    &display=swap'
  );
`;
