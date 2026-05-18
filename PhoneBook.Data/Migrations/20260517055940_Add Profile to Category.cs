using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhoneBook.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProfiletoCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfileId",
                table: "Category",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_ProfileId",
                table: "Category",
                column: "ProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_UserProfile_ProfileId",
                table: "Category",
                column: "ProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_UserProfile_ProfileId",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_ProfileId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Category");
        }
    }
}
