// ============================================
// LETTERS DATA — Easy to edit!
// Update letter titles and content below.
// Unlock dates are based on IST timezone.
// ============================================

export interface Letter {
  id: number;
  title: string;
  content: string;
  unlockDate: string; // ISO date string (YYYY-MM-DD), evaluated in IST
}

export const letters: Letter[] = [
  {
    id: 1,
    title: "Letter 1",
    content: "Dear Aditi,\n\nThis is where your first letter goes. Write something heartfelt and beautiful here. This placeholder text is meant to be replaced with your personal message.\n\nWith love ❤️",
    unlockDate: "2026-03-10",
  },
  {
    id: 2,
    title: "Letter 2",
    content: "Dear Aditi,\n\nHere's your second letter. Fill this with memories, wishes, or anything that makes her smile.\n\nWith love ❤️",
    unlockDate: "2026-03-11",
  },
  {
    id: 3,
    title: "Letter 3",
    content: "Dear Aditi,\n\nLetter number three! Another day, another reason to celebrate you.\n\nWith love ❤️",
    unlockDate: "2026-03-12",
  },
  {
    id: 4,
    title: "Letter 4",
    content: "Dear Aditi,\n\nFour days of surprises! This one is extra special.\n\nWith love ❤️",
    unlockDate: "2026-03-13",
  },
  {
    id: 5,
    title: "Letter 5",
    content: "Dear Aditi,\n\nHalfway through the first batch! You're amazing and here's why...\n\nWith love ❤️",
    unlockDate: "2026-03-14",
  },
  {
    id: 6,
    title: "Letter 6",
    content: "Dear Aditi,\n\nSix wonderful things about you that the world should know.\n\nWith love ❤️",
    unlockDate: "2026-03-15",
  },
  {
    id: 7,
    title: "Letter 7",
    content: "Dear Aditi,\n\nA week of letters! This one is about our favorite memories together.\n\nWith love ❤️",
    unlockDate: "2026-03-16",
  },
  {
    id: 8,
    title: "Letter 8",
    content: "Dear Aditi,\n\nEight is great! Here's a letter about all the things that make you unique.\n\nWith love ❤️",
    unlockDate: "2026-03-17",
  },
  {
    id: 9,
    title: "Letter 9",
    content: "Dear Aditi,\n\nAlmost there! This letter is about dreams and wishes for your future.\n\nWith love ❤️",
    unlockDate: "2026-03-18",
  },
  {
    id: 10,
    title: "Letter 10",
    content: "Dear Aditi,\n\nThe last daily letter before the big day! Get ready for something special tomorrow.\n\nWith love ❤️",
    unlockDate: "2026-03-19",
  },
  {
    id: 11,
    title: "Birthday Letter 1 🎂",
    content: "Dear Aditi,\n\nHAPPY BIRTHDAY! 🎉 This is the first of five special birthday letters. Today is all about you!\n\nWith love ❤️",
    unlockDate: "2026-03-20",
  },
  {
    id: 12,
    title: "Birthday Letter 2 🎂",
    content: "Dear Aditi,\n\nBirthday letter number two! Here are all the reasons why the world is brighter with you in it.\n\nWith love ❤️",
    unlockDate: "2026-03-20",
  },
  {
    id: 13,
    title: "Birthday Letter 3 🎂",
    content: "Dear Aditi,\n\nThird birthday letter! A collection of our most treasured moments.\n\nWith love ❤️",
    unlockDate: "2026-03-20",
  },
  {
    id: 14,
    title: "Birthday Letter 4 🎂",
    content: "Dear Aditi,\n\nFourth birthday surprise! Promises and wishes for the year ahead.\n\nWith love ❤️",
    unlockDate: "2026-03-20",
  },
  {
    id: 15,
    title: "Birthday Letter 5 🎂",
    content: "Dear Aditi,\n\nThe final letter! A grand finale of love, laughter, and everything beautiful. Happy Birthday, Aditi! 🎂✨\n\nForever yours ❤️",
    unlockDate: "2026-03-20",
  },
];

// Helper: Get current date in IST
export function getCurrentIST(): Date {
  const now = new Date();
  // IST is UTC+5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + istOffset);
}

// Check if a letter is unlocked based on IST
export function isLetterUnlocked(letter: Letter): boolean {
  const ist = getCurrentIST();
  const unlockDate = new Date(letter.unlockDate + "T00:00:00");
  const istDateOnly = new Date(ist.getFullYear(), ist.getMonth(), ist.getDate());
  return istDateOnly >= unlockDate;
}

// Get display date for locked letters
export function getUnlockDisplayDate(letter: Letter): string {
  const date = new Date(letter.unlockDate + "T00:00:00");
  return `March ${date.getDate()}`;
}
