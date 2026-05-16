using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using PhoneBook.Data;
using PhoneBook.Services;
using PhoneBook.Services.Configurattion;
using Scalar.AspNetCore;
using System.Security.Claims;

IdentityModelEventSource.ShowPII = true;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<PhoneBookDbContext>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration.GetSection(AuthConfig.AUTH).Get<AuthConfig>().Authority;
        options.Audience = builder.Configuration.GetSection(AuthConfig.AUTH).Get<AuthConfig>().Audience;

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                // Log the exception details
                Console.WriteLine("Auth failed: " + context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                // Confirm validation succeeded and inspect claims
                return Task.CompletedTask;
            }
        };

        options.SaveToken = true;
    });

builder.Services.AddCors(policy =>
{
    policy.AddPolicy("AllowAll", builder =>
     {
           builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
       });
});

builder.Services.Configure<AuthConfig>(builder.Configuration.GetSection(AuthConfig.AUTH));
builder.Services.AddScoped <IProfileService,ProfileService>();


//builder.Services.AddCors( "AllowAll",policy=>
//{
//    policy.AllowAnyOrigin = true;
//    policy.AllowAnyMethod = true;
//    policy.AllowAnyHeader = true;
//});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<PhoneBook.Services.AuthMiddleware>();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PhoneBookDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
