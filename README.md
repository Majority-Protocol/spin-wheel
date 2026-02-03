# Spin Wheel

A daily spin wheel mini-game where users can spin once per day to win Majority Points. Features smooth animations, tier-based rewards, and spin history tracking.

## Project Structure

```
spin-wheel/
├── src/
│   ├── SpinScreen.tsx      # Full screen component
│   ├── SpinWheel.tsx       # Core wheel component
│   ├── SpinResult.tsx      # Animated result display
│   ├── DailySpinBanner.tsx # Entry banner for games tab
│   ├── constants.ts        # Wheel values, colors, tiers
│   ├── utils.ts            # Helper functions
│   ├── types.ts            # TypeScript types
│   └── index.ts            # Package exports
├── dist/                   # Built package files (auto-generated)
├── package.json
└── tsconfig.json
```

## Development Workflow

### Making Changes

1. **Edit components** in `src/`
2. **Build the package:**
   ```bash
   npm run build
   ```
3. **Test in mobile app** - changes are picked up automatically via file link in majority-apps
4. **Commit and push** to this repo

### Testing in Majority Apps

The majority-apps repo references this package via file path. After running `npm run build`, changes are available immediately in the mobile app - just reload the app.

```bash
# In spin-wheel repo
npm run build

# In majority-apps - just reload the simulator
```

## Usage

### SpinScreen (Full Experience)

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
      onPlaySound={() => playWheelSound()}
      showDevReset={__DEV__}
    />
  );
}
```

### DailySpinBanner (Entry Point)

```tsx
import { DailySpinBanner } from "@majority-protocol/spin-wheel";

<DailySpinBanner
  onPress={() => router.push("/spin")}
  lastSpinDate={lastSpinDate}
/>
```

### SpinWheel (Core Component)

For custom implementations:

```tsx
import { SpinWheel, SpinWheelRef } from "@majority-protocol/spin-wheel";

const wheelRef = useRef<SpinWheelRef>(null);

<SpinWheel
  ref={wheelRef}
  onSpinComplete={(value) => console.log(`Won ${value}!`)}
  size={280}
/>

// Trigger spin
wheelRef.current?.spin();
```

## Commands

```bash
npm install      # Install dependencies
npm run build    # Build the package
npm run dev      # Watch mode (rebuilds on changes)
```

## Features

- 30-segment wheel with values: 1-10, 20, 50, 100, 500, 1000
- Weighted probability system (higher values are rarer)
- Tier-based result display (legendary, epic, rare, uncommon, common)
- Smooth 8-second spin animation with deceleration
- Daily limit (one spin per day)
- Spin history tracking (last 5 shown)
- Floating wheel animation
- Pulse animation on banner when spin available

## Reward Tiers

| Value | Tier | Color | Probability |
|-------|------|-------|-------------|
| 1-10 | Common | Brown | ~5-14% each |
| 20 | Uncommon | Orange | ~4% |
| 50 | Rare | Gold | ~2% |
| 100 | Epic | Green | ~1.5% |
| 500 | Legendary | Purple | ~1% |
| 1000 | Legendary | Purple | ~0.5% |

## Peer Dependencies

```bash
npm install react react-native react-native-reanimated react-native-svg tamagui
```

## Props Reference

### SpinScreen

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onBack` | `() => void` | Yes | Navigate back |
| `lastSpinDate` | `string \| null` | Yes | Last spin ISO date |
| `spinHistory` | `SpinHistoryEntry[]` | Yes | Recent spins array |
| `onRecordSpin` | `(value: number) => void` | Yes | Record spin result |
| `onResetSpin` | `() => void` | No | Reset spin (dev) |
| `onPlaySound` | `() => void` | No | Play sound on spin |
| `showDevReset` | `boolean` | No | Show reset button |
| `BackIcon` | `ReactNode` | No | Custom back icon |

### DailySpinBanner

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPress` | `() => void` | Yes | Navigate to spin |
| `lastSpinDate` | `string \| null` | Yes | Last spin ISO date |
| `WheelIcon` | `ReactNode` | No | Custom wheel icon |
| `ArrowIcon` | `ReactNode` | No | Custom arrow icon |

## License

MIT
