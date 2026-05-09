namespace PhoneBookApi.Models
{
    /// <summary>
    ///  DTO class for contact information. This class is used to transfer contact data between the client and the server.
    /// </summary>
    public class Contact
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Email { get; set; }

        public required string PhoneNumber { get; set; }

        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }


    }
}
