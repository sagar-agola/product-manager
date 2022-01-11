using Microsoft.EntityFrameworkCore.Migrations;

namespace PM.Database.Migrations
{
    public partial class Modules_AddColumn_Prefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Prefix",
                table: "Modules",
                type: "VARCHAR(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Prefix",
                table: "Modules");
        }
    }
}
