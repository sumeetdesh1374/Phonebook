using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using PhoneBook.Data;
using Scalar.AspNetCore;

IdentityModelEventSource.ShowPII = true;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<PhoneBookDbContext>();
builder.Services.AddAuthentication(options=>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["auth:authority"]; 
        options.Audience = builder.Configuration["auth:audience"]; 

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context => {
                // Log the exception details
                Console.WriteLine("Auth failed: " + context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context => {
                // Confirm validation succeeded and inspect claims
                return Task.CompletedTask;
            }
        };
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

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PhoneBookDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
