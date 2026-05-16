using PhoneBook.Services.Models;

namespace PhoneBook.Services
{
    /// <summary>
    ///  Profile service
    /// </summary>
    public interface IProfileService
    {
        Task InitProfile(string emailAddress);
        Task UpdateProfile(UserProfileDto profile);

        Task DeleteProfile(string emailAddress);
    }
}
