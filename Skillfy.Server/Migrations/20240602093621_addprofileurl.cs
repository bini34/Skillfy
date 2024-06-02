using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Skillfy.Server.Migrations
{
    /// <inheritdoc />
    public partial class addprofileurl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileUrl",
                table: "AspNetUsers");
        }
    }
}
