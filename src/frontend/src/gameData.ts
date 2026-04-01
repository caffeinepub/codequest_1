import type { BadgeInfo, GameChallenge, Language } from "./types";

export const LEVEL_NAMES = [
  "",
  "Variables",
  "Data Types",
  "Operators",
  "Conditions",
  "Loops",
  "Functions",
  "Arrays",
  "Strings",
  "Pointers/Refs",
  "Objects",
  "Recursion",
  "File I/O",
  "Error Handling",
  "Sorting",
  "Searching",
  "Data Structures",
  "Algorithms",
  "Design Patterns",
  "Optimization",
  "BOSS FIGHT",
];

export const XP_PER_LEVEL = (level: number) => (level === 20 ? 50 : 10);

export const BADGES: BadgeInfo[] = [
  {
    id: "variable_hero",
    name: "Variable Hero",
    icon: "U+1F4E6",
    desc: "Complete Level 1 in any language",
  },
  {
    id: "loop_master",
    name: "Loop Master",
    icon: "U+1F504",
    desc: "Complete Level 5 in any language",
  },
  {
    id: "bug_hunter",
    name: "Bug Hunter",
    icon: "U+1F41B",
    desc: "Win a Fix-the-Bug challenge",
  },
  {
    id: "code_warrior",
    name: "Code Warrior",
    icon: "U+2694",
    desc: "Complete 10 levels total",
  },
  {
    id: "python_sage",
    name: "Python Sage",
    icon: "U+1F40D",
    desc: "Complete all 20 Python levels",
  },
  {
    id: "c_champion",
    name: "C Champion",
    icon: "U+2699",
    desc: "Complete all 20 C levels",
  },
  {
    id: "java_jedi",
    name: "Java Jedi",
    icon: "U+2615",
    desc: "Complete all 20 Java levels",
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    icon: "U+26A1",
    desc: "Complete 3 levels in one session",
  },
];

const DD_C: GameChallenge[] = [
  {
    type: "dragdrop",
    task: "Help CodeBot store his power level! Arrange the blocks to declare a variable:",
    hint: "In C: type name = value;",
    blocks: ["= 100", "int", "power", ";"],
    correctOrder: [1, 2, 0, 3],
  },
  {
    type: "dragdrop",
    task: "Unlock the castle! Arrange the loop to count from 1 to 5:",
    hint: "for loop: for(init; condition; increment) { body }",
    blocks: ["for", "(i=1; i<=5; i++)", "{", 'printf("%d",i);', "}"],
    correctOrder: [0, 1, 2, 3, 4],
  },
  {
    type: "dragdrop",
    task: "Summon a function to add two numbers!",
    hint: "returnType name(params) { return value; }",
    blocks: ["int", "add(int a, int b)", "{", "return a+b;", "}"],
    correctOrder: [0, 1, 2, 3, 4],
  },
];
const DD_PY: GameChallenge[] = [
  {
    type: "dragdrop",
    task: "The wizard needs to store magic points! Arrange the blocks:",
    hint: "In Python: name = value (no type needed!)",
    blocks: ["magic_points", "=", "42"],
    correctOrder: [0, 1, 2],
  },
  {
    type: "dragdrop",
    task: "Make the dragon count! Arrange the loop:",
    hint: "Python: for variable in range(n): then indented body",
    blocks: ["for", "i in range(5):", "    print(i)"],
    correctOrder: [0, 1, 2],
  },
  {
    type: "dragdrop",
    task: "Create a function to defeat enemies!",
    hint: "Python functions start with def, then name(params):",
    blocks: ["def", "attack(enemy):", "    return enemy - 10"],
    correctOrder: [0, 1, 2],
  },
];
const DD_JAVA: GameChallenge[] = [
  {
    type: "dragdrop",
    task: "JavaBot needs health points! Arrange the declaration:",
    hint: "Java: type name = value;",
    blocks: ["int", "health", "= 100", ";"],
    correctOrder: [0, 1, 2, 3],
  },
  {
    type: "dragdrop",
    task: "Storm the castle with a loop!",
    hint: "Java: for(init; condition; update) { body }",
    blocks: ["for", "(int i=0; i<5; i++)", "{", "System.out.println(i);", "}"],
    correctOrder: [0, 1, 2, 3, 4],
  },
  {
    type: "dragdrop",
    task: "Forge a method to multiply damage!",
    hint: "Java method: returnType name(params) { return value; }",
    blocks: ["int", "multiply(int a, int b)", "{", "return a * b;", "}"],
    correctOrder: [0, 1, 2, 3, 4],
  },
];

const MC_C: GameChallenge[] = [
  {
    type: "multichoice",
    question:
      "CodeBot needs to pick a path! Which C keyword checks a condition?",
    options: ["when", "if", "check", "cond"],
    correct: 1,
    hint: "It is also used in most other languages!",
  },
  {
    type: "multichoice",
    question: "What does printf() do in C?",
    options: [
      "Reads input",
      "Prints output",
      "Declares a variable",
      "Creates a loop",
    ],
    correct: 1,
    hint: "print... f... format?",
  },
  {
    type: "multichoice",
    question: "Which symbol ends a statement in C?",
    options: [".", ":", ";", "!"],
    correct: 2,
    hint: "It looks like a colon with a dot at the bottom",
  },
  {
    type: "multichoice",
    question: "What is the correct data type for a decimal number in C?",
    options: ["int", "char", "float", "bool"],
    correct: 2,
    hint: "It floats between integer and decimal",
  },
  {
    type: "multichoice",
    question: "How do you start the main function in C?",
    options: ["void start()", "main()", "int main()", "begin main"],
    correct: 2,
    hint: "It returns an integer and is named main",
  },
];
const MC_PY: GameChallenge[] = [
  {
    type: "multichoice",
    question: "Which Python keyword starts a conditional?",
    options: ["when", "if", "check", "cond"],
    correct: 1,
    hint: "Same as most languages!",
  },
  {
    type: "multichoice",
    question: "How do you print in Python?",
    options: ["echo()", "printf()", "print()", "console.log()"],
    correct: 2,
    hint: "It is literally called print",
  },
  {
    type: "multichoice",
    question: "What does range(5) produce?",
    options: ["1,2,3,4,5", "0,1,2,3,4", "0,1,2,3,4,5", "1,2,3,4"],
    correct: 1,
    hint: "Python starts counting at 0!",
  },
  {
    type: "multichoice",
    question: "Which symbol starts a comment in Python?",
    options: ["//", "#", "--", "/*"],
    correct: 1,
    hint: "It is a hash symbol like on social media!",
  },
  {
    type: "multichoice",
    question: "What keyword defines a function in Python?",
    options: ["function", "func", "def", "define"],
    correct: 2,
    hint: "Short for definition",
  },
];
const MC_JAVA: GameChallenge[] = [
  {
    type: "multichoice",
    question: "Which keyword is used for conditions in Java?",
    options: ["when", "if", "check", "whether"],
    correct: 1,
    hint: "Same as C and Python!",
  },
  {
    type: "multichoice",
    question: "How do you print in Java?",
    options: ["print()", "echo()", "System.out.println()", "console.log()"],
    correct: 2,
    hint: "Java likes to be specific about where things come from",
  },
  {
    type: "multichoice",
    question: "What keyword creates a class in Java?",
    options: ["struct", "object", "class", "type"],
    correct: 2,
    hint: "Everything in Java is a ___!",
  },
  {
    type: "multichoice",
    question: "Which access modifier makes something visible everywhere?",
    options: ["private", "protected", "public", "global"],
    correct: 2,
    hint: "It is the opposite of private",
  },
  {
    type: "multichoice",
    question: "What is the correct way to declare a String in Java?",
    options: ["string name", "String name", "str name", "TEXT name"],
    correct: 1,
    hint: "Java String starts with a capital letter!",
  },
];

const FB_C: GameChallenge[] = [
  {
    type: "fixbug",
    task: "A bug is breaking the loop! Find and fix it:",
    code: 'for(int i=0; i<5; i++\n    printf("%d", i);',
    bugLine: "Missing ) after i++",
    options: ["Add ) after i++", "Remove the semicolon", "Change < to <="],
    correct: 0,
    hint: "Count the parentheses in the for statement",
  },
  {
    type: "fixbug",
    task: "The castle gate function is broken! Fix it:",
    code: 'int greet() {\n    printf("Hello")\n}',
    bugLine: "Missing ; after printf()",
    options: [
      'Add ; after printf("Hello")',
      "Change int to void",
      "Remove the {}",
    ],
    correct: 0,
    hint: "Every statement in C needs to end with something...",
  },
  {
    type: "fixbug",
    task: "The condition is broken! Fix the if statement:",
    code: 'if x > 10 {\n    printf("Big!");\n}',
    bugLine: "Missing () around condition",
    options: ["Wrap x > 10 in ()", "Remove the {", "Add ; after if"],
    correct: 0,
    hint: "C needs parentheses around if conditions",
  },
];
const FB_PY: GameChallenge[] = [
  {
    type: "fixbug",
    task: "The Python loop has a bug! Fix it:",
    code: "for i in range(5)\n    print(i)",
    bugLine: "Missing : after range(5)",
    options: ["Add : after range(5)", "Remove range()", "Add ; at the end"],
    correct: 0,
    hint: "Python blocks start with a colon :",
  },
  {
    type: "fixbug",
    task: "The function spell is broken! Fix it:",
    code: "def cast_spell(power)\n    return power * 2",
    bugLine: "Missing : after function definition",
    options: [
      "Add : after cast_spell(power)",
      "Add {} around the body",
      "Remove def keyword",
    ],
    correct: 0,
    hint: "def function_name(params) needs something at the end",
  },
  {
    type: "fixbug",
    task: "The comparison is wrong! Fix the condition:",
    code: 'if health = 0:\n    print("Game Over")',
    bugLine: "Using = instead of == for comparison",
    options: ["Change = to ==", "Add () around condition", "Remove the colon"],
    correct: 0,
    hint: "Single = assigns, double == compares!",
  },
];
const FB_JAVA: GameChallenge[] = [
  {
    type: "fixbug",
    task: "JavaBot is stuck! Fix the print statement:",
    code: 'System.out.println("Hello")',
    bugLine: "Missing ; at end",
    options: [
      "Add ; at the end",
      "Change println to print",
      "Remove the quotes",
    ],
    correct: 0,
    hint: "Every Java statement ends with ;",
  },
  {
    type: "fixbug",
    task: "The class is broken! Fix the declaration:",
    code: "class Hero\n    int power = 100;\n}",
    bugLine: "Missing { after class name",
    options: ["Add { after Hero", "Remove the ;", "Change class to Class"],
    correct: 0,
    hint: "Class bodies are wrapped in curly braces {}",
  },
  {
    type: "fixbug",
    task: "The loop condition is wrong! Fix it:",
    code: "for(int i=0, i<5, i++) {\n    System.out.println(i);\n}",
    bugLine: "Using , instead of ; as separator",
    options: [
      "Replace , with ; in for()",
      "Add () around i<5",
      "Remove int keyword",
    ],
    correct: 0,
    hint: "Java for loops use semicolons as separators, not commas!",
  },
];

const ALL: Record<
  Language,
  { dd: GameChallenge[]; mc: GameChallenge[]; fb: GameChallenge[] }
> = {
  C: { dd: DD_C, mc: MC_C, fb: FB_C },
  Python: { dd: DD_PY, mc: MC_PY, fb: FB_PY },
  Java: { dd: DD_JAVA, mc: MC_JAVA, fb: FB_JAVA },
};

export function getChallenge(lang: Language, level: number): GameChallenge {
  const data = ALL[lang];
  const idx = Math.floor((level - 1) / 3) % 3;
  const type = level % 3;
  if (type === 1) return data.dd[idx % data.dd.length];
  if (type === 2) return data.mc[idx % data.mc.length];
  return data.fb[idx % data.fb.length];
}

export function checkBadges(
  player: {
    xp: number;
    completedLevels: Record<string, number[]>;
    badges: string[];
    sessionLevels: number;
  },
  gameType?: string,
): string[] {
  const newBadges: string[] = [];
  const total = Object.values(player.completedLevels).flat().length;
  const has = (id: string) => player.badges.includes(id);
  const check = (id: string, cond: boolean) => {
    if (cond && !has(id)) newBadges.push(id);
  };
  check(
    "variable_hero",
    ["C", "Python", "Java"].some((l) => player.completedLevels[l]?.includes(1)),
  );
  check(
    "loop_master",
    ["C", "Python", "Java"].some((l) => player.completedLevels[l]?.includes(5)),
  );
  check("bug_hunter", gameType === "fixbug");
  check("code_warrior", total >= 10);
  check("python_sage", (player.completedLevels["Python"]?.length ?? 0) >= 20);
  check("c_champion", (player.completedLevels["C"]?.length ?? 0) >= 20);
  check("java_jedi", (player.completedLevels["Java"]?.length ?? 0) >= 20);
  check("speed_demon", player.sessionLevels >= 3);
  return newBadges;
}
