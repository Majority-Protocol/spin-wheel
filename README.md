# @majority-protocol/spin-wheel

Daily spin wheel mini-game for Majority apps.

## Installation

```bash
npm install @majority-protocol/spin-wheel
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-native react-native-reanimated react-native-svg tamagui
```

## Usage

```tsx
import { useRef } from "react";
import { SpinWheel, SpinWheelRef, canSpinToday, getResultTier, TIER_CONFIG } from "@majority-protocol/spin-wheel";

function MySpinScreen() {
  const wheelRef = useRef<SpinWheelRef>(null);

  const handleSpin = () => {
    wheelRef.current?.spin();
  };

  const handleSpinComplete = (value: number) => {
    const tier = getResultTier(value);
    const config = TIER_CONFIG[tier];
    console.log(`Won ${value} points! Tier: ${config.label}`);
  };

  return (
    <View>
      <SpinWheel
        ref={wheelRef}
        onSpinComplete={handleSpinComplete}
        size={280}
      />
      <Button onPress={handleSpin}>SPIN!</Button>
    </View>
  );
}
```

## API

### SpinWheel Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSpinComplete` | `(value: number) => void` | required | Callback when spin completes |
| `size` | `number` | `280` | Wheel diameter in pixels |

### SpinWheelRef

```ts
type SpinWheelRef = {
  spin: () => void;
};
```

### Utility Functions

- `canSpinToday(lastSpinDate: string | null): boolean` - Check if user can spin today
- `getResultTier(value: number): ResultTier` - Get tier based on value (legendary, epic, rare, uncommon, common)
- `getWeightedRandomValue(): number` - Get a weighted random value for testing
- `formatSpinDate(timestamp: string): string` - Format a spin timestamp for display

### Constants

- `WHEEL_VALUES` - Array of values on the wheel segments
- `TIER_CONFIG` - Configuration for each tier (colors, label)
- `COLORS` - Color palette used by the wheel

## Wheel Values & Probabilities

The wheel has 30 segments with values ranging from 1 to 1000. Higher values are rarer:

| Value | Probability |
|-------|-------------|
| 1-2 | ~14% each |
| 3-5 | ~10-12% each |
| 6-10 | ~5-8% each |
| 20 | ~4% |
| 50 | ~2% |
| 100 | ~1.5% |
| 500 | ~1% |
| 1000 | ~0.5% |

## License

MIT
