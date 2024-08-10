import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Game() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Screen</Text>
      <Link href="/" asChild>
        <Pressable style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </Pressable>
      </Link>
      <Link href="/score" asChild>
        <Pressable style={styles.scoreButton}>
          <Text style={styles.scoreButtonText}>See Score</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FECF23",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "DMSans_Regular",
    fontSize: 18,
  },
  homeButton: {
    backgroundColor: "#0E0C22",
    marginVertical: 24,
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  homeButtonText: {
    color: "#eee",
    fontSize: 22,
    fontFamily: "DMSans_Bold",
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
