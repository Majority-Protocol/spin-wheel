import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text, View, XStack, YStack } from "tamagui";

import { TIER_CONFIG } from "./constants";
import { getResultTier } from "./utils";
import type { SpinResultProps } from "./types";

export const SpinResult = ({ value, visible }: SpinResultProps) => {
  const resultScale = useSharedValue(0);
  const resultRotate = useSharedValue(0);
  const glowPulse = useSharedValue(1);

  useEffect(() => {
    if (visible && value !== null) {
      resultScale.value = withSequence(
        withTiming(1.5, { duration: 300 }),
        withSpring(1, { damping: 8, stiffness: 120 })
      );

      resultRotate.value = withSequence(
        withTiming(-5, { duration: 80 }),
        withTiming(5, { duration: 80 }),
        withTiming(-3, { duration: 80 }),
        withTiming(3, { duration: 80 }),
        withTiming(0, { duration: 80 })
      );

      glowPulse.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      resultScale.value = 0;
    }
  }, [visible, value, resultScale, resultRotate, glowPulse]);

  const resultAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: resultScale.value },
      { rotate: `${resultRotate.value}deg` },
    ],
    opacity: resultScale.value,
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowPulse.value }],
    opacity: 0.6,
  }));

  if (!visible) return null;

  const tier = getResultTier(value);
  const config = TIER_CONFIG[tier];

  return (
    <View position="relative" alignItems="center">
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 250,
            height: 120,
            borderRadius: 60,
            backgroundColor: config.colors[0],
          },
          glowAnimatedStyle,
        ]}
      />

      <Animated.View style={resultAnimatedStyle}>
        <YStack
          alignItems="center"
          gap={8}
          backgroundColor="rgba(0,0,0,0.6)"
          paddingVertical={20}
          paddingHorizontal={40}
          borderRadius={24}
          borderWidth={2}
          borderColor={config.colors[0]}
        >
          <Text
            fontSize={12}
            fontWeight="600"
            color="rgba(255,255,255,0.7)"
            textTransform="uppercase"
            letterSpacing={2}
          >
            You won
          </Text>
          <XStack alignItems="baseline" gap={4}>
            <Text
              fontSize={56}
              fontWeight="900"
              color={config.colors[0]}
              letterSpacing={-2}
            >
              {value}
            </Text>
            <Text
              fontSize={18}
              fontWeight="700"
              color={config.colors[0]}
              opacity={0.8}
            >
              MP
            </Text>
          </XStack>
          <View
            backgroundColor={`${config.colors[0]}30`}
            paddingHorizontal={16}
            paddingVertical={6}
            borderRadius={16}
          >
            <Text
              fontSize={11}
              fontWeight="800"
              color={config.colors[0]}
              textTransform="uppercase"
              letterSpacing={2}
            >
              {config.label} Reward
            </Text>
          </View>
        </YStack>
      </Animated.View>
    </View>
  );
};
