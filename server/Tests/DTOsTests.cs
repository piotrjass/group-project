using Xunit;
using FlashcardsApi.DTOs;

namespace FlashcardsApi.Tests;

public class DTOsTests
{
    [Fact]
    public void RegisterRequest_ShouldCreateCorrectly()
    {
        // Arrange & Act
        var request = new RegisterRequest(
            "test@example.com",
            "password123",
            "password123"
        );

        // Assert
        Assert.Equal("test@example.com", request.Email);
        Assert.Equal("password123", request.Password);
        Assert.Equal("password123", request.ConfirmPassword);
    }

    [Fact]
    public void RegisterRequest_ShouldDetectPasswordMismatch()
    {
        // Arrange & Act
        var request = new RegisterRequest(
            "test@example.com",
            "password123",
            "password456"
        );

        // Assert
        Assert.NotEqual(request.Password, request.ConfirmPassword);
    }

    [Fact]
    public void LoginRequest_ShouldCreateCorrectly()
    {
        // Arrange & Act
        var request = new LoginRequest(
            "test@example.com",
            "password123"
        );

        // Assert
        Assert.Equal("test@example.com", request.Email);
        Assert.Equal("password123", request.Password);
    }

    [Fact]
    public void LoginResponse_ShouldCreateWithoutTwoFactor()
    {
        // Arrange & Act
        var response = new LoginResponse(
            "jwt_token_here",
            false,
            null
        );

        // Assert
        Assert.Equal("jwt_token_here", response.Token);
        Assert.False(response.RequiresTwoFactor);
        Assert.Null(response.UserId);
    }

    [Fact]
    public void LoginResponse_ShouldCreateWithTwoFactor()
    {
        // Arrange & Act
        var response = new LoginResponse(
            string.Empty,
            true,
            123
        );

        // Assert
        Assert.Equal(string.Empty, response.Token);
        Assert.True(response.RequiresTwoFactor);
        Assert.Equal(123, response.UserId);
    }

    [Fact]
    public void TwoFactorVerifyRequest_ShouldCreateCorrectly()
    {
        // Arrange & Act
        var request = new TwoFactorVerifyRequest(
            123,
            "123456"
        );

        // Assert
        Assert.Equal(123, request.UserId);
        Assert.Equal("123456", request.Code);
    }

    [Fact]
    public void AuthResponse_ShouldCreateCorrectly()
    {
        // Arrange & Act
        var response = new AuthResponse(
            "jwt_token_here",
            "test@example.com"
        );

        // Assert
        Assert.Equal("jwt_token_here", response.Token);
        Assert.Equal("test@example.com", response.Email);
    }

    [Fact]
    public void TwoFactorSetupResponse_ShouldCreateCorrectly()
    {
        // Arrange & Act
        var response = new TwoFactorSetupResponse(
            "secret_key",
            "123456"
        );

        // Assert
        Assert.Equal("secret_key", response.Secret);
        Assert.Equal("123456", response.Code);
    }
}
