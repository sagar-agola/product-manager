using Microsoft.EntityFrameworkCore.Migrations;

namespace PM.Database.Migrations
{
    public partial class AlterTable_FormAnswers_AddFKColumn_EventId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "FormAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FormAnswers_EventId",
                table: "FormAnswers",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormAnswers_Events_EventId",
                table: "FormAnswers",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormAnswers_Events_EventId",
                table: "FormAnswers");

            migrationBuilder.DropIndex(
                name: "IX_FormAnswers_EventId",
                table: "FormAnswers");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "FormAnswers");
        }
    }
}
