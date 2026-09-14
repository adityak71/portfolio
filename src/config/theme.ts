/* ===== Design Tokens =====
   Exact reproduction of the reference portfolio's design system.
   Colors, typography, spacing, easing, and duration values. */

// ——— Colors ———
export const BLUE = "#2563eb";
export const CYAN = "#60a5fa";
export const PURPLE = "#38bdf8";
export const GREEN = "#22c55e";
export const AMBER = "#f59e0b";
export const PINK = "#38bdf8";
export const RED = "#ef4444";

export const TEXT_PRIMARY = "#f4f6f7";
export const TEXT_SECONDARY = "#9ca9b0";
export const TEXT_MUTED = "#76838b";

export const BG_PRIMARY = "#0b1012";
export const BG_SECONDARY = "#0e1418";
export const BG_TERTIARY = "#10161a";
export const BG_CARD = "#0e1417";
export const BG_CARD_HOVER = "#131a1e";

export const BORDER = "#1d2529";
export const BORDER_HOVER = "#2b353a";
export const BORDER_GLOW = "#2563eb";
export const GLASS_BORDER = "rgba(255, 255, 255, 0.08)";

// ——— Typography ———
export const MONO_FONT = "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace";

// ——— Layout ———
export const MAX_WIDTH = 1152;
export const MAX_WIDTH_NARROW = 960;
export const MAX_WIDTH_WIDE = 1024;
export const MAX_WIDTH_FORM = 896;

// ——— Breakpoints ———
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  tablet: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  wide: `(min-width: ${BREAKPOINTS.xl}px)`,
  hover: "(hover: hover)",
} as const;

// ——— Easing ———
export const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  brisk: [0.25, 0.46, 0.45, 0.94] as const,
};

// ——— Duration ———
export const DURATION = {
  quick: 0.25,
  default: 0.4,
  slow: 0.7,
  ambient: 20,
};
