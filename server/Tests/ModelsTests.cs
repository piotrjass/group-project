using Xunit;
using FlashcardsApi.Models;

namespace FlashcardsApi.Tests;

public class ModelsTests
{
    [Fact]
    public void User_ShouldInitializeWithDefaultValues()
    {
        // Arrange & Act
        var user = new User();

        // Assert
        Assert.Equal(string.Empty, user.Email);
        Assert.Equal(string.Empty, user.PasswordHash);
        Assert.False(user.TwoFactorEnabled);
        Assert.Null(user.TwoFactorSecret);
        Assert.NotNull(user.TestResults);
        Assert.Empty(user.TestResults);
    }

    [Fact]
    public void User_ShouldSetPropertiesCorrectly()
    {
        // Arrange & Act
        var user = new User
        {
            Id = 1,
            Email = "test@example.com",
            PasswordHash = "hashed_password",
            TwoFactorEnabled = true,
            TwoFactorSecret = "123456"
        };

        // Assert
        Assert.Equal(1, user.Id);
        Assert.Equal("test@example.com", user.Email);
        Assert.Equal("hashed_password", user.PasswordHash);
        Assert.True(user.TwoFactorEnabled);
        Assert.Equal("123456", user.TwoFactorSecret);
    }

    [Fact]
    public void Category_ShouldInitializeWithDefaultValues()
    {
        // Arrange & Act
        var category = new Category();

        // Assert
        Assert.Equal(string.Empty, category.Name);
        Assert.Equal(string.Empty, category.Description);
        Assert.NotNull(category.Flashcards);
        Assert.Empty(category.Flashcards);
    }

    [Fact]
    public void Category_ShouldSetPropertiesCorrectly()
    {
        // Arrange & Act
        var category = new Category
        {
            Id = 1,
            Name = "Mathematics",
            Description = "Math flashcards"
        };

        // Assert
        Assert.Equal(1, category.Id);
        Assert.Equal("Mathematics", category.Name);
        Assert.Equal("Math flashcards", category.Description);
    }

    [Fact]
    public void Flashcard_ShouldInitializeWithDefaultValues()
    {
        // Arrange & Act
        var flashcard = new Flashcard();

        // Assert
        Assert.Equal(string.Empty, flashcard.Question);
        Assert.Equal(string.Empty, flashcard.Answer);
        Assert.Equal(0, flashcard.CategoryId);
        Assert.Null(flashcard.Category);
    }

    [Fact]
    public void Flashcard_ShouldSetPropertiesCorrectly()
    {
        // Arrange & Act
        var flashcard = new Flashcard
        {
            Id = 1,
            Question = "What is 2+2?",
            Answer = "4",
            CategoryId = 1
        };

        // Assert
        Assert.Equal(1, flashcard.Id);
        Assert.Equal("What is 2+2?", flashcard.Question);
        Assert.Equal("4", flashcard.Answer);
        Assert.Equal(1, flashcard.CategoryId);
    }

    [Fact]
    public void Category_ShouldManageFlashcardsCollection()
    {
        // Arrange
        var category = new Category
        {
            Id = 1,
            Name = "Math",
            Description = "Mathematics"
        };

        var flashcard1 = new Flashcard
        {
            Id = 1,
            Question = "What is 2+2?",
            Answer = "4",
            CategoryId = 1,
            Category = category
        };

        var flashcard2 = new Flashcard
        {
            Id = 2,
            Question = "What is 3+3?",
            Answer = "6",
            CategoryId = 1,
            Category = category
        };

        // Act
        category.Flashcards.Add(flashcard1);
        category.Flashcards.Add(flashcard2);

        // Assert
        Assert.Equal(2, category.Flashcards.Count);
        Assert.Contains(flashcard1, category.Flashcards);
        Assert.Contains(flashcard2, category.Flashcards);
    }
}
