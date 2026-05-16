using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PhoneBook.Data.Entities
{
    /// <summary>
    ///  Contact class entity class for the phone book application. This class represents a contact in the phone book and contains properties such as Id, FirstName, LastName, Email, PhoneNumber, and CategoryId. It will be used to store contact information in the database and perform CRUD operations on the contact data.
    /// </summary>
    public class Contact
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public int CategoryId { get; set; }
        public required Category Category { get; set; }

        [ForeignKey(nameof(ProfileId))]
        public required int ProfileId { get; set; } 
        public required UserProfile Profile { get; set; }
    }
}
