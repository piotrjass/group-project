namespace FlashcardsApi.DTOs;

public record RegisterRequest(string Email, string Password, string ConfirmPassword);

public record LoginRequest(string Email, string Password);

public record LoginResponse(string Token, bool RequiresTwoFactor, int? UserId);

public record TwoFactorSetupResponse(string Secret, string Code);

public record TwoFactorVerifyRequest(int UserId, string Code);

public record AuthResponse(string Token, string Email);
