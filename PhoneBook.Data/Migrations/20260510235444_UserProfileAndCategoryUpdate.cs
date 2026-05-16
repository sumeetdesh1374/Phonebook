using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhoneBook.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserProfileAndCategoryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfileId",
                table: "Contact",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Category",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "UserProfile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfile", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contact_ProfileId",
                table: "Contact",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_Email",
                table: "UserProfile",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contact_UserProfile_ProfileId",
                table: "Contact",
                column: "ProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contact_UserProfile_ProfileId",
                table: "Contact");

            migrationBuilder.DropTable(
                name: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_Contact_ProfileId",
                table: "Contact");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Contact");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Category");
        }
    }
}
