using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhoneBook.Data.Entities
{
    /// <summary>
    ///  User Profile entity class representing the user profile information in the database.
    /// </summary>
    /// 
    [Index(nameof(Email), IsUnique = true)]
    public class UserProfile
    {
        public int Id { get; set; }
        public string  Email { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Phone { get; set; }
    }
}
