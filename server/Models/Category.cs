namespace FlashcardsApi.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public ICollection<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
}
