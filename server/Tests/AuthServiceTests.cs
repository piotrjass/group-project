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
    public void RegisterRequest_PasswordsMustMatch()
    {
        // Arrange
        var request = new RegisterRequest("test@example.com", "password123", "password456");

        // Assert
        Assert.NotEqual(request.Password, request.ConfirmPassword);
    }
}
