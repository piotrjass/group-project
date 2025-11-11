import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; confirmPassword: string }) =>
    api.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  setup2FA: (userId: number) =>
    api.post(`/auth/setup-2fa/${userId}`),

  verify2FA: (data: { userId: number; code: string }) =>
    api.post('/auth/verify-2fa', data),
};

// Flashcards API
export const flashcardsApi = {
  getCategories: () =>
    api.get('/flashcards/categories'),

  getFlashcardsByCategory: (categoryId: number) =>
    api.get(`/flashcards/category/${categoryId}`),

  getFlashcard: (id: number) =>
    api.get(`/flashcards/${id}`),
};

// Tests API
export const testsApi = {
  generateTest: (categoryId: number) =>
    api.get(`/tests/generate/${categoryId}`),

  submitTest: (data: { categoryId: number; answers: Array<{ flashcardId: number; selectedOptionIndex: number }> }) =>
    api.post('/tests/submit', data),

  getHistory: () =>
    api.get('/tests/history'),
};

export default api;
