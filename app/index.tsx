import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
      <Link href="/game" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start the game</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#28D964",
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
