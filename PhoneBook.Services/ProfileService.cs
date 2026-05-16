using Microsoft.Extensions.Options;
using PhoneBook.Data;
using PhoneBook.Services.Configurattion;
using PhoneBook.Services.Models;

namespace PhoneBook.Services
{
    public class ProfileService : IProfileService
    {
        private readonly PhoneBookDbContext _context;
        private readonly AuthConfig _authConfig;

        public ProfileService(PhoneBookDbContext context,IOptions<AuthConfig> authOptions)
        {
            _context = context;
            _authConfig = authOptions.Value;

            
        }
        public async Task DeleteProfile(string emailAddress)
        {
           await Task.Delay(100);
        }

        public async Task InitProfile(string emailAddress)
        {
           var profile = _context.UserProfile.FirstOrDefault(x=>x.Email == emailAddress);
            if(profile == null)
            {
                _context.UserProfile.Add(new Data.Entities.UserProfile() { Email = emailAddress });
            }

            await _context.SaveChangesAsync();

            


        }

        public async Task UpdateProfile(UserProfileDto profile)
        {
            await Task.Delay(100);
        }
    }
}
