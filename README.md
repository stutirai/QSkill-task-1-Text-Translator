#  QSkill Task 1 — Text Translator App

> Internship task submission completed as part of the **QSkill Frontend Development Internship**.

A React-based web application that translates English text into a language of your choice, powered by the **RapidAPI** translation service.

---

## 🔗 Live Demo

[Add your deployed link here once hosted — e.g. via Vercel/Netlify]

---

##  Task Description

> Create a text translator application using **React** and **Tailwind CSS** that takes input as a string in English and converts it into your favourite language, implemented using **RapidAPI**.

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Component-based UI and state management |
| **Tailwind CSS** | Utility-first styling for a clean, responsive design |
| **RapidAPI** (MyMemory Translation API) | Fetches real-time translations for the entered text |
| **Vite** | Fast development server and build tool |

---

##  Features

- Type any text in **English**
- Choose a target language from a dropdown — Hindi, Spanish, French, German, Japanese, Chinese, Arabic, Portuguese, Russian, Korean, Italian, Turkish
- Click **Translate** to fetch the translated text via RapidAPI
- **Copy** the translated result with a single click
- Clean, responsive dark-themed UI built with Tailwind CSS
- Error handling for empty input or failed API requests

---

##  How It Works

1. The user types English text into a textarea and selects a target language from a dropdown (`useState` tracks both values).
2. On clicking **Translate**, the app sends a `fetch()` request to the MyMemory Translation API through RapidAPI, passing the input text and language pair as query parameters.
3. The API responds with the translated text, which is stored in state and rendered on screen.
4. If the request fails (e.g. empty input, network error), an error message is shown to the user instead of crashing the app.

```javascript
const response = await fetch(
  `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLang}`
);
const data = await response.json();
const result = data?.responseData?.translatedText;
```

---

## Folder Structure

```
task1-translator/
├── public/                  → static assets served directly (favicon, icons)
├── src/
│   ├── assets/               → images used inside components (react.svg, vite.svg, hero.png)
│   ├── App.jsx                → main component — translator logic and UI
│   ├── App.css                → component-level styles
│   ├── main.jsx                → app entry point, renders App into the DOM
│   └── index.css                → global styles and Tailwind imports
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

---

##  How to Run Locally

Clone the repository and run:

```bash
npm install
npm run dev
```

Then open the app in your browser at:
```
http://localhost:5173
```

---

##  Author

**Stuti Rai**  
Frontend Development Intern — QSkill

- GitHub: [github.com/stutirai](https://github.com/stutirai)


---

## 📌 Note

This project was built as part of an internship task to demonstrate proficiency in React, API integration, and responsive UI design using Tailwind CSS.
