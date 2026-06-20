import { useState } from "react";

const LANGUAGES = [
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "tr", name: "Turkish" },
];

const RAPIDAPI_KEY = "ff7140a214msh23543d71bac9c26p1cf64ejsn1df9b9dee81d";

export default function TextTranslator() {
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    if (!inputText.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setLoading(true);
    setError("");
    setTranslated("");
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLang}`
      );
      if (!response.ok) throw new Error("Translation failed.");
      const data = await response.json();
      const result = data?.responseData?.translatedText;
      if (!result) throw new Error("No translation found.");
      setTranslated(result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (translated) navigator.clipboard.writeText(translated);
  };

  const selectedLangName = LANGUAGES.find((l) => l.code === targetLang)?.name || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🌐 LinguaFlow</h1>
          <p className="text-indigo-300 text-sm">Translate English text into your favourite language</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-1">English Text</label>
            <textarea
              rows={4}
              placeholder="Enter text in English…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-1">Translate To</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full bg-slate-800 text-white border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={translateText}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl py-3 text-sm transition-all"
          >
            {loading ? "Translating…" : `Translate to ${selectedLangName}`}
          </button>
          {error && (
            <div className="bg-red-500/10 border border-red-400/20 text-red-300 rounded-xl px-4 py-3 text-sm">⚠️ {error}</div>
          )}
          {translated && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative">
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">{selectedLangName} Translation</p>
              <p className="text-white text-base leading-relaxed">{translated}</p>
              <button onClick={handleCopy} className="absolute top-3 right-3 text-xs text-white/40 hover:text-white">📋 Copy</button>
            </div>
          )}
        </div>
        <p className="text-center text-white/20 text-xs mt-4">Powered by MyMemory Translation via RapidAPI</p>
      </div>
    </div>
  );
}
