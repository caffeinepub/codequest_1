import { useRef, useState } from "react";
import {
  BADGES,
  LEVEL_NAMES,
  XP_PER_LEVEL,
  checkBadges,
  getChallenge,
} from "./gameData";
import type { GameChallenge, Language, Page, Player } from "./types";

const STORAGE_KEY = "codequest_player";
const AVATARS = [
  "🧙\u200d♂️",
  "🦸\u200d♀️",
  "🤖",
  "🐉",
  "🦊",
  "🐱",
  "👾",
  "🧑\u200d💻",
];
const BADGE_ICONS: Record<string, string> = {
  variable_hero: "📦",
  loop_master: "🔄",
  bug_hunter: "🐛",
  code_warrior: "⚔️",
  python_sage: "🐍",
  c_champion: "⚙️",
  java_jedi: "☕",
  speed_demon: "⚡",
};

const FAKE_PLAYERS = [
  { name: "NeonCoder", avatar: "🤖", xp: 380 },
  { name: "PyroHex", avatar: "🐉", xp: 290 },
  { name: "LoopLord", avatar: "👾", xp: 520 },
  { name: "ByteWitch", avatar: "🧙\u200d♂️", xp: 170 },
  { name: "ArrayArcher", avatar: "🦊", xp: 640 },
  { name: "StackStar", avatar: "🦸\u200d♀️", xp: 95 },
  { name: "RecurseRex", avatar: "🐱", xp: 430 },
  { name: "BugBuster", avatar: "🧑\u200d💻", xp: 715 },
  { name: "VoidViper", avatar: "🐉", xp: 230 },
];

function loadPlayer(): Player | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}
function savePlayer(p: Player) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function getLevelTitle(xp: number) {
  if (xp <= 100) return "Novice";
  if (xp <= 300) return "Apprentice";
  if (xp <= 600) return "Warrior";
  if (xp <= 1000) return "Champion";
  return "Legend";
}

function playSound(type: "correct" | "wrong" | "levelup") {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === "correct") {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    } else if (type === "wrong") {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    } else {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    }
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    /* ignore */
  }
}

function Stars() {
  const stars = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      left: `${(i * 13 + 7) % 100}%`,
      top: `${(i * 17 + 3) % 100}%`,
      delay: `${(i * 0.3) % 3}s`,
      size: `${(i % 3) + 1}px`,
    })),
  );
  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.current.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            width: s.size,
            height: s.size,
          }}
        />
      ))}
    </div>
  );
}

function TopBar({
  player,
  onDash,
  onLeader,
}: { player: Player; onDash: () => void; onLeader: () => void }) {
  return (
    <div className="topbar">
      <span style={{ fontSize: "1.3rem" }}>{player.avatar}</span>
      <span className="pixel-xs" style={{ color: "#8b5cf6" }}>
        {player.name}
      </span>
      <span className="badge-pill gold">⭐ {player.xp} XP</span>
      <span className="badge-pill red">🔥 {player.streak}</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
        <button className="btn btn-sm" onClick={onDash}>
          Dashboard
        </button>
        <button className="btn btn-sm" onClick={onLeader}>
          Leaderboard
        </button>
      </div>
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="page-landing">
      <Stars />
      <div className="landing-content">
        <h1 className="pixel-title neon-purple">
          CODE
          <br />
          QUEST
        </h1>
        <p
          style={{
            color: "#a5b4fc",
            letterSpacing: "0.1em",
            fontSize: "1.1rem",
          }}
        >
          Learn to Code. Save the World.
        </p>
        <img
          src="/assets/generated/hero-mascot-transparent.dim_300x300.png"
          alt="Hero Mascot"
          className="mascot-float"
        />
        <button className="btn btn-xl neon-btn" onClick={onStart}>
          ▶ START ADVENTURE
        </button>
        <div className="features-row">
          {[
            ["🎮", "No Typing", "Pure gameplay"],
            ["🏆", "Level Up", "20 levels each"],
            ["🏅", "Earn Badges", "8 unique badges"],
          ].map(([icon, title, sub]) => (
            <div key={title} className="feature-card">
              <div style={{ fontSize: "1.8rem" }}>{icon}</div>
              <div style={{ fontWeight: 600 }}>{title}</div>
              <small style={{ color: "#94a3b8" }}>{sub}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingPage({ onComplete }: { onComplete: (p: Player) => void }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  return (
    <div className="page-center">
      <Stars />
      <div
        className="card"
        style={{
          width: "min(480px,95vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <h2 className="pixel-sm neon-cyan">CHOOSE YOUR HERO</h2>
        <input
          className="game-input"
          placeholder="Enter your hero name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          {AVATARS.map((a) => (
            <button
              key={a}
              className={`avatar-btn ${avatar === a ? "selected" : ""}`}
              onClick={() => setAvatar(a)}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          className="btn btn-xl neon-btn"
          disabled={!name.trim()}
          onClick={() => {
            const p: Player = {
              name: name.trim(),
              avatar,
              xp: 0,
              streak: 1,
              lastLogin: new Date().toISOString().split("T")[0],
              completedLevels: { C: [], Python: [], Java: [] },
              badges: [],
              sessionLevels: 0,
            };
            savePlayer(p);
            onComplete(p);
          }}
        >
          BEGIN QUEST ⚔️
        </button>
      </div>
    </div>
  );
}

function LanguageSelectPage({
  player,
  onSelect,
  onDash,
  onLeader,
}: {
  player: Player;
  onSelect: (l: Language) => void;
  onDash: () => void;
  onLeader: () => void;
}) {
  const langs: { lang: Language; icon: string; color: string }[] = [
    { lang: "C", icon: "⚙️", color: "#06b6d4" },
    { lang: "Python", icon: "🐍", color: "#10b981" },
    { lang: "Java", icon: "☕", color: "#fbbf24" },
  ];
  return (
    <div className="page">
      <Stars />
      <TopBar player={player} onDash={onDash} onLeader={onLeader} />
      <div className="page-inner">
        <h2 className="pixel-sm neon-purple" style={{ marginBottom: "2rem" }}>
          CHOOSE LANGUAGE
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1.5rem",
          }}
        >
          {langs.map(({ lang, icon, color }) => {
            const done = player.completedLevels[lang].length;
            return (
              <div
                key={lang}
                className="lang-card"
                style={{ "--glow": color } as React.CSSProperties}
                onClick={() => onSelect(lang)}
              >
                <div style={{ fontSize: "3rem" }}>{icon}</div>
                <div className="pixel-sm" style={{ color }}>
                  {lang}
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(done / 20) * 100}%`,
                      background: color,
                    }}
                  />
                </div>
                <small style={{ color: "#94a3b8" }}>{done}/20 levels</small>
                <button
                  className="btn"
                  style={{
                    marginTop: "0.5rem",
                    borderColor: color,
                    color,
                    background: color + "22",
                  }}
                >
                  PLAY ▶
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MAP_POS = [
  [10, 80],
  [22, 65],
  [33, 75],
  [44, 58],
  [55, 70],
  [66, 55],
  [77, 65],
  [88, 50],
  [90, 38],
  [80, 28],
  [70, 38],
  [60, 25],
  [48, 35],
  [37, 22],
  [26, 33],
  [17, 20],
  [27, 12],
  [40, 18],
  [55, 10],
  [65, 5],
];

function WorldMapPage({
  player,
  lang,
  onPlay,
  onBack,
  onDash,
  onLeader,
}: {
  player: Player;
  lang: Language;
  onPlay: (l: number) => void;
  onBack: () => void;
  onDash: () => void;
  onLeader: () => void;
}) {
  const completed = player.completedLevels[lang];
  const nextLevel = completed.length + 1;
  const langColor =
    lang === "C" ? "#06b6d4" : lang === "Python" ? "#10b981" : "#fbbf24";
  return (
    <div className="page">
      <Stars />
      <TopBar player={player} onDash={onDash} onLeader={onLeader} />
      <div className="page-inner">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button className="btn btn-sm" onClick={onBack}>
            ← Back
          </button>
          <span className="pixel-xs" style={{ color: langColor }}>
            {lang} WORLD MAP
          </span>
        </div>
        <div className="world-map-wrap">
          <img
            src="/assets/generated/world-map-bg.dim_1200x600.jpg"
            alt="World Map"
            className="world-map-img"
          />
          <svg
            className="world-map-svg"
            viewBox="0 0 100 90"
            preserveAspectRatio="xMidYMid meet"
          >
            {MAP_POS.map((pos, i) => {
              if (i === 0) return null;
              const prev = MAP_POS[i - 1];
              const done = completed.includes(i) && completed.includes(i + 1);
              return (
                <line
                  key={i}
                  x1={prev[0]}
                  y1={prev[1]}
                  x2={pos[0]}
                  y2={pos[1]}
                  stroke={done ? "#10b981" : "#44444488"}
                  strokeWidth="0.6"
                />
              );
            })}
            {MAP_POS.map((pos, i) => {
              const level = i + 1;
              const done = completed.includes(level);
              const isCurrent = level === nextLevel;
              const locked = level > nextLevel;
              return (
                <g
                  key={level}
                  onClick={() => !locked && onPlay(level)}
                  style={{ cursor: locked ? "default" : "pointer" }}
                >
                  <circle
                    cx={pos[0]}
                    cy={pos[1]}
                    r="4.2"
                    fill={
                      done ? "#10b981cc" : isCurrent ? "#fbbf24cc" : "#1a1a2ecc"
                    }
                    stroke={done ? "#6ee7b7" : isCurrent ? "#fde68a" : "#555"}
                    strokeWidth="0.7"
                  />
                  <text
                    x={pos[0]}
                    y={pos[1] + 0.9}
                    textAnchor="middle"
                    fontSize="2.8"
                    fill={locked ? "#555" : "#fff"}
                    fontFamily="sans-serif"
                  >
                    {locked ? "🔒" : done ? "✓" : level}
                  </text>
                  {!locked && <title>{LEVEL_NAMES[level]}</title>}
                </g>
              );
            })}
          </svg>
        </div>
        <p
          style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: "0.75rem" }}
        >
          Click a level node to play • 🔒 = locked • ✓ = completed
        </p>
      </div>
    </div>
  );
}

function DragDropGame({
  challenge,
  onResult,
}: {
  challenge: Extract<GameChallenge, { type: "dragdrop" }>;
  onResult: (correct: boolean) => void;
}) {
  const initOrder = useRef(
    challenge.blocks.map((_, i) => i).sort(() => Math.random() - 0.5),
  );
  const [order, setOrder] = useState(initOrder.current);
  const [dragging, setDragging] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [resultShown, setResultShown] = useState(false);

  const isCorrect = () =>
    JSON.stringify(order) === JSON.stringify(challenge.correctOrder);

  const handleCheck = () => {
    if (resultShown) return;
    setSubmitted(true);
    setResultShown(true);
    onResult(isCorrect());
  };

  return (
    <div className="game-area">
      <p className="game-task">{challenge.task}</p>
      <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
        Drag blocks to reorder them:
      </p>
      <div className="drag-zone">
        {order.map((origIdx, i) => (
          <div
            key={i}
            className={`code-block${dragging === i ? " dragging" : ""}`}
            draggable
            onDragStart={() => setDragging(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragging === null || dragging === i) return;
              const next = [...order];
              [next[dragging], next[i]] = [next[i], next[dragging]];
              setOrder(next);
              setDragging(null);
            }}
            onDragEnd={() => setDragging(null)}
          >
            {challenge.blocks[origIdx]}
          </div>
        ))}
      </div>
      {!submitted && (
        <button className="btn neon-btn" onClick={handleCheck}>
          CHECK ORDER ✓
        </button>
      )}
    </div>
  );
}

function MultiChoiceGame({
  challenge,
  onResult,
}: {
  challenge: Extract<GameChallenge, { type: "multichoice" }>;
  onResult: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const handle = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => onResult(i === challenge.correct), 400);
  };
  return (
    <div className="game-area">
      <p className="game-task">{challenge.question}</p>
      <div className="choices-grid">
        {challenge.options.map((opt, i) => (
          <button
            key={i}
            className={`choice-btn${selected === i ? (i === challenge.correct ? " correct" : " wrong") : ""}`}
            onClick={() => handle(i)}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FixBugGame({
  challenge,
  onResult,
}: {
  challenge: Extract<GameChallenge, { type: "fixbug" }>;
  onResult: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const handle = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => onResult(i === challenge.correct), 400);
  };
  return (
    <div className="game-area">
      <p className="game-task">{challenge.task}</p>
      <pre className="code-display">
        {challenge.code}
        <span style={{ color: "#f87171", fontStyle: "italic" }}>
          {" "}
          ← 🐛 BUG HERE
        </span>
      </pre>
      <p
        style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "0.5rem" }}
      >
        Bug: {challenge.bugLine}
      </p>
      <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Choose the fix:</p>
      <div className="choices-grid">
        {challenge.options.map((opt, i) => (
          <button
            key={i}
            className={`choice-btn${selected === i ? (i === challenge.correct ? " correct" : " wrong") : ""}`}
            onClick={() => handle(i)}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function GameplayPage({
  player,
  lang,
  level,
  onComplete,
  onBack,
  onDash,
  onLeader,
  setPlayer,
}: {
  player: Player;
  lang: Language;
  level: number;
  onComplete: (xp: number, newBadges: string[]) => void;
  onBack: () => void;
  onDash: () => void;
  onLeader: () => void;
  setPlayer: (p: Player) => void;
}) {
  const [result, setResult] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [confetti] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      left: `${(i * 5.5 + 2) % 100}%`,
      delay: `${(i * 0.08) % 0.5}s`,
      color: ["#8b5cf6", "#06b6d4", "#fbbf24", "#10b981", "#f87171"][i % 5],
    })),
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const challenge = getChallenge(lang, level);
  const xpReward = XP_PER_LEVEL(level);
  const isAlreadyDone = player.completedLevels[lang].includes(level);

  const handleResult = (correct: boolean) => {
    if (result !== null) return;
    setResult(correct);
    if (correct) {
      playSound("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
      const updatedLevels = {
        ...player.completedLevels,
        [lang]: player.completedLevels[lang].includes(level)
          ? player.completedLevels[lang]
          : [...player.completedLevels[lang], level],
      };
      const sessionLevels = player.sessionLevels + 1;
      const newXP = isAlreadyDone ? player.xp : player.xp + xpReward;
      const tempPlayer = {
        ...player,
        xp: newXP,
        completedLevels: updatedLevels,
        sessionLevels,
      };
      const newBadges = checkBadges(tempPlayer, challenge.type);
      const updatedPlayer = {
        ...tempPlayer,
        badges: [...player.badges, ...newBadges],
      };
      savePlayer(updatedPlayer);
      setPlayer(updatedPlayer);
      if (newBadges.length > 0) playSound("levelup");
      onComplete(xpReward, newBadges);
    } else {
      playSound("wrong");
      setTimeout(() => setShowHint(true), 600);
    }
  };

  return (
    <div className="page">
      <Stars />
      <TopBar player={player} onDash={onDash} onLeader={onLeader} />
      <div className="page-inner">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button className="btn btn-sm" onClick={onBack}>
            ← Map
          </button>
          <span className="pixel-xs" style={{ color: "#8b5cf6" }}>
            Level {level}: {LEVEL_NAMES[level]}
          </span>
          <span className="badge-pill gold">+{xpReward} XP</span>
          {isAlreadyDone && <span className="badge-pill green">✓ DONE</span>}
        </div>

        {showConfetti && (
          <div className="confetti-zone" aria-hidden="true">
            {confetti.map((c, i) => (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  left: c.left,
                  animationDelay: c.delay,
                  background: c.color,
                }}
              />
            ))}
          </div>
        )}

        <div className="card">
          <div className="type-tag">
            {challenge.type === "dragdrop"
              ? "🧩 Drag & Drop"
              : challenge.type === "multichoice"
                ? "🎯 Multiple Choice"
                : "🐛 Fix the Bug"}
          </div>

          {challenge.type === "dragdrop" && (
            <DragDropGame challenge={challenge} onResult={handleResult} />
          )}
          {challenge.type === "multichoice" && (
            <MultiChoiceGame challenge={challenge} onResult={handleResult} />
          )}
          {challenge.type === "fixbug" && (
            <FixBugGame challenge={challenge} onResult={handleResult} />
          )}

          {result === true && (
            <div className="result-box result-correct">
              <div className="pixel-xs" style={{ color: "#6ee7b7" }}>
                🎉 CORRECT! +{xpReward} XP!
              </div>
              <button className="btn neon-btn" onClick={onBack}>
                NEXT LEVEL →
              </button>
            </div>
          )}
          {result === false && (
            <div className="result-box result-wrong">
              <div className="pixel-xs" style={{ color: "#fca5a5" }}>
                ❌ Not quite!
              </div>
              {showHint && (
                <div className="hint-box">💡 Hint: {challenge.hint}</div>
              )}
              <button
                className="btn"
                onClick={() => {
                  setResult(null);
                  setShowHint(false);
                }}
              >
                TRY AGAIN 🔄
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardPage({
  player,
  onContinue,
  onLeader,
  onDash,
}: {
  player: Player;
  onContinue: () => void;
  onLeader: () => void;
  onDash: () => void;
}) {
  const total = Object.values(player.completedLevels).flat().length;
  return (
    <div className="page">
      <Stars />
      <TopBar player={player} onDash={onDash} onLeader={onLeader} />
      <div className="page-inner">
        <h2 className="pixel-sm neon-purple" style={{ marginBottom: "1.5rem" }}>
          HERO DASHBOARD
        </h2>
        <div className="dash-grid">
          <div
            className="card"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div style={{ fontSize: "3rem" }}>{player.avatar}</div>
            <div className="pixel-xs" style={{ color: "#8b5cf6" }}>
              {player.name}
            </div>
            <div
              className="pixel-xs"
              style={{ color: "#fbbf24", fontSize: "0.5rem" }}
            >
              {getLevelTitle(player.xp)}
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                justifyContent: "center",
                fontSize: "0.85rem",
                color: "#94a3b8",
              }}
            >
              <span>⭐ {player.xp} XP</span>
              <span>🔥 {player.streak} streak</span>
              <span>🏆 {total} done</span>
            </div>
          </div>
          <div className="card">
            <div
              className="pixel-xs"
              style={{ color: "#8b5cf6", marginBottom: "1rem" }}
            >
              PROGRESS
            </div>
            {(["C", "Python", "Java"] as Language[]).map((lang) => (
              <div
                key={lang}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ minWidth: "70px" }}>
                  {lang === "C" ? "⚙️" : lang === "Python" ? "🐍" : "☕"} {lang}
                </span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(player.completedLevels[lang].length / 20) * 100}%`,
                      background:
                        lang === "C"
                          ? "#06b6d4"
                          : lang === "Python"
                            ? "#10b981"
                            : "#fbbf24",
                    }}
                  />
                </div>
                <span style={{ color: "#94a3b8", minWidth: "40px" }}>
                  {player.completedLevels[lang].length}/20
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="pixel-xs"
          style={{ color: "#8b5cf6", margin: "1.5rem 0 1rem" }}
        >
          BADGES
        </div>
        <div className="badges-grid">
          {BADGES.map((badge) => {
            const earned = player.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`badge-card${earned ? " earned" : " locked"}`}
              >
                <div style={{ fontSize: "2rem" }}>
                  {BADGE_ICONS[badge.id] || "🏅"}
                </div>
                <div
                  className="pixel-xs"
                  style={{ fontSize: "0.4rem", color: "#fbbf24" }}
                >
                  {badge.name}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#94a3b8",
                    lineHeight: 1.4,
                  }}
                >
                  {badge.desc}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-xl neon-btn"
          style={{ marginTop: "2rem" }}
          onClick={onContinue}
        >
          CONTINUE QUEST ▶
        </button>
      </div>
    </div>
  );
}

function LeaderboardPage({
  player,
  onBack,
}: { player: Player; onBack: () => void }) {
  const all = [
    ...FAKE_PLAYERS,
    { name: player.name, avatar: player.avatar, xp: player.xp },
  ].sort((a, b) => b.xp - a.xp);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div className="page">
      <Stars />
      <div className="page-inner">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <button className="btn btn-sm" onClick={onBack}>
            ← Back
          </button>
          <h2 className="pixel-sm neon-yellow">LEADERBOARD</h2>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {all.map((p, i) => (
            <div
              key={i}
              className={`leader-row${p.name === player.name ? " my-row" : ""}`}
            >
              <span
                className="pixel-xs"
                style={{ minWidth: "45px", fontSize: "0.6rem" }}
              >
                {i < 3 ? medals[i] : `#${i + 1}`}
              </span>
              <span style={{ fontSize: "1.4rem" }}>{p.avatar}</span>
              <span style={{ flex: 1 }}>
                {p.name}{" "}
                {p.name === player.name ? (
                  <span
                    className="badge-pill"
                    style={{
                      background: "#8b5cf622",
                      borderColor: "#8b5cf6",
                      color: "#c4b5fd",
                    }}
                  >
                    YOU
                  </span>
                ) : null}
              </span>
              <span className="badge-pill gold">⭐ {p.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [player, setPlayer] = useState<Player | null>(loadPlayer);
  const [page, setPage] = useState<Page>("landing");
  const [selectedLang, setSelectedLang] = useState<Language>("Python");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [badgePopup, setBadgePopup] = useState<string[]>([]);

  const go = (p: Page) => setPage(p);

  const handleStart = () => {
    if (!player) go("onboarding");
    else go("languageSelect");
  };

  return (
    <div className="app">
      {badgePopup.length > 0 && (
        <div className="badge-popup" onClick={() => setBadgePopup([])}>
          {badgePopup.map((id) => {
            const b = BADGES.find((x) => x.id === id);
            return b ? (
              <div key={id} className="badge-popup-card">
                <div style={{ fontSize: "4rem" }}>
                  {BADGE_ICONS[id] || "🏅"}
                </div>
                <div className="pixel-xs" style={{ fontSize: "0.55rem" }}>
                  NEW BADGE!
                </div>
                <div>{b.name}</div>
              </div>
            ) : null;
          })}
          <small style={{ color: "#94a3b8" }}>Tap to close</small>
        </div>
      )}

      {page === "landing" && <LandingPage onStart={handleStart} />}
      {page === "onboarding" && (
        <OnboardingPage
          onComplete={(p) => {
            setPlayer(p);
            go("languageSelect");
          }}
        />
      )}
      {page === "languageSelect" && player && (
        <LanguageSelectPage
          player={player}
          onSelect={(l) => {
            setSelectedLang(l);
            go("worldMap");
          }}
          onDash={() => go("dashboard")}
          onLeader={() => go("leaderboard")}
        />
      )}
      {page === "worldMap" && player && (
        <WorldMapPage
          player={player}
          lang={selectedLang}
          onPlay={(l) => {
            setSelectedLevel(l);
            go("gameplay");
          }}
          onBack={() => go("languageSelect")}
          onDash={() => go("dashboard")}
          onLeader={() => go("leaderboard")}
        />
      )}
      {page === "gameplay" && player && (
        <GameplayPage
          player={player}
          lang={selectedLang}
          level={selectedLevel}
          onComplete={(_, nb) => {
            if (nb.length > 0) setBadgePopup(nb);
          }}
          onBack={() => go("worldMap")}
          onDash={() => go("dashboard")}
          onLeader={() => go("leaderboard")}
          setPlayer={setPlayer}
        />
      )}
      {page === "dashboard" && player && (
        <DashboardPage
          player={player}
          onContinue={() => go("languageSelect")}
          onLeader={() => go("leaderboard")}
          onDash={() => go("dashboard")}
        />
      )}
      {page === "leaderboard" && player && (
        <LeaderboardPage player={player} onBack={() => go("dashboard")} />
      )}
    </div>
  );
}
