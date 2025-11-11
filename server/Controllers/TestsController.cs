using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashcardsApi.Data;
using FlashcardsApi.DTOs;
using FlashcardsApi.Models;

namespace FlashcardsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TestsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TestsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("generate/{categoryId}")]
    public async Task<IActionResult> GenerateTest(int categoryId)
    {
        var flashcards = await _context.Flashcards
            .Where(f => f.CategoryId == categoryId)
            .ToListAsync();

        if (!flashcards.Any())
        {
            return NotFound(new { message = "No flashcards found for this category" });
        }

        var random = new Random();
        var questions = flashcards.Select(f =>
        {
            var wrongAnswers = flashcards
                .Where(x => x.Id != f.Id)
                .OrderBy(x => random.Next())
                .Take(3)
                .Select(x => x.Answer)
                .ToList();

            var allOptions = new List<string> { f.Answer };
            allOptions.AddRange(wrongAnswers);
            allOptions = allOptions.OrderBy(x => random.Next()).ToList();

            var correctIndex = allOptions.IndexOf(f.Answer);

            return new TestQuestion(f.Id, f.Question, allOptions, correctIndex);
        }).ToList();

        return Ok(questions);
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitTest([FromBody] SubmitTestRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized();
        }

        var flashcards = await _context.Flashcards
            .Where(f => request.Answers.Select(a => a.FlashcardId).Contains(f.Id))
            .ToListAsync();

        var details = new List<TestAnswerDetail>();
        int correctCount = 0;

        foreach (var answer in request.Answers)
        {
            var flashcard = flashcards.FirstOrDefault(f => f.Id == answer.FlashcardId);
            if (flashcard == null) continue;

            // For this simple implementation, we'll regenerate options to check correctness
            var random = new Random(answer.FlashcardId); // Use seed for consistency
            var wrongAnswers = flashcards
                .Where(x => x.Id != flashcard.Id)
                .OrderBy(x => random.Next())
                .Take(3)
                .Select(x => x.Answer)
                .ToList();

            var allOptions = new List<string> { flashcard.Answer };
            allOptions.AddRange(wrongAnswers);
            allOptions = allOptions.OrderBy(x => random.Next()).ToList();

            var correctIndex = allOptions.IndexOf(flashcard.Answer);
            var isCorrect = answer.SelectedOptionIndex == correctIndex;

            if (isCorrect) correctCount++;

            var userAnswer = answer.SelectedOptionIndex >= 0 && answer.SelectedOptionIndex < allOptions.Count
                ? allOptions[answer.SelectedOptionIndex]
                : "No answer";

            details.Add(new TestAnswerDetail(
                flashcard.Id,
                flashcard.Question,
                flashcard.Answer,
                userAnswer,
                isCorrect
            ));
        }

        // Save test result
        var testResult = new TestResult
        {
            UserId = userId,
            CategoryId = request.CategoryId,
            TotalQuestions = request.Answers.Count,
            CorrectAnswers = correctCount
        };

        _context.TestResults.Add(testResult);
        await _context.SaveChangesAsync();

        var percentage = (double)correctCount / request.Answers.Count * 100;

        return Ok(new TestResultResponse(
            request.Answers.Count,
            correctCount,
            Math.Round(percentage, 2),
            details
        ));
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetTestHistory()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized();
        }

        var history = await _context.TestResults
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CompletedAt)
            .Take(20)
            .ToListAsync();

        var categories = await _context.Categories.ToListAsync();

        var response = history.Select(h =>
        {
            var category = categories.FirstOrDefault(c => c.Id == h.CategoryId);
            var percentage = (double)h.CorrectAnswers / h.TotalQuestions * 100;

            return new TestHistoryResponse(
                h.Id,
                category?.Name ?? "Unknown",
                h.TotalQuestions,
                h.CorrectAnswers,
                Math.Round(percentage, 2),
                h.CompletedAt
            );
        }).ToList();

        return Ok(response);
    }
}
