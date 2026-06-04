using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneBook.Data;
using PhoneBook.Services;
using PhoneBook.Services.Models;
using System.Security.Claims;

namespace PhoneBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly PhoneBookDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IContactService _contactService;

        public HomeController(PhoneBookDbContext context, IConfiguration configuration, IContactService contactService)
        {
            _context = context;
            _configuration = configuration;
            _contactService = contactService;
        }
        [Authorize]
        [HttpGet]
        public async Task<PagedList<ContactDto>> Get(int pageNumber, int pageSize)
        {
            // Get User Profile
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            return await _contactService.GetAllContactsAsync(userEmail, pageNumber, pageSize);



        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ContactDto> Get(int id)
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            return await _contactService.GetContactByIdAsync(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(ContactDto contact)
        {
            if (contact == null) return BadRequest("Contact data is required.");
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (userEmail == null) return Unauthorized("User email claim is missing.");
            try
            {
                var newContactId = await _contactService.CreateContactAsync(contact, userEmail);
                return CreatedAtAction(nameof(Post), new { id = newContactId }, contact);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating contact: {ex.Message}");
            }
        }


        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(ContactDto contact)
        {
            if (contact == null) return BadRequest("Contact data is required.");
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (userEmail == null) return Unauthorized("User email claim is missing.");
            try
            {
                var newContactId = await _contactService.UpdateContactAsync(contact, userEmail);
                return CreatedAtAction(nameof(Put), new { id = newContactId }, contact);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating contact: {ex.Message}");
            }
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return BadRequest("Valid contact ID is required.");
            try
            {
                await _contactService.DeleteContactAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error deleting contact: {ex.Message}");
            }
        }
    }
}
                  
      