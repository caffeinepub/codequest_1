export type Language = "C" | "Python" | "Java";
export type Page =
  | "landing"
  | "onboarding"
  | "languageSelect"
  | "worldMap"
  | "gameplay"
  | "dashboard"
  | "leaderboard";

export interface Player {
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  lastLogin: string;
  completedLevels: { C: number[]; Python: number[]; Java: number[] };
  badges: string[];
  sessionLevels: number;
}

export interface DragDropPuzzle {
  type: "dragdrop";
  task: string;
  hint: string;
  blocks: string[];
  correctOrder: number[];
}

export interface MultiChoiceQuestion {
  type: "multichoice";
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

export interface FixBugChallenge {
  type: "fixbug";
  task: string;
  code: string;
  bugLine: string;
  options: string[];
  correct: number;
  hint: string;
}

export type GameChallenge =
  | DragDropPuzzle
  | MultiChoiceQuestion
  | FixBugChallenge;

export interface BadgeInfo {
  id: string;
  name: string;
  icon: string;
  desc: string;
}
