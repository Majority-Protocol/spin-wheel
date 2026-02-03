# @majority-protocol/spin-wheel

Daily spin wheel mini-game for Majority apps.

## Installation

```bash
npm install @majority-protocol/spin-wheel
```

### Peer Dependencies

```bash
npm install react react-native react-native-reanimated react-native-svg tamagui
```

## Quick Start

```tsx
import { SpinScreen } from "@majority-protocol/spin-wheel";

export default function Spin() {
  const router = useRouter();
  const { lastSpinDate, spinHistory, recordSpin, resetSpin } = useLocalStore();

  return (
    <SpinScreen
      onBack={() => router.back()}
      lastSpinDate={lastSpinDate}
      spinHistory={spinHistory}
      onRecordSpin={recordSpin}
      onResetSpin={resetSpin}
      showDevReset={__DEV__}
    />
  );
}
```

## Components

### SpinScreen

Full-screen spin wheel experience with animations, result display, and history.

```tsx
<SpinScreen
  onBack={() => router.back()}
  lastSpinDate={lastSpinDate}
  spinHistory={spinHistory}
  onRecordSpin={(value) => recordSpin(value)}
  onResetSpin={() => resetSpin()}
  onPlaySound={() => playWheelSound()}
  showDevReset={__DEV__}
  BackIcon={<MyBackIcon />}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onBack` | `() => void` | Yes | Navigate back handler |
| `lastSpinDate` | `string \| null` | Yes | Last spin date ISO string |
| `spinHistory` | `SpinHistoryEntry[]` | Yes | Array of recent spins |
| `onRecordSpin` | `(value: number) => void` | Yes | Record spin result |
| `onResetSpin` | `() => void` | No | Reset spin state (dev) |
| `onPlaySound` | `() => void` | No | Play sound on spin |
| `showDevReset` | `boolean` | No | Show dev reset button |
| `BackIcon` | `React.ReactNode` | No | Custom back icon |

### DailySpinBanner

Entry banner for games tab with pulse animation when spin is available.

```tsx
<DailySpinBanner
  onPress={() => router.push("/spin")}
  lastSpinDate={lastSpinDate}
  WheelIcon={<MyWheelIcon />}
  ArrowIcon={<MyArrowIcon />}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPress` | `() => void` | Yes | Navigate to spin screen |
| `lastSpinDate` | `string \| null` | Yes | Last spin date ISO string |
| `WheelIcon` | `React.ReactNode` | No | Custom wheel icon |
| `ArrowIcon` | `React.ReactNode` | No | Custom arrow icon |

### SpinWheel

Core wheel component for custom implementations.

```tsx
const wheelRef = useRef<SpinWheelRef>(null);

<SpinWheel
  ref={wheelRef}
  onSpinComplete={(value) => console.log(`Won ${value}!`)}
  size={280}
/>

// Trigger spin
wheelRef.current?.spin();
```

### SpinResult

Animated result display component.

```tsx
<SpinResult value={100} visible={showResult} />
```

## Utilities

```tsx
import {
  canSpinToday,
  getResultTier,
  TIER_CONFIG,
} from "@majority-protocol/spin-wheel";

// Check if user can spin
const canSpin = canSpinToday(lastSpinDate);

// Get tier for a value
const tier = getResultTier(500); // "legendary"
const config = TIER_CONFIG[tier]; // { colors: [...], label: "LEGENDARY" }
```

## State Management

The package doesn't include state management. You provide spin state via props:

```tsx
// Example with Zustand
const useSpinStore = create((set) => ({
  lastSpinDate: null,
  spinHistory: [],
  recordSpin: (value) =>
    set((state) => ({
      lastSpinDate: new Date().toISOString(),
      spinHistory: [
        { value, timestamp: new Date().toISOString() },
        ...state.spinHistory,
      ].slice(0, 10),
    })),
  resetSpin: () => set({ lastSpinDate: null }),
}));
```

## Wheel Values & Probabilities

| Value | Tier | Probability |
|-------|------|-------------|
| 1-10 | Common | ~5-14% each |
| 20 | Uncommon | ~4% |
| 50 | Rare | ~2% |
| 100 | Epic | ~1.5% |
| 500 | Legendary | ~1% |
| 1000 | Legendary | ~0.5% |

## License

MIT
