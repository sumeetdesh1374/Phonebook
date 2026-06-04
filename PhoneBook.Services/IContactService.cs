using PhoneBook.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBook.Services
{
    /// <summary>
    /// Contact Service
    /// </summary>
    public interface IContactService
    {
        /// <summary>
        /// Returns paged list of contacts.
        /// </summary>
        /// <param name="pageNumber">1-based page number.</param>
        /// <param name="pageSize">Number of items per page.</param>
        /// <returns>List of ContactDto for requested page.</returns>
        Task<PagedList<ContactDto>> GetAllContactsAsync(string emailAddress,int pageNumber, int pageSize);

        /// <summary>
        /// Creates a contact.
        /// </summary>
        Task<int> CreateContactAsync(ContactDto contact,string profileEmail);

        /// <summary>
        /// Updates a contact.
        /// </summary>
        Task<int> UpdateContactAsync(ContactDto contact,string profileEmail);

        /// <summary>
        /// Deletes a contact by id.
        /// </summary>
        Task DeleteContactAsync(int contactId);

        Task<ContactDto> GetContactByIdAsync(int contactId);
    }
}
