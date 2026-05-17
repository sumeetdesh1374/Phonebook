using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PhoneBook.Services.Models
{
    /// <summary>
    ///  Contact Id
    /// </summary>
    public class ContactDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Email { get; set; }

        public required string PhoneNumber { get; set; }

        public int CategoryId { get; set; }
        public  string? CategoryName { get; set; }
    }
}
