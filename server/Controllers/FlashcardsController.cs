using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashcardsApi.Data;
using FlashcardsApi.DTOs;

namespace FlashcardsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FlashcardsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FlashcardsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories
            .Select(c => new CategoryResponse(
                c.Id,
                c.Name,
                c.Description,
                c.Flashcards.Count
            ))
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetFlashcardsByCategory(int categoryId)
    {
        var flashcards = await _context.Flashcards
            .Where(f => f.CategoryId == categoryId)
            .Include(f => f.Category)
            .Select(f => new FlashcardResponse(
                f.Id,
                f.Question,
                f.Answer,
                f.CategoryId,
                f.Category!.Name
            ))
            .ToListAsync();

        return Ok(flashcards);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFlashcard(int id)
    {
        var flashcard = await _context.Flashcards
            .Include(f => f.Category)
            .Where(f => f.Id == id)
            .Select(f => new FlashcardResponse(
                f.Id,
                f.Question,
                f.Answer,
                f.CategoryId,
                f.Category!.Name
            ))
            .FirstOrDefaultAsync();

        if (flashcard == null)
        {
            return NotFound();
        }

        return Ok(flashcard);
    }
}
