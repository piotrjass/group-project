using FlashcardsApi.DTOs;
using FlashcardsApi.Models;

namespace FlashcardsApi.Services;

public interface IAuthService
{
    Task<(bool Success, string Message, User? User)> RegisterAsync(RegisterRequest request);
    Task<(bool Success, string Message, User? User, bool RequiresTwoFactor)> LoginAsync(LoginRequest request);
    Task<(bool Success, string Message, string? Code)> SetupTwoFactorAsync(int userId);
    Task<(bool Success, string Message)> VerifyTwoFactorAsync(int userId, string code);
    Task<User?> GetUserByIdAsync(int userId);
    string GenerateJwtToken(User user);
    string GenerateTwoFactorCode();
}
