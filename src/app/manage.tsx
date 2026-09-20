import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const STORAGE_KEY = "flashcards";

type Card = { id: number; question: string; answer: string };

export default function Manage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  // Reload from storage every time this tab comes into focus
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
        if (saved) setCards(JSON.parse(saved));
      });
    }, []),
  );

  async function saveCards(updated: Card[]) {
    setCards(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function startAdd() {
    setEditingId(-1); // -1 means "adding a new card"
    setQuestionInput("");
    setAnswerInput("");
  }

  function startEdit(card: Card) {
    setEditingId(card.id);
    setQuestionInput(card.question);
    setAnswerInput(card.answer);
  }

  function cancelEdit() {
    setEditingId(null);
    setQuestionInput("");
    setAnswerInput("");
  }

  function handleSave() {
    if (!questionInput.trim() || !answerInput.trim()) {
      Alert.alert("Both fields are required");
      return;
    }

    if (editingId === -1) {
      // Adding a new card
      const newCard: Card = {
        id: Date.now(),
        question: questionInput.trim(),
        answer: answerInput.trim(),
      };
      saveCards([...cards, newCard]);
    } else {
      // Editing an existing card
      const updated = cards.map((c) =>
        c.id === editingId
          ? { ...c, question: questionInput.trim(), answer: answerInput.trim() }
          : c,
      );
      saveCards(updated);
    }
    cancelEdit();
  }

  function handleDelete(id: number) {
    Alert.alert("Delete this card?", undefined, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => saveCards(cards.filter((c) => c.id !== id)),
      },
    ]);
  }

  const isEditing = editingId !== null;

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.form}>
          <Text style={styles.formTitle}>
            {editingId === -1 ? "Add Card" : "Edit Card"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Question"
            value={questionInput}
            onChangeText={setQuestionInput}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            value={answerInput}
            onChangeText={setAnswerInput}
          />
          <View style={styles.formButtons}>
            <Pressable style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable style={styles.addButton} onPress={startAdd}>
          <Text style={styles.addButtonText}>+ Add Flashcard</Text>
        </Pressable>
      )}

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No flashcards yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowQuestion}>{item.question}</Text>
              <Text style={styles.rowAnswer}>{item.answer}</Text>
            </View>
            <Pressable
              onPress={() => startEdit(item)}
              style={styles.iconButton}
            >
              <Text>✏️</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDelete(item.id)}
              style={styles.iconButton}
            >
              <Text>🗑️</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  addButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  form: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  formTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  formButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  cancelButton: { paddingVertical: 10, paddingHorizontal: 16 },
  cancelButtonText: { color: "#888" },
  saveButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  rowQuestion: { fontSize: 15, fontWeight: "600", color: "#222" },
  rowAnswer: { fontSize: 13, color: "#888", marginTop: 2 },
  iconButton: { padding: 8 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 30 },
});
