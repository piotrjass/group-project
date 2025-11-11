import { authApi, flashcardsApi, testsApi } from '@/lib/api';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  })),
}));

describe('API Module', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  describe('authApi', () => {
    it('should have register method', () => {
      expect(authApi.register).toBeDefined();
      expect(typeof authApi.register).toBe('function');
    });

    it('should have login method', () => {
      expect(authApi.login).toBeDefined();
      expect(typeof authApi.login).toBe('function');
    });

    it('should have setup2FA method', () => {
      expect(authApi.setup2FA).toBeDefined();
      expect(typeof authApi.setup2FA).toBe('function');
    });

    it('should have verify2FA method', () => {
      expect(authApi.verify2FA).toBeDefined();
      expect(typeof authApi.verify2FA).toBe('function');
    });
  });

  describe('flashcardsApi', () => {
    it('should have getCategories method', () => {
      expect(flashcardsApi.getCategories).toBeDefined();
      expect(typeof flashcardsApi.getCategories).toBe('function');
    });

    it('should have getFlashcardsByCategory method', () => {
      expect(flashcardsApi.getFlashcardsByCategory).toBeDefined();
      expect(typeof flashcardsApi.getFlashcardsByCategory).toBe('function');
    });

    it('should have getFlashcard method', () => {
      expect(flashcardsApi.getFlashcard).toBeDefined();
      expect(typeof flashcardsApi.getFlashcard).toBe('function');
    });
  });

  describe('testsApi', () => {
    it('should have generateTest method', () => {
      expect(testsApi.generateTest).toBeDefined();
      expect(typeof testsApi.generateTest).toBe('function');
    });

    it('should have submitTest method', () => {
      expect(testsApi.submitTest).toBeDefined();
      expect(typeof testsApi.submitTest).toBe('function');
    });

    it('should have getHistory method', () => {
      expect(testsApi.getHistory).toBeDefined();
      expect(typeof testsApi.getHistory).toBe('function');
    });
  });
});
