import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Text, View, XStack, YStack } from "tamagui";

import { canSpinToday } from "./utils";
import type { DailySpinBannerProps } from "./types";

export const DailySpinBanner = ({
  onPress,
  lastSpinDate,
  WheelIcon,
  ArrowIcon,
}: DailySpinBannerProps) => {
  const canSpin = canSpinToday(lastSpinDate);

  const shimmer = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    if (canSpin) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [shimmer, pulse, canSpin]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + shimmer.value * 0.4,
  }));

  return (
    <Animated.View style={pulseStyle}>
      <Pressable onPress={onPress}>
        <View
          overflow="hidden"
          borderRadius={20}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.15}
          shadowRadius={12}
        >
          <View
            backgroundColor={canSpin ? "#1a1a3a" : "#2a2a3a"}
            padding={16}
            position="relative"
          >
            {/* Shimmer overlay */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                shimmerStyle,
              ]}
            >
              <View
                flex={1}
                backgroundColor="rgba(253, 198, 89, 0.05)"
              />
            </Animated.View>

            <XStack alignItems="center" gap={16}>
              {/* Wheel icon */}
              <View
                width={56}
                height={56}
                borderRadius={28}
                backgroundColor="rgba(253, 198, 89, 0.15)"
                alignItems="center"
                justifyContent="center"
                borderWidth={2}
                borderColor="rgba(253, 198, 89, 0.3)"
              >
                {WheelIcon || <Text fontSize={28}>🎡</Text>}
              </View>

              {/* Text content */}
              <YStack flex={1} gap={2}>
                <XStack alignItems="center" gap={8}>
                  <Text
                    fontSize={17}
                    fontWeight="800"
                    color="white"
                    letterSpacing={-0.3}
                  >
                    Daily Spin
                  </Text>
                  {canSpin && (
                    <View
                      backgroundColor="#43A047"
                      paddingHorizontal={8}
                      paddingVertical={2}
                      borderRadius={10}
                    >
                      <Text
                        fontSize={10}
                        fontWeight="700"
                        color="white"
                        textTransform="uppercase"
                      >
                        Ready!
                      </Text>
                    </View>
                  )}
                </XStack>
                <Text
                  fontSize={13}
                  color="rgba(255,255,255,0.6)"
                  fontWeight="500"
                >
                  {canSpin
                    ? "Spin the wheel for free Majority Points!"
                    : "Come back tomorrow for your next spin"}
                </Text>
              </YStack>

              {/* Arrow */}
              <View
                width={36}
                height={36}
                borderRadius={18}
                backgroundColor={canSpin ? "#FDC659" : "rgba(255,255,255,0.1)"}
                alignItems="center"
                justifyContent="center"
              >
                {ArrowIcon || (
                  <Text
                    fontSize={16}
                    color={canSpin ? "#1a1a3a" : "rgba(255,255,255,0.4)"}
                  >
                    →
                  </Text>
                )}
              </View>
            </XStack>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
