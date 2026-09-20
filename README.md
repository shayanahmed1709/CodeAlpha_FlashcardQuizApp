# CodeAlpha_FlashcardQuizApp

A flashcard quiz app built for studying, developed as part of the **CodeAlpha App Development Internship** (Task 1).

## 📱 Features

- View flashcards one at a time with a **Show Answer** button that flips between question and answer
- Navigate between cards using **Next** and **Previous** buttons
- **Add, edit, and delete** flashcards from a dedicated Manage screen
- All flashcards persist locally on the device using AsyncStorage — your cards are still there when you reopen the app
- Simple, clean UI focused on easy studying

## 🛠️ Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **Expo Router** for file-based navigation between the Home and Manage tabs
- **AsyncStorage** (`@react-native-async-storage/async-storage`) for local data persistence

## 📂 Project Structure

```
src/
  app/
    index.tsx     → Home screen (study/flip through flashcards)
    manage.tsx    → Manage screen (add, edit, delete flashcards)
    _layout.tsx   → Root layout and theming
  components/
    app-tabs.tsx  → Bottom tab navigation (Home / Manage)
```

## ▶️ How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/shayanahmed1709/CodeAlpha_FlashcardQuizApp.git
   cd CodeAlpha_FlashcardQuizApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Scan the QR code with the **Expo Go** app (Android/iOS) to run it on your phone, or press `a` for an Android emulator / `i` for an iOS simulator.

## 📸 Screenshots

*(Add screenshots of the Home screen and Manage screen here)*

## 🎓 About

This project was built as part of the App Development track of the [CodeAlpha](https://www.codealpha.tech) internship program.

---
**Author:** Shayan Ahmed
