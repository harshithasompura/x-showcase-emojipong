import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export default function Game() {
  const params = useLocalSearchParams();
  const { selectedEmoji } = params;
  const [score, setScore] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "flex-start", marginTop: -20 }}>
        <Link href="/" asChild>
          <Pressable style={styles.homeButton}>
            <AntDesign name="close" size={40} color="#1C1A2F" />
          </Pressable>
        </Link>
      </View>
      <Text style={styles.score}>{score}</Text>
      <Text style={{ fontSize: 56 }}>{selectedEmoji}</Text>
      <Link href="/score" asChild>
        <Pressable style={styles.scoreButton}>
          <Text style={styles.scoreButtonText}>See Score</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
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
    marginTop: 88,
  },
  homeButton: {
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  scoreButton: {
    backgroundColor: "#FE6E47",
    marginVertical: 4,
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  scoreButtonText: {
    fontSize: 22,
    fontFamily: "DMSans_Bold",
  },
});
