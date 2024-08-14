import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const FPS = 60;
const DELTA = 1000 / FPS;
const SPEED = 10;
const BALL_WIDTH = 56;
const PAN_SCALE = 0.5;
const START_POINT = { x: 100, y: 400 };

const normalizeVector = (vector: { x: number; y: number }) => {
  const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
  };
};

export default function Game() {
  const { selectedEmoji } = useLocalSearchParams();
  const router = useRouter();

  const { height, width } = useWindowDimensions();
  const playerDimensions = {
    w: width / 3,
    h: 37,
  };

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const targetPositionX = useSharedValue(START_POINT.x);
  const targetPositionY = useSharedValue(START_POINT.y);
  const direction = useSharedValue(
    normalizeVector({ x: Math.random() - 0.5, y: -0.5 })
  );
  const playerPos = useSharedValue({ x: width / 4, y: height - 100 });

  useEffect(() => {
    targetPositionY.value = withTiming(height / 2, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  }, [height, targetPositionY]);

  useEffect(() => {
    if (gameOver) {
      router.push({
        pathname: "/score",
        params: { score: score.toString(), selectedEmoji },
      });
    } else {
      const interval = setInterval(update, DELTA);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const update = () => {
    const nextPos = getNextPos(direction.value);
    let newDirection = direction.value;

    if (nextPos.y < 0) {
      newDirection = { x: direction.value.x, y: -direction.value.y };
    }

    if (nextPos.x < 0 || nextPos.x > width - BALL_WIDTH) {
      newDirection = { x: -direction.value.x, y: direction.value.y };
    }

    const hitDetected = detectHit(nextPos);
    if (hitDetected) {
      newDirection = {
        x:
          targetPositionX.value < playerPos.value.x ||
          targetPositionX.value > playerPos.value.x + playerDimensions.w
            ? -direction.value.x
            : direction.value.x,
        y: -direction.value.y,
      };
      setScore((prevScore) => prevScore + 1);
    } else if (nextPos.y > height - BALL_WIDTH) {
      setGameOver(true);
    }

    direction.value = newDirection;
    moveTargetToNextPos(newDirection);
  };

  const detectHit = (nextPos: { x: number; y: number }) => {
    return (
      nextPos.x < playerPos.value.x + playerDimensions.w &&
      nextPos.x + BALL_WIDTH > playerPos.value.x &&
      nextPos.y < playerPos.value.y + playerDimensions.h &&
      BALL_WIDTH + nextPos.y > playerPos.value.y
    );
  };

  const getNextPos = (direction: { x: number; y: number }) => ({
    x: targetPositionX.value + direction.x * SPEED,
    y: targetPositionY.value + direction.y * SPEED,
  });

  const moveTargetToNextPos = (direction: { x: number; y: number }) => {
    const nextPos = getNextPos(direction);
    targetPositionX.value = withTiming(nextPos.x, {
      duration: DELTA,
      easing: Easing.linear,
    });
    targetPositionY.value = withTiming(nextPos.y, {
      duration: DELTA,
      easing: Easing.linear,
    });
  };

  const emojiAnimatedStyles = useAnimatedStyle(() => ({
    top: targetPositionY.value,
    left: targetPositionX.value,
  }));

  const playerAnimatedStyles = useAnimatedStyle(() => ({
    left: playerPos.value.x,
  }));

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const scaledTranslationX = event.nativeEvent.translationX * PAN_SCALE;
    let newX = playerPos.value.x + scaledTranslationX;
    newX = Math.min(Math.max(newX, 0), width - playerDimensions.w);

    playerPos.value = {
      ...playerPos.value,
      x: newX,
    };
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ alignSelf: "flex-start", marginTop: -20 }}>
          <Link href="/" asChild>
            <Pressable style={styles.homeButton}>
              <AntDesign name="close" size={40} color="#1C1A2F" />
            </Pressable>
          </Link>
        </View>

        <View style={styles.centered}>
          <Text style={styles.score}>{score}</Text>
        </View>

        {!gameOver && (
          <Animated.View style={[styles.emoji, emojiAnimatedStyles]}>
            <Text style={{ fontSize: 56 }}>{selectedEmoji}</Text>
          </Animated.View>
        )}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              {
                top: playerPos.value.y,
                position: "absolute",
                width: playerDimensions.w,
                height: playerDimensions.h,
                borderRadius: 20,
                backgroundColor: "black",
              },
              playerAnimatedStyles,
            ]}
          />
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FECF23",
    alignItems: "center",
    justifyContent: "space-between",
  },
  score: {
    fontFamily: "DMSans_Bold",
    fontSize: 80,
    opacity: 0.3,
  },
  homeButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 24,
  },
  emoji: {
    width: BALL_WIDTH,
    position: "absolute",
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
