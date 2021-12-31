using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PM.Database.Migrations
{
    public partial class Products_AddColumn_ManufactoredAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ManufactoredAt",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManufactoredAt",
                table: "Products");
        }
    }
}
