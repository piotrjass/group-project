import type {
  User,
  Category,
  Flashcard,
  TestQuestion,
  TestAnswer,
  TestResult,
  TestAnswerDetail,
  TestHistory
} from '@/types';

describe('TypeScript Types', () => {
  describe('User', () => {
    it('should create a valid User object', () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
      };

      expect(user.id).toBe(1);
      expect(user.email).toBe('test@example.com');
    });
  });

  describe('Category', () => {
    it('should create a valid Category object', () => {
      const category: Category = {
        id: 1,
        name: 'Math',
        description: 'Mathematics flashcards',
        flashcardCount: 10,
      };

      expect(category.id).toBe(1);
      expect(category.name).toBe('Math');
      expect(category.description).toBe('Mathematics flashcards');
      expect(category.flashcardCount).toBe(10);
    });
  });

  describe('Flashcard', () => {
    it('should create a valid Flashcard object', () => {
      const flashcard: Flashcard = {
        id: 1,
        question: 'What is 2+2?',
        answer: '4',
        categoryId: 1,
        categoryName: 'Math',
      };

      expect(flashcard.id).toBe(1);
      expect(flashcard.question).toBe('What is 2+2?');
      expect(flashcard.answer).toBe('4');
      expect(flashcard.categoryId).toBe(1);
      expect(flashcard.categoryName).toBe('Math');
    });
  });

  describe('TestQuestion', () => {
    it('should create a valid TestQuestion object', () => {
      const testQuestion: TestQuestion = {
        flashcardId: 1,
        question: 'What is 2+2?',
        options: ['3', '4', '5', '6'],
        correctOptionIndex: 1,
      };

      expect(testQuestion.flashcardId).toBe(1);
      expect(testQuestion.question).toBe('What is 2+2?');
      expect(testQuestion.options).toHaveLength(4);
      expect(testQuestion.correctOptionIndex).toBe(1);
    });
  });

  describe('TestAnswer', () => {
    it('should create a valid TestAnswer object', () => {
      const testAnswer: TestAnswer = {
        flashcardId: 1,
        selectedOptionIndex: 1,
      };

      expect(testAnswer.flashcardId).toBe(1);
      expect(testAnswer.selectedOptionIndex).toBe(1);
    });
  });

  describe('TestResult', () => {
    it('should create a valid TestResult object', () => {
      const testAnswerDetail: TestAnswerDetail = {
        flashcardId: 1,
        question: 'What is 2+2?',
        correctAnswer: '4',
        userAnswer: '4',
        isCorrect: true,
      };

      const testResult: TestResult = {
        totalQuestions: 10,
        correctAnswers: 8,
        percentage: 80,
        details: [testAnswerDetail],
      };

      expect(testResult.totalQuestions).toBe(10);
      expect(testResult.correctAnswers).toBe(8);
      expect(testResult.percentage).toBe(80);
      expect(testResult.details).toHaveLength(1);
      expect(testResult.details[0].isCorrect).toBe(true);
    });
  });

  describe('TestHistory', () => {
    it('should create a valid TestHistory object', () => {
      const testHistory: TestHistory = {
        id: 1,
        categoryName: 'Math',
        totalQuestions: 10,
        correctAnswers: 8,
        percentage: 80,
        completedAt: '2024-01-01T00:00:00Z',
      };

      expect(testHistory.id).toBe(1);
      expect(testHistory.categoryName).toBe('Math');
      expect(testHistory.totalQuestions).toBe(10);
      expect(testHistory.correctAnswers).toBe(8);
      expect(testHistory.percentage).toBe(80);
      expect(testHistory.completedAt).toBe('2024-01-01T00:00:00Z');
    });
  });
});
