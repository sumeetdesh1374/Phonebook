using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PhoneBook.Services.Configurattion;
using PhoneBook.Utils;
using System.Security.Claims;

namespace PhoneBook.Services
{
    class EmailHolder
    {
        public string Email { get; set; }
    }
    public class AuthMiddleware
    {

        private readonly RequestDelegate _next;
        private IProfileService _profileService;
        private AuthConfig _configuration;    

        public AuthMiddleware(RequestDelegate next,IOptions<AuthConfig> authOptions)
        {
            _next = next;
            _configuration = authOptions.Value;
        }

        private async Task<string?> GetUserEmailFromUserInfoEndPoint(HttpContext context)
        {
            var accessToken = await context.GetTokenAsync("access_token");
            var usesrInfoUrl = $"{_configuration.Authority}userinfo";
            RestUtil.SetJwtAuthorization(accessToken);
            var emailHolder = await RestUtil.GetAsync<EmailHolder>(usesrInfoUrl);
            return emailHolder?.Email;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            var userEmail = await GetUserEmailFromUserInfoEndPoint(context);
            if (userEmail != null)
            {
                 var profileService = context.RequestServices.GetRequiredService<IProfileService>();
                await profileService.InitProfile(userEmail);
                var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, userEmail) }, "Custom");
                context.User = new ClaimsPrincipal(identity);
            }

            await _next(context);
        }
    }
}
