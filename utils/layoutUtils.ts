// layoutUtils.ts

// Define the base layout type
export type Layout = {
  shots: number;
  id: string;
  label: string;
  gridLayout?: string;
};

// Define the layout configuration type
type LayoutConfig = {
  readonly shots: number;
  readonly gridLayout: string;
  readonly id: string;
  readonly label: string;
};

type LayoutConfigs = {
  [key: string]: LayoutConfig;
};

export const LAYOUT_CONFIGS: LayoutConfigs = {
  "2": {
    shots: 2,
    gridLayout: "grid grid-cols-1",
    id: "2",
    label: "2 Shots",
  },
  "3": {
    shots: 3,
    gridLayout: "grid grid-cols-1",
    id: "3",
    label: "3 Shots",
  },
  "4": {
    shots: 4,
    gridLayout: "grid grid-cols-1",
    id: "4",
    label: "4 Shots",
  },
  "6": {
    shots: 6,
    gridLayout: "grid grid-cols-2",
    id: "6",
    label: "6 Shots",
  },
};

export type LayoutType = keyof typeof LAYOUT_CONFIGS;

export function getLayoutInfo(layout?: string): LayoutConfig {
  if (!layout || !(layout in LAYOUT_CONFIGS)) {
    return LAYOUT_CONFIGS["2"];
  }
  return LAYOUT_CONFIGS[layout];
}

export function getRequiredShots(layout?: string): number {
  if (!layout || !(layout in LAYOUT_CONFIGS)) {
    return LAYOUT_CONFIGS["2"].shots;
  }
  return LAYOUT_CONFIGS[layout].shots;
}

// Helper to get all available layouts
export function getAvailableLayouts(): LayoutConfig[] {
  return Object.values(LAYOUT_CONFIGS);
}
