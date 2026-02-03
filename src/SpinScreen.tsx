import { useEffect, useRef, useState } from "react";
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

import { SpinWheel } from "./SpinWheel";
import { SpinResult } from "./SpinResult";
import { canSpinToday } from "./utils";
import type { SpinWheelRef, SpinScreenProps } from "./types";

export const SpinScreen = ({
  onBack,
  lastSpinDate,
  spinHistory,
  onRecordSpin,
  onResetSpin,
  onPlaySound,
  showDevReset = false,
  BackIcon,
}: SpinScreenProps) => {
  const wheelRef = useRef<SpinWheelRef>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const floatY = useSharedValue(0);
  const canSpin = canSpinToday(lastSpinDate);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [floatY]);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    onPlaySound?.();
    wheelRef.current?.spin();
  };

  const handleSpinComplete = (value: number) => {
    setResult(value);
    onRecordSpin(value);
    setIsSpinning(false);
  };

  const floatAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const recentHistory = spinHistory.slice(0, 5);

  return (
    <View flex={1} backgroundColor="#0a0a1a">
      {/* Background gradient effect using layered views */}
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="#0a0a1a"
      />
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="50%"
        backgroundColor="#1a1a3a"
        opacity={0.5}
      />

      {/* Decorative circles */}
      <View
        position="absolute"
        top={-100}
        right={-100}
        width={300}
        height={300}
        borderRadius={150}
        backgroundColor="rgba(253, 198, 89, 0.05)"
      />
      <View
        position="absolute"
        bottom={-50}
        left={-50}
        width={200}
        height={200}
        borderRadius={100}
        backgroundColor="rgba(239, 124, 13, 0.05)"
      />

      {/* Header */}
      <XStack
        paddingTop={60}
        paddingHorizontal={16}
        paddingBottom={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable
          onPress={onBack}
          style={{
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 22,
          }}
        >
          {BackIcon || (
            <Text fontSize={20} color="#FDC659">
              ←
            </Text>
          )}
        </Pressable>

        <YStack alignItems="center">
          <Text
            fontSize={11}
            fontWeight="600"
            color="#FDC659"
            textTransform="uppercase"
            letterSpacing={3}
          >
            Daily Bonus
          </Text>
          <Text
            fontSize={24}
            fontWeight="900"
            color="white"
            letterSpacing={-0.5}
          >
            Spin & Win
          </Text>
        </YStack>

        <View width={44} />
      </XStack>

      {/* Main content */}
      <YStack flex={1} alignItems="center" justifyContent="center" gap={56}>
        {/* Wheel with glow effect */}
        <Animated.View style={floatAnimatedStyle}>
          <View position="relative">
            {/* Outer glow ring */}
            <View
              position="absolute"
              top={-20}
              left={-20}
              right={-20}
              bottom={-20}
              borderRadius={999}
              borderWidth={2}
              borderColor="rgba(253, 198, 89, 0.2)"
            />
            <View
              position="absolute"
              top={-35}
              left={-35}
              right={-35}
              bottom={-35}
              borderRadius={999}
              borderWidth={1}
              borderColor="rgba(253, 198, 89, 0.1)"
            />

            <SpinWheel ref={wheelRef} onSpinComplete={handleSpinComplete} />
          </View>
        </Animated.View>

        {/* Result display */}
        <SpinResult value={result ?? 0} visible={result !== null} />

        {/* Action area */}
        {canSpin && !result ? (
          <Pressable
            onPress={handleSpin}
            disabled={isSpinning}
            style={{
              width: 280,
              paddingVertical: 16,
              paddingHorizontal: 48,
              backgroundColor: isSpinning ? "#8B7355" : "#FDC659",
              borderRadius: 30,
              alignItems: "center",
              shadowColor: "#FDC659",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 24,
            }}
          >
            <Text
              fontSize={18}
              fontWeight="700"
              color="#1a1a1a"
            >
              {isSpinning ? "Spinning..." : "SPIN!"}
            </Text>
          </Pressable>
        ) : !canSpin && !result ? (
          <YStack
            alignItems="center"
            gap={12}
            backgroundColor="rgba(255,255,255,0.05)"
            paddingVertical={20}
            paddingHorizontal={32}
            borderRadius={20}
            borderWidth={1}
            borderColor="rgba(255,255,255,0.1)"
          >
            <Text fontSize={18} fontWeight="700" color="white">
              Come back tomorrow!
            </Text>
            {spinHistory[0] && (
              <XStack alignItems="center" gap={6}>
                <Text fontSize={14} color="rgba(255,255,255,0.6)">
                  Today's reward:
                </Text>
                <Text fontSize={14} fontWeight="700" color="#FDC659">
                  {spinHistory[0].value} MP
                </Text>
              </XStack>
            )}
            {showDevReset && onResetSpin && (
              <Pressable onPress={onResetSpin} style={{ marginTop: 8 }}>
                <Text
                  fontSize={11}
                  color="rgba(255,255,255,0.4)"
                  textDecorationLine="underline"
                >
                  Reset (dev)
                </Text>
              </Pressable>
            )}
          </YStack>
        ) : null}
      </YStack>

      {/* History section */}
      {recentHistory.length > 0 && (
        <YStack paddingHorizontal={24} paddingBottom={40} gap={12}>
          <XStack alignItems="center" gap={12}>
            <View height={1} flex={1} backgroundColor="rgba(255,255,255,0.1)" />
            <Text
              fontSize={11}
              fontWeight="600"
              color="rgba(255,255,255,0.4)"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Recent Spins
            </Text>
            <View height={1} flex={1} backgroundColor="rgba(255,255,255,0.1)" />
          </XStack>
          <XStack flexWrap="wrap" gap={8} justifyContent="center">
            {recentHistory.map((spin, index) => (
              <View
                key={spin.timestamp}
                backgroundColor={
                  index === 0
                    ? "rgba(253, 198, 89, 0.15)"
                    : "rgba(255,255,255,0.05)"
                }
                paddingVertical={8}
                paddingHorizontal={16}
                borderRadius={12}
                borderWidth={index === 0 ? 1 : 0}
                borderColor="rgba(253, 198, 89, 0.3)"
              >
                <Text
                  fontSize={15}
                  fontWeight="700"
                  color={index === 0 ? "#FDC659" : "rgba(255,255,255,0.6)"}
                >
                  +{spin.value}
                </Text>
              </View>
            ))}
          </XStack>
        </YStack>
      )}
    </View>
  );
};
