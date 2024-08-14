import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

export default function Score() {
  const params = useLocalSearchParams();
  const { score, selectedEmoji } = params;
  const { width } = useWindowDimensions();

  const [buttonY, setButtonY] = useState(0);
  const emojiCount = 20;

  const emojis = Array.from({ length: emojiCount }, () => {
    const x = Math.random() * (width - 10);
    return {
      emoji: selectedEmoji,
      x,
      size: Math.random() * 30 + 20,
      rotate: Math.random() * 360,
      y: useSharedValue(-100),
    };
  });

  useEffect(() => {
    if (buttonY > 0) {
      emojis.forEach((emoji, index) => {
        emoji.y.value = withDelay(
          index * 150,
          withTiming(buttonY - 70, { duration: 1000 })
        );
      });
    }
  }, [buttonY]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={styles.scoreText}>{score} hits</Text>
      </View>
      <View style={{ height: 100 }}></View>
      <View style={StyleSheet.absoluteFillObject}>
        {emojis.map((emoji, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.fallingEmoji,
              useAnimatedStyle(() => ({
                transform: [
                  { translateY: emoji.y.value },
                  { translateX: emoji.x },
                  { rotate: `${emoji.rotate}deg` },
                ],
                fontSize: emoji.size,
              })),
            ]}
          >
            {emoji.emoji}
          </Animated.Text>
        ))}
      </View>
      <Link href="/" asChild>
        <Pressable
          style={styles.button}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setButtonY(layout.y);
          }}
        >
          <Feather name="rotate-ccw" size={24} color="#eee" />
          <Text style={styles.buttonText}>Play again</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#45B0FF",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#0E0C22",
    marginVertical: 24,
    paddingVertical: 20,
    paddingHorizontal: 64,
    borderRadius: 24,
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: "#eee",
    fontSize: 22,
    fontFamily: "DMSans_Bold",
  },
  scoreText: {
    fontSize: 36,
    marginVertical: 20,
  },
  emojiText: {
    fontSize: 56,
  },
  fallingEmoji: {
    position: "absolute",
  },
});
