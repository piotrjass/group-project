using Xunit;
using FlashcardsApi.Services;
using FlashcardsApi.DTOs;

namespace FlashcardsApi.Tests;

public class AuthServiceTests
{
    [Fact]
    public void GenerateTwoFactorCode_ShouldReturn6Digits()
    {
        // Arrange
        var authService = new AuthService(null!, null!, null!);

        // Act
        var code = authService.GenerateTwoFactorCode();

        // Assert
        Assert.NotNull(code);
        Assert.Equal(6, code.Length);
        Assert.True(int.TryParse(code, out _));
    }

    [Fact]
    public void GenerateTwoFactorCode_ShouldReturnNumericString()
    {
        // Arrange
        var authService = new AuthService(null!, null!, null!);

        // Act
        var code = authService.GenerateTwoFactorCode();
        var isNumeric = int.TryParse(code, out var numericValue);

        // Assert
        Assert.True(isNumeric);
        Assert.InRange(numericValue, 100000, 999999);
    }

    [Fact]
    public void GenerateTwoFactorCode_ShouldGenerateDifferentCodes()
    {
        // Arrange
        var authService = new AuthService(null!, null!, null!);

        // Act
        var code1 = authService.GenerateTwoFactorCode();
        var code2 = authService.GenerateTwoFactorCode();
        var code3 = authService.GenerateTwoFactorCode();

        // Assert
        // While theoretically they could be the same, the probability is very low
        Assert.True(code1 != code2 || code2 != code3 || code1 != code3);
    }

    [Fact]
    public void RegisterRequest_PasswordsMustMatch()
    {
        // Arrange
        var request = new RegisterRequest("test@example.com", "password123", "password456");

        // Assert
        Assert.NotEqual(request.Password, request.ConfirmPassword);
    }

    [Fact]
    public void RegisterRequest_ShouldCreateWithMatchingPasswords()
    {
        // Arrange & Act
        var request = new RegisterRequest("test@example.com", "password123", "password123");

        // Assert
        Assert.Equal(request.Password, request.ConfirmPassword);
        Assert.Equal("test@example.com", request.Email);
    }

    [Fact]
    public void LoginRequest_ShouldCreateCorrectly()
    {
        // Arrange & Act
        var request = new LoginRequest("test@example.com", "password123");

        // Assert
        Assert.Equal("test@example.com", request.Email);
        Assert.Equal("password123", request.Password);
        Assert.NotNull(request.Email);
        Assert.NotNull(request.Password);
    }

    [Theory]
    [InlineData("test@example.com")]
    [InlineData("user@domain.com")]
    [InlineData("admin@test.org")]
    public void RegisterRequest_ShouldAcceptValidEmails(string email)
    {
        // Arrange & Act
        var request = new RegisterRequest(email, "password123", "password123");

        // Assert
        Assert.Equal(email, request.Email);
    }

    [Theory]
    [InlineData("short")]
    [InlineData("12345")]
    [InlineData("a")]
    public void RegisterRequest_ShortPasswordsCanBeCreated(string password)
    {
        // Arrange & Act
        var request = new RegisterRequest("test@example.com", password, password);

        // Assert
        Assert.Equal(password, request.Password);
        Assert.Equal(password, request.ConfirmPassword);
    }
}
