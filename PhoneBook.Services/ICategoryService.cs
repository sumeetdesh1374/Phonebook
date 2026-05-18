using PhoneBook.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhoneBook.Services
{
    public interface ICategoryService
    {
        Task<PagedList<CategoryDto>> GetAllCategoriesAsync(string profileEmail, int pageNumber, int pageSize);
        Task<List<CategoryDto>> GetAllCategoriesWithoutPagingAsync(string profileEmail);
        Task<CategoryDto> CreateCategoryAsync(CategoryDto category,string? profileEmail);
    }
}
