namespace PhoneBookApi.Models
{
    /// <summary>
    ///  This class reprsents user coming from the UserInfo endpoint of the Identity Server. It is used to store the user profile information in the database. It is also used to link the contacts to the user profile. The user profile is identified by the email address, which is unique for each user. The email address is obtained from the UserInfo endpoint of the Identity Server and stored in the database. The contacts are linked to the user profile using the email address as a foreign key. This allows us to retrieve the contacts for a specific user when they log in to the application.
    /// </summary>
    public class IdentityProfile
    {
        public string Nickname { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

    }
}
