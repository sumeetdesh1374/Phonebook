using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Data;
using PhoneBook.Utils;
using PhoneBookApi.Models;
using System.Security.Claims;

namespace PhoneBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly PhoneBookDbContext _context;
        private readonly IConfiguration _configuration; 

        public HomeController(PhoneBookDbContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [Authorize]
        public async Task<IEnumerable<Contact>> Get()
        {
            // Get User Profile
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            // Create 


            var contacts = await _context.Contact.Include(x=>x.Category)
                .Where(c => c.Profile.Email  == userEmail)
                .Select(c => new Contact
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber,
                    CategoryId = c.CategoryId,
                    CategoryName = c.Category.Name
                })
                .ToListAsync();

            return contacts;
        }
    }
}
                  
      