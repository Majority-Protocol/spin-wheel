// Components
export { SpinWheel } from "./SpinWheel";

// Constants
export {
  WHEEL_VALUES,
  SEGMENT_COUNT,
  SEGMENT_ANGLE,
  DEFAULT_WHEEL_SIZE,
  WEIGHTED_VALUES,
  COLORS,
  TIER_CONFIG,
} from "./constants";

// Utilities
export {
  getWeightedRandomValue,
  findSegmentWithValue,
  canSpinToday,
  getResultTier,
  formatSpinDate,
  createSegmentPath,
  calculateWinningSegment,
} from "./utils";

// Types
export type {
  SpinWheelRef,
  SpinWheelProps,
  ResultTier,
  SpinHistoryEntry,
} from "./types";
