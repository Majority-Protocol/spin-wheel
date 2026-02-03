import { forwardRef, useImperativeHandle } from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { View } from "tamagui";

import {
  WHEEL_VALUES,
  SEGMENT_ANGLE,
  COLORS,
  DEFAULT_WHEEL_SIZE,
} from "./constants";
import { createSegmentPath, calculateWinningSegment } from "./utils";
import type { SpinWheelRef, SpinWheelProps } from "./types";

export const SpinWheel = forwardRef<SpinWheelRef, SpinWheelProps>(
  ({ onSpinComplete, size = DEFAULT_WHEEL_SIZE }, ref) => {
    const rotation = useSharedValue(0);
    const wheelRadius = size / 2;

    const spin = () => {
      // Always spin forward from current position
      const currentRotation = rotation.value;
      const spins = 5 + Math.random() * 3;
      const randomExtra = Math.random() * 360;
      const finalAngle = currentRotation + spins * 360 + randomExtra;

      // Calculate which segment is under the arrow tip after rotation
      const segmentIndex = calculateWinningSegment(finalAngle);
      const winningValue = WHEEL_VALUES[segmentIndex];

      rotation.value = withTiming(
        finalAngle,
        {
          duration: 8000,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(onSpinComplete)(winningValue);
          }
        }
      );
    };

    useImperativeHandle(ref, () => ({
      spin,
    }));

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const getSegmentColor = (value: number, index: number): string => {
      if (value >= 1000) return COLORS.purple;
      if (value >= 500) return COLORS.green;
      if (value >= 100) return COLORS.green;
      if (value >= 50) return COLORS.gold;
      return index % 2 === 0 ? COLORS.gold : COLORS.orange;
    };

    return (
      <View alignItems="center" justifyContent="center">
        {/* Fixed pointer at top */}
        <View
          position="absolute"
          top={-10}
          zIndex={10}
          width={0}
          height={0}
          // @ts-expect-error - React Native style
          borderLeftWidth={15}
          borderLeftColor="transparent"
          borderRightWidth={15}
          borderRightColor="transparent"
          borderTopWidth={25}
          borderTopColor={COLORS.red}
        />

        <Animated.View style={animatedStyle}>
          <Svg width={size} height={size}>
            <G>
              {WHEEL_VALUES.map((value, index) => {
                const color = getSegmentColor(value, index);
                const path = createSegmentPath(
                  index,
                  wheelRadius,
                  wheelRadius,
                  wheelRadius
                );

                const textAngle =
                  index * SEGMENT_ANGLE - 90 + SEGMENT_ANGLE / 2;
                const textRad = (textAngle * Math.PI) / 180;
                const textRadius = wheelRadius * 0.75;
                const textX = wheelRadius + textRadius * Math.cos(textRad);
                const textY = wheelRadius + textRadius * Math.sin(textRad);
                const textRotation = textAngle + 90;

                return (
                  <G key={index}>
                    <Path
                      d={path}
                      fill={color}
                      stroke="#FFFFFF"
                      strokeWidth={1}
                    />
                    <SvgText
                      x={textX}
                      y={textY}
                      fill="#FFFFFF"
                      fontSize={10}
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      rotation={textRotation}
                      origin={`${textX}, ${textY}`}
                    >
                      {value >= 1000 ? "1K" : value}
                    </SvgText>
                  </G>
                );
              })}
            </G>
            {/* Center circle */}
            <G>
              <Path
                d={`M ${wheelRadius - 12} ${wheelRadius}
                    A 12 12 0 1 1 ${wheelRadius + 12} ${wheelRadius}
                    A 12 12 0 1 1 ${wheelRadius - 12} ${wheelRadius}`}
                fill="#1a1a1a"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </G>
          </Svg>
        </Animated.View>
      </View>
    );
  }
);

SpinWheel.displayName = "SpinWheel";
