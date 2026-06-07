using Microsoft.EntityFrameworkCore;
using PhoneBook.Data;
using PhoneBook.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhoneBook.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly PhoneBookDbContext _context;
    
        public CategoryService(PhoneBookDbContext context)
        {
            _context = context;
        }
        public Task<CategoryDto> CreateCategoryAsync(CategoryDto category, string? profileEmail)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedList<CategoryDto>> GetAllCategoriesAsync(string profileEmail, int pageNumber, int pageSize)
        {
            var totalCount = await _context.Category
                .AsNoTracking()
                .Where(c => !c.ProfileId.HasValue || c.Profile.Email == profileEmail)
                .LongCountAsync();
            var list = await _context.Category
                .AsNoTracking()
                .Where(c => !c.ProfileId.HasValue || c.Profile.Email == profileEmail)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    IsActive = c.IsActive
                })
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return new PagedList<CategoryDto>(list,totalCount);
        }

        public async Task<List<CategoryDto>> GetAllCategoriesWithoutPagingAsync(string profileEmail)
        {
            return await _context.Category
                .AsNoTracking()
                .Where(c => !c.ProfileId.HasValue || c.Profile.Email == profileEmail)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    IsActive = c.IsActive
                })
                .ToListAsync();
        }

        public async Task<CategoryDto> DeactivateCategoryAsync(int categoryId, string? profileEmail)
        {
            var category = await _context.Category
                .AsNoTracking()
                .Where(c => c.Id == categoryId && (!c.ProfileId.HasValue || c.Profile.Email == profileEmail))
                .FirstOrDefaultAsync();
            if (category == null)
                throw new InvalidOperationException("Category not found");

            category.IsActive = false;
            await _context.SaveChangesAsync();
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                IsActive = category.IsActive
            };
        }
    }
}
