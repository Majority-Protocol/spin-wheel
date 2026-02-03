import { WEIGHTED_VALUES, WHEEL_VALUES, SEGMENT_ANGLE, SEGMENT_COUNT } from "./constants";
import type { ResultTier } from "./types";

/**
 * Get a weighted random value based on probability distribution
 * Higher values are rarer
 */
export const getWeightedRandomValue = (): number => {
  const totalWeight = WEIGHTED_VALUES.reduce(
    (sum, item) => sum + item.weight,
    0
  );
  let random = Math.random() * totalWeight;

  for (const item of WEIGHTED_VALUES) {
    random -= item.weight;
    if (random <= 0) {
      return item.value;
    }
  }
  return WEIGHTED_VALUES[0].value;
};

/**
 * Find the segment index that contains a specific value
 */
export const findSegmentWithValue = (value: number): number => {
  const index = WHEEL_VALUES.indexOf(value);
  return index >= 0 ? index : 0;
};

/**
 * Check if user can spin today based on last spin date
 */
export const canSpinToday = (lastSpinDate: string | null): boolean => {
  if (!lastSpinDate) return true;
  return new Date().toDateString() !== new Date(lastSpinDate).toDateString();
};

/**
 * Get the result tier based on the value won
 */
export const getResultTier = (value: number): ResultTier => {
  if (value >= 500) return "legendary";
  if (value >= 100) return "epic";
  if (value >= 50) return "rare";
  if (value >= 20) return "uncommon";
  return "common";
};

/**
 * Format a timestamp for display
 */
export const formatSpinDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

/**
 * Create SVG path for a wheel segment
 */
export const createSegmentPath = (
  index: number,
  radius: number,
  centerX: number,
  centerY: number
): string => {
  const startAngle = index * SEGMENT_ANGLE - 90;
  const endAngle = (index + 1) * SEGMENT_ANGLE - 90;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
};

/**
 * Calculate which segment is at the top after rotation
 */
export const calculateWinningSegment = (finalAngle: number): number => {
  const normalizedAngle = ((finalAngle % 360) + 360) % 360;
  return (
    (SEGMENT_COUNT -
      1 -
      Math.floor(normalizedAngle / SEGMENT_ANGLE) +
      SEGMENT_COUNT) %
    SEGMENT_COUNT
  );
};
