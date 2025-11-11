export interface User {
  id: number;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  flashcardCount: number;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  categoryName: string;
}

export interface TestQuestion {
  flashcardId: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface TestAnswer {
  flashcardId: number;
  selectedOptionIndex: number;
}

export interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  details: TestAnswerDetail[];
}

export interface TestAnswerDetail {
  flashcardId: number;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface TestHistory {
  id: number;
  categoryName: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  completedAt: string;
}
