using System;
using System.Collections.Generic;
using System.Text;

namespace PhoneBook.Services.Models
{
    public class PagedList<T>
    {
        public PagedList(List<T> records, long count)
        {
            Records = records;
            TotalCount = count;
            
        }
        public List<T> Records { get; private set; }
        public  long TotalCount { get; private set; }
    }
}
