using System;
using System.Collections.Generic;
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
     
    }
}
