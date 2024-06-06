using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Skillfy.Server.Migrations
{
    /// <inheritdoc />
    public partial class removecatagorypicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pictureurl",
                table: "catagories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "pictureurl",
                table: "catagories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
