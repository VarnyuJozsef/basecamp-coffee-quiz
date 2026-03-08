"use client";

import { useState } from "react";

type PersonalityKey = "explorer" | "classic" | "zen" | "owl";

interface Personality {
  key: PersonalityKey;
  name: string;
  emoji: string;
  description: string;
  coffeeRec: string;
  color: string;
}

interface Answer {
  text: string;
  personality: PersonalityKey;
}

interface Question {
  text: string;
  answers: Answer[];
}

const personalities: Record<PersonalityKey, Personality> = {
  explorer: {
    key: "explorer",
    name: "Bátor Felfedező",
    emoji: "🗺️",
    description:
      "Szereted a kávézás kalandos oldalát. Az új ízek, szezonális különlegességek és egyedi pörkölések vonzanak. A Basecamp barista mindig talál valami izgalmasat a számodra.",
    coffeeRec: "Single origin pour-over, szezonális különlegességek",
    color: "#e67e22",
  },
  classic: {
    key: "classic",
    name: "Otthonos Klasszikus",
    emoji: "🏡",
    description:
      "A kávézás számodra megbízható rituálé. A jó cappuccino vagy latte mint egy meleg ölelés – ismerős, megbízható és tökéletes.",
    coffeeRec: "Cappuccino, klasszikus latte, flat white",
    color: "#8e6b3e",
  },
  zen: {
    key: "zen",
    name: "Zen Minimalista",
    emoji: "🍃",
    description:
      "Kevesebb több. A tiszta, kompromisszummentes ízek híveid. Egy tökéletesen elkészített espresso vagy americano az összes kávéfilozófiádat megtestesíti.",
    coffeeRec: "Espresso, americano, fekete filter kávé",
    color: "#5d7a52",
  },
  owl: {
    key: "owl",
    name: "Éjjeli Bagoly",
    emoji: "🦉",
    description:
      "Mások alszanak, te alkotsz. Az erős kávé a legjobb éjszakai társad – a cold brew vagy dupla espresso pontosan azt adja, amire szükséged van.",
    coffeeRec: "Cold brew, dupla espresso, nitro coffee",
    color: "#4a3f6b",
  },
};

const questions: Question[] = [
  {
    text: "Hogyan kezded a tökéletes reggeledet?",
    answers: [
      { text: "Új kávézót fedezek fel a városban", personality: "explorer" },
      { text: "Otthon, a megszokott bögrémből", personality: "classic" },
      { text: "Csendben, egyszerű rituáléként", personality: "zen" },
      { text: "Reggel? Én még éjjel vagyok ébren…", personality: "owl" },
    ],
  },
  {
    text: "Mi a kávézóban az első dolgod?",
    answers: [
      { text: "Megnézem, mi az újdonság vagy a napi ajánlat", personality: "explorer" },
      { text: "A megszokott kedvencemet rendelem", personality: "classic" },
      { text: "Angol teát kérek, cukor nélkül", personality: "zen" },
      { text: "Dupla espressót – azonnal", personality: "owl" },
    ],
  },
  {
    text: "Melyik kávézói légkör vonz a legjobban?",
    answers: [
      { text: "Izgalmas, teli különleges itallappal", personality: "explorer" },
      { text: "Meleg, ismerős hangulatú törzshely", personality: "classic" },
      { text: "Csendes sarok, minimál dekor", personality: "zen" },
      { text: "Éjjel is nyitva tartó, élénk hely", personality: "owl" },
    ],
  },
  {
    text: "A kávé számodra leginkább...",
    answers: [
      { text: "Felfedezés és ízélmény", personality: "explorer" },
      { text: "Megbízható napi rituálé", personality: "classic" },
      { text: "Egyszerű, tiszta élvezet", personality: "zen" },
      { text: "Nélkülözhetetlen üzemanyag", personality: "owl" },
    ],
  },
  {
    text: "Mikor iszod a legtöbb kávét?",
    answers: [
      { text: "Bármikor, ha kaland vár", personality: "explorer" },
      { text: "Reggel, pontosan ugyanakkor", personality: "classic" },
      { text: "Délben, egy tudatos szünetben", personality: "zen" },
      { text: "Este és éjjel", personality: "owl" },
    ],
  },
  {
    text: "Mi az, amitől egy kávézó igazán különleges?",
    answers: [
      { text: "Egyedi, máshol nem kapható italok", personality: "explorer" },
      { text: "Hogy mindenki ismer és tudják, mit kérek", personality: "classic" },
      { text: "A csend és a letisztult tér", personality: "zen" },
      { text: "Hogy éjjel is nyitva van", personality: "owl" },
    ],
  },
];

type Scores = Record<PersonalityKey, number>;

export default function Home() {
  const [screen, setScreen] = useState<"welcome" | "quiz" | "result">("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({ explorer: 0, classic: 0, zen: 0, owl: 0 });

  const handleAnswer = (personality: PersonalityKey) => {
    const newScores = { ...scores, [personality]: scores[personality] + 1 };
    setScores(newScores);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("result");
    }
  };

  const handleRestart = () => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setScores({ explorer: 0, classic: 0, zen: 0, owl: 0 });
  };

  const getTopPersonality = (): PersonalityKey =>
    (Object.keys(scores) as PersonalityKey[]).reduce((a, b) =>
      scores[a] >= scores[b] ? a : b
    );

  const getPercentages = (): Record<PersonalityKey, number> => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    if (total === 0) return { explorer: 25, classic: 25, zen: 25, owl: 25 };
    return {
      explorer: Math.round((scores.explorer / total) * 100),
      classic: Math.round((scores.classic / total) * 100),
      zen: Math.round((scores.zen / total) * 100),
      owl: Math.round((scores.owl / total) * 100),
    };
  };

  // --- Welcome screen ---
  if (screen === "welcome") {
    return (
      <div style={{ background: "#f5ede3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#fff8f2", border: "1px solid #ecddd0", borderRadius: "16px", padding: "48px 40px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(196,125,78,0.08)" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>☕</div>
          <p style={{ color: "#c47d4e", fontWeight: 600, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase", marginBottom: "8px" }}>
            Basecamp Coffee
          </p>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "28px", fontWeight: 700, color: "#3d2b1f", marginBottom: "16px", lineHeight: 1.3 }}>
            Mi a kávé<br />személyiséged?
          </h1>
          <p style={{ color: "#7a5c47", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
            6 kérdés, és megtaláljuk a számodra tökéletes italt – a baristáink segítségével.
          </p>
          <button
            onClick={() => setScreen("quiz")}
            style={{ background: "#c47d4e", color: "#fff", border: "none", borderRadius: "8px", padding: "14px 32px", fontSize: "16px", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            Kvíz indítása →
          </button>
        </div>
      </div>
    );
  }

  // --- Quiz screen ---
  if (screen === "quiz") {
    const q = questions[currentQuestion];
    const progress = (currentQuestion / questions.length) * 100;
    return (
      <div style={{ background: "#f5ede3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#fff8f2", border: "1px solid #ecddd0", borderRadius: "16px", padding: "40px 36px", maxWidth: "520px", width: "100%", boxShadow: "0 4px 24px rgba(196,125,78,0.08)" }}>

          {/* Progress bar */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#a07855" }}>
                {currentQuestion + 1} / {questions.length} kérdés
              </span>
            </div>
            <div style={{ background: "#ecddd0", borderRadius: "4px", height: "6px" }}>
              <div style={{ background: "#c47d4e", height: "6px", borderRadius: "4px", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
          </div>

          {/* Question */}
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: "22px", fontWeight: 700, color: "#3d2b1f", marginBottom: "24px", lineHeight: 1.4 }}>
            {q.text}
          </h2>

          {/* Answer buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {q.answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(answer.personality)}
                style={{ background: "#fff", border: "1.5px solid #ecddd0", borderRadius: "8px", padding: "14px 18px", textAlign: "left", fontSize: "15px", color: "#3d2b1f", cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#c47d4e";
                  el.style.background = "#fdf4ee";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#ecddd0";
                  el.style.background = "#fff";
                }}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Result screen ---
  const top = getTopPersonality();
  const topPersonality = personalities[top];
  const percentages = getPercentages();
  const sortedPersonalities = (Object.keys(personalities) as PersonalityKey[]).sort(
    (a, b) => percentages[b] - percentages[a]
  );

  return (
    <div style={{ background: "#f5ede3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff8f2", border: "1px solid #ecddd0", borderRadius: "16px", padding: "40px 36px", maxWidth: "520px", width: "100%", boxShadow: "0 4px 24px rgba(196,125,78,0.08)" }}>

        <p style={{ color: "#c47d4e", fontWeight: 600, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase", marginBottom: "8px", textAlign: "center" }}>
          A te kávé személyiséged
        </p>

        {/* Top personality */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "56px", marginBottom: "8px" }}>{topPersonality.emoji}</div>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: "26px", fontWeight: 700, color: "#3d2b1f", marginBottom: "12px" }}>
            {topPersonality.name}
          </h2>
          <p style={{ color: "#7a5c47", fontSize: "15px", lineHeight: 1.6 }}>
            {topPersonality.description}
          </p>
        </div>

        {/* Coffee recommendation */}
        <div style={{ background: "#f5ede3", borderRadius: "8px", padding: "14px 16px", marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", color: "#a07855", fontWeight: 600, marginBottom: "4px" }}>BARISTA AJÁNLÁSUNK</p>
          <p style={{ fontSize: "15px", color: "#3d2b1f", fontWeight: 500 }}>{topPersonality.coffeeRec}</p>
        </div>

        {/* All personality percentages */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "13px", color: "#a07855", fontWeight: 600, marginBottom: "12px" }}>A TE KÁVÉPROFILED</p>
          {sortedPersonalities.map((key) => {
            const p = personalities[key];
            const pct = percentages[key];
            return (
              <div key={key} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px", color: "#3d2b1f" }}>{p.emoji} {p.name}</span>
                  <span style={{ fontSize: "14px", color: "#a07855", fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ background: "#ecddd0", borderRadius: "4px", height: "6px" }}>
                  <div style={{ background: p.color, height: "6px", borderRadius: "4px", width: `${pct}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          style={{ background: "transparent", color: "#c47d4e", border: "1.5px solid #c47d4e", borderRadius: "8px", padding: "12px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer", width: "100%" }}
        >
          Kvíz újraindítása
        </button>
      </div>
    </div>
  );
}
