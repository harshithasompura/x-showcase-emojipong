import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function Score() {
  const params = useLocalSearchParams();
  const { score, selectedEmoji } = params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score Screen</Text>
      <Text style={styles.text}>{score} hits</Text>
      <Text style={styles.text}>{selectedEmoji}</Text>
      <Link href="/" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#45B0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "DMSans_Regular",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#0E0C22",
    marginVertical: 24,
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  buttonText: {
    color: "#eee",
    fontSize: 22,
    fontFamily: "DMSans_Bold",
  },
});
