namespace FlashcardsApi.Models;

public class TestResult
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int CategoryId { get; set; }
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
}
