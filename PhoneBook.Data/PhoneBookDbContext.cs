using Microsoft.EntityFrameworkCore;
using PhoneBook.Data.Entities;

namespace PhoneBook.Data
{
    /// <summary>
    ///  Db Context class for the phone book application. This class is responsible for managing the database connection and providing access to the data. It will be used to perform CRUD operations on the contact data.
    /// </summary>
    public class PhoneBookDbContext:DbContext
    {
        public DbSet<Contact>  Contact { get; set; }
        public DbSet<Category> Category { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=PhoneBook;Trusted_Connection=True;TrustServerCertificate=True;",
                option=>
                {
                    option.MigrationsAssembly("PhoneBook.Data");
                })
                .UseSeeding( (context,_)=>{
                    var category1 = new Category {  Name = "General" };
                    var count = context.Set<Category>().Count();
                    if (count == 0)
                    {
                        context.Set<Category>().Add(category1);
                    }
                    context.SaveChanges();
                })
                .UseAsyncSeeding( async (context,_,cancellationToken)=>
                {
                    var category1 = new Category {  Name = "General" };
                    var count = context.Set<Category>().Count();
                    if (count == 0)
                    {
                        context.Set<Category>().Add(category1);
                    }
                    await context.SaveChangesAsync();
                });
          //  base.OnConfiguring(optionsBuilder);
        }
    }
}
