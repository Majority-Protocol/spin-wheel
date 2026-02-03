export type SpinWheelRef = {
  spin: () => void;
};

export type SpinWheelProps = {
  /** Callback when spin animation completes with the winning value */
  onSpinComplete: (value: number) => void;
  /** Size of the wheel in pixels (default: 280) */
  size?: number;
};

export type ResultTier = "legendary" | "epic" | "rare" | "uncommon" | "common";

export type SpinHistoryEntry = {
  value: number;
  timestamp: string;
};
