using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PhoneBook.Data.Entities
{
    /// <summary>
    ///  Contact Category entity class for the phone book application. This class represents a category that can be assigned to contacts. It will be used to organize contacts into different categories such as "Friends", "Family", "Work", etc.
    /// </summary>
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        /// <summary>
        ///  We can deacticate category, however it will be still tied to existing contacts, but it will not be available for new contacts. This property indicates whether the category is active or not.
        /// </summary>
        public bool IsActive { get; set; } = true;

        // General Category is shared across all profiles, so we need to tie it to profile to make sure that each profile has its own set of categories. This property indicates the profile that the category belongs to.
        [ForeignKey(nameof(ProfileId))]
        public  int? ProfileId { get; set; }
        public  UserProfile? Profile { get; set; }

    }
}
