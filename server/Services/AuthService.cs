using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FlashcardsApi.Data;
using FlashcardsApi.DTOs;
using FlashcardsApi.Models;
using BCrypt.Net;

namespace FlashcardsApi.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(AppDbContext context, IConfiguration configuration, ILogger<AuthService> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<(bool Success, string Message, User? User)> RegisterAsync(RegisterRequest request)
    {
        // Validate passwords match
        if (request.Password != request.ConfirmPassword)
        {
            return (false, "Passwords do not match", null);
        }

        // Validate password strength
        if (request.Password.Length < 6)
        {
            return (false, "Password must be at least 6 characters long", null);
        }

        // Check if user already exists
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (existingUser != null)
        {
            return (false, "User with this email already exists", null);
        }

        // Create new user
        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            TwoFactorEnabled = false
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation($"New user registered: {user.Email}");

        return (true, "Registration successful", user);
    }

    public async Task<(bool Success, string Message, User? User, bool RequiresTwoFactor)> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return (false, "Invalid email or password", null, false);
        }

        _logger.LogInformation($"User logged in: {user.Email}");

        // If 2FA is enabled, require verification
        if (user.TwoFactorEnabled)
        {
            return (true, "Two-factor authentication required", user, true);
        }

        return (true, "Login successful", user, false);
    }

    public async Task<(bool Success, string Message, string? Code)> SetupTwoFactorAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return (false, "User not found", null);
        }

        // Generate a simple 6-digit code as "secret"
        var secret = GenerateTwoFactorCode();
        user.TwoFactorSecret = secret;
        user.TwoFactorEnabled = true;

        await _context.SaveChangesAsync();

        // Log the 2FA code to console
        _logger.LogWarning($"\n\n========================================");
        _logger.LogWarning($"2FA SETUP for {user.Email}");
        _logger.LogWarning($"Your 2FA code is: {secret}");
        _logger.LogWarning($"========================================\n");

        Console.WriteLine("\n========================================");
        Console.WriteLine($"2FA SETUP for {user.Email}");
        Console.WriteLine($"Your 2FA code is: {secret}");
        Console.WriteLine("========================================\n");

        return (true, "Two-factor authentication enabled", secret);
    }

    public async Task<(bool Success, string Message)> VerifyTwoFactorAsync(int userId, string code)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return (false, "User not found");
        }

        if (!user.TwoFactorEnabled || user.TwoFactorSecret == null)
        {
            return (false, "Two-factor authentication not enabled");
        }

        if (user.TwoFactorSecret != code)
        {
            _logger.LogWarning($"Failed 2FA attempt for {user.Email}");
            return (false, "Invalid code");
        }

        _logger.LogInformation($"Successful 2FA verification for {user.Email}");

        return (true, "Verification successful");
    }

    public async Task<User?> GetUserByIdAsync(int userId)
    {
        return await _context.Users.FindAsync(userId);
    }

    public string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["JwtSettings:Secret"] ?? "default-secret-key-change-this-in-production"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60")),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateTwoFactorCode()
    {
        // Generate a 6-digit code
        var random = new Random();
        return random.Next(100000, 999999).ToString();
    }
}
