// Visual segments on the wheel
export const WHEEL_VALUES = [
  1, 4, 2, 7, 3, 10, 5, 8, 2, 20, 6, 3, 9, 50, 1, 4, 7, 2, 10, 5, 8, 100, 3, 6,
  500, 9, 4, 1000, 2, 5,
];

export const SEGMENT_COUNT = WHEEL_VALUES.length;
export const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
export const DEFAULT_WHEEL_SIZE = 280;

// Weighted probabilities for random selection
export const WEIGHTED_VALUES = [
  { value: 1, weight: 14 },
  { value: 2, weight: 14 },
  { value: 3, weight: 12 },
  { value: 4, weight: 10 },
  { value: 5, weight: 10 },
  { value: 6, weight: 8 },
  { value: 7, weight: 7 },
  { value: 8, weight: 6 },
  { value: 9, weight: 5 },
  { value: 10, weight: 5 },
  { value: 20, weight: 4 },
  { value: 50, weight: 2 },
  { value: 100, weight: 1.5 },
  { value: 500, weight: 1 },
  { value: 1000, weight: 0.5 },
];

export const COLORS = {
  gold: "#FDC659",
  orange: "#EF7C0D",
  red: "#E53935",
  green: "#43A047",
  purple: "#9C27B0",
} as const;

export const TIER_CONFIG = {
  legendary: { colors: ["#9C27B0", "#E040FB"], label: "LEGENDARY" },
  epic: { colors: ["#43A047", "#69F0AE"], label: "EPIC" },
  rare: { colors: ["#FDC659", "#FFE082"], label: "RARE" },
  uncommon: { colors: ["#EF7C0D", "#FFB74D"], label: "UNCOMMON" },
  common: { colors: ["#8D6E63", "#BCAAA4"], label: "COMMON" },
} as const;
