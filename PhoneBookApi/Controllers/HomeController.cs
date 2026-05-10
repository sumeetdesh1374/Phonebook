using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using PhoneBook.Data;
using PhoneBookApi.Models;

namespace PhoneBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly PhoneBookDbContext _context;

        public HomeController(PhoneBookDbContext context)
        {
            _context = context;
        }
        [Authorize]
        public async Task<IEnumerable<Contact>> Get()
        {
            var contacts = new List<Contact>
            {
                new Contact
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "123-456-7890",
                    CategoryId = 1,
                    CategoryName = "Friends"
                },
                new Contact
                {
                    Id = 2,
                    FirstName = "Jane",
                    LastName = "Smith",
                    Email = "jane.smith@example.com",
                    PhoneNumber = "987-654-3210",
                    CategoryId = 1,
                    CategoryName = "Friends"
                }
            };

            return contacts;
        }
    }
}
