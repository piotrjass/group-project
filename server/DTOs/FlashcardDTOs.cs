namespace FlashcardsApi.DTOs;

public record FlashcardResponse(int Id, string Question, string Answer, int CategoryId, string CategoryName);

public record CategoryResponse(int Id, string Name, string Description, int FlashcardCount);
