namespace FlashcardsApi.DTOs;

public record TestQuestion(int FlashcardId, string Question, List<string> Options, int CorrectOptionIndex);

public record SubmitTestRequest(int CategoryId, List<TestAnswer> Answers);

public record TestAnswer(int FlashcardId, int SelectedOptionIndex);

public record TestResultResponse(int TotalQuestions, int CorrectAnswers, double Percentage, List<TestAnswerDetail> Details);

public record TestAnswerDetail(int FlashcardId, string Question, string CorrectAnswer, string UserAnswer, bool IsCorrect);

public record TestHistoryResponse(int Id, string CategoryName, int TotalQuestions, int CorrectAnswers, double Percentage, DateTime CompletedAt);
