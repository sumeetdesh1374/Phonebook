using System;
using System.Collections.Generic;
using System.Text;

namespace PhoneBook.Services.Configurattion
{
    public class AuthConfig
    {
        public static string AUTH = "auth";
        public string Authority { get; set; }
        public string Audience { get; set; }
    }
}
