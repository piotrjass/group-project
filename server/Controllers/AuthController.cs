using Microsoft.AspNetCore.Mvc;
using FlashcardsApi.DTOs;
using FlashcardsApi.Services;

namespace FlashcardsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var (success, message, user) = await _authService.RegisterAsync(request);

        if (!success)
        {
            return BadRequest(new { message });
        }

        return Ok(new { message, userId = user!.Id, email = user.Email });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var (success, message, user, requiresTwoFactor) = await _authService.LoginAsync(request);

        if (!success)
        {
            return Unauthorized(new { message });
        }

        if (requiresTwoFactor)
        {
            return Ok(new LoginResponse(string.Empty, true, user!.Id));
        }

        var token = _authService.GenerateJwtToken(user!);
        return Ok(new LoginResponse(token, false, null));
    }

    [HttpPost("setup-2fa/{userId}")]
    public async Task<IActionResult> SetupTwoFactor(int userId)
    {
        var (success, message, code) = await _authService.SetupTwoFactorAsync(userId);

        if (!success)
        {
            return BadRequest(new { message });
        }

        return Ok(new { message, secret = code });
    }

    [HttpPost("verify-2fa")]
    public async Task<IActionResult> VerifyTwoFactor([FromBody] TwoFactorVerifyRequest request)
    {
        var (success, message) = await _authService.VerifyTwoFactorAsync(request.UserId, request.Code);

        if (!success)
        {
            return BadRequest(new { message });
        }

        // Generate token after successful 2FA
        var user = await _authService.GetUserByIdAsync(request.UserId);
        if (user == null)
        {
            return BadRequest(new { message = "User not found" });
        }

        var token = _authService.GenerateJwtToken(user);

        return Ok(new { message, token });
    }
}
