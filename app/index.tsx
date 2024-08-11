import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EmojiPicker, { se, type EmojiType } from "rn-emoji-keyboard";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handlePick = (emojiObject: EmojiType) => {
    setSelectedEmoji(emojiObject.emoji);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select an emoji to start</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={styles.selectedEmoji}>{selectedEmoji}</Text>
        <Pressable onPress={() => setIsOpen(true)}>
          <FontAwesome name="rotate-left" size={30} color="#1C1A2F" />
        </Pressable>
      </View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Link
        href={{
          pathname: "/game",
          // Navigate to the game route with selected emoji */
          params: { selectedEmoji },
        }}
        asChild
      >
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
    fontSize: 24,
    margin: 10,
    marginVertical: 30,
  },
  selectedEmoji: {
    fontSize: 48,
    margin: 4,
  },
  button: {
    backgroundColor: "#0E0C22",
    marginVertical: 24,
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 24,
    shadowRadius: 1,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowOffset: { height: 4, width: 4 },
  },
  buttonText: {
    color: "#eee",
    fontSize: 22,
    fontFamily: "DMSans_Bold",
  },
});
