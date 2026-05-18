using System;
using System.Collections.Generic;
using System.Text;

namespace PhoneBook.Services.Models
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        /// <summary>
        ///  We can deacticate category, however it will be still tied to existing contacts, but it will not be available for new contacts. This property indicates whether the category is active or not.
        /// </summary>
        public bool IsActive { get; set; } = true;
    }
}
