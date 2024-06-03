using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Skillfy.Server.Migrations
{
    /// <inheritdoc />
    public partial class initalcreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "chapters",
                newName: "Chaptername");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Chaptername",
                table: "chapters",
                newName: "Title");
        }
    }
}
