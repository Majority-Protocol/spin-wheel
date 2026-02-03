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

export type SpinScreenProps = {
  /** Navigate back handler */
  onBack: () => void;
  /** Last spin date ISO string (null if never spun) */
  lastSpinDate: string | null;
  /** Array of recent spin history */
  spinHistory: SpinHistoryEntry[];
  /** Called when a spin completes to record the result */
  onRecordSpin: (value: number) => void;
  /** Called to reset spin state (dev only, optional) */
  onResetSpin?: () => void;
  /** Optional sound play handler */
  onPlaySound?: () => void;
  /** Show dev reset button (default: false) */
  showDevReset?: boolean;
  /** Custom back icon component */
  BackIcon?: React.ReactNode;
};

export type DailySpinBannerProps = {
  /** Navigate to spin screen */
  onPress: () => void;
  /** Last spin date ISO string (null if never spun) */
  lastSpinDate: string | null;
  /** Custom wheel icon component */
  WheelIcon?: React.ReactNode;
  /** Custom arrow icon component */
  ArrowIcon?: React.ReactNode;
};

export type SpinResultProps = {
  /** The value won */
  value: number;
  /** Whether to show the result */
  visible: boolean;
};
