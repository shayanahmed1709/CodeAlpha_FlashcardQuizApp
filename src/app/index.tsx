import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const initialCards = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is 12 x 12?", answer: "144" },
  {
    id: 3,
    question: 'Who wrote "Romeo and Juliet"?',
    answer: "William Shakespeare",
  },
  {
    id: 4,
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
];

export default function Index() {
  const [cards] = useState(initialCards);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = cards[index];

  function goNext() {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % cards.length);
  }

  function goPrevious() {
    setShowAnswer(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        {index + 1} / {cards.length}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          {showAnswer ? currentCard.answer : currentCard.question}
        </Text>
      </View>

      <Pressable
        style={styles.showButton}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <Text style={styles.showButtonText}>
          {showAnswer ? "Show Question" : "Show Answer"}
        </Text>
      </Pressable>

      <View style={styles.navRow}>
        <Pressable style={styles.navButton} onPress={goPrevious}>
          <Text style={styles.navButtonText}>Previous</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={goNext}>
          <Text style={styles.navButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  counter: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  card: {
    width: "100%",
    minHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
    color: "#222",
  },
  showButton: {
    marginTop: 20,
    backgroundColor: "#4a6cf7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  showButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  navButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
