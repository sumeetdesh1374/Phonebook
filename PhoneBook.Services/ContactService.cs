using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Data;
using PhoneBook.Data.Entities;
using PhoneBook.Services.Models;

namespace PhoneBook.Services
{
    public class ContactService : IContactService
    {
        private readonly PhoneBookDbContext _context;

        public ContactService(PhoneBookDbContext context)
        {
            _context = context;
        }

        public async Task<PagedList<ContactDto>> GetAllContactsAsync(string emailAddress,int pageNumber, int pageSize)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var totalCount = await _context.Contact.CountAsync(x => x.Profile.Email == emailAddress);

            var records = await _context.Contact.Include(x=>x.Category)
                .AsNoTracking()
                .Where(x=>x.Profile.Email == emailAddress)
                .OrderBy(c => c.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new ContactDto
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber,
                    CategoryId = c.CategoryId,
                    CategoryName = c.Category.Name
                })
                .ToListAsync();

            return new PagedList<ContactDto>(records, totalCount);
        }

        public async Task<int> CreateContactAsync(ContactDto contact,string profileEmail)
        {
            if (contact == null) throw new ArgumentNullException(nameof(contact));

            var catagory = await _context.Category.FindAsync(contact.CategoryId);
            var profile = await _context.UserProfile.FirstOrDefaultAsync(x => x.Email == profileEmail);

            var entity = new Contact()
            {
             
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                CategoryId = contact.CategoryId,
                Category = catagory ,
                ProfileId = profile.Id,
                Profile = profile
            };

            _context.Contact.Add(entity);
            var id =  await _context.SaveChangesAsync();

            contact.Id = entity.Id;
            return contact.Id;
        }

        public async Task<int> UpdateContactAsync(ContactDto contact,string profileEmail)
        {
            if (contact == null) throw new ArgumentNullException(nameof(contact));

            var catagory = await _context.Category.FindAsync(contact.CategoryId);
            var profile = await _context.UserProfile.FirstOrDefaultAsync(x => x.Email == profileEmail);

            var existingContact = await _context.Contact.FindAsync(contact.Id);

            if (existingContact == null)
                throw new Exception($"Contact with Id {contact.Id} not found.");



            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;
            existingContact.PhoneNumber = contact.PhoneNumber;
            existingContact.CategoryId = contact.CategoryId;
            existingContact.Category = catagory;
            existingContact.ProfileId = profile.Id;
            existingContact.Profile = profile;



            var id = await _context.SaveChangesAsync();

            contact.Id = existingContact.Id;
            return contact.Id;
        }


        public async Task DeleteContactAsync(int contactId)
        {
            var existingContact = await _context.Contact.FindAsync(contactId);
            if (existingContact == null)
                throw new Exception($"Contact with Id {contactId} not found.");
            _context.Contact.Remove(existingContact);
            await _context.SaveChangesAsync();
        }

    }
}
