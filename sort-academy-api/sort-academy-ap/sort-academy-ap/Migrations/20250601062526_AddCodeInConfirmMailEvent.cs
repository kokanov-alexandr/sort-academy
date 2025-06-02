using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sort_academy_ap.Migrations
{
    /// <inheritdoc />
    public partial class AddCodeInConfirmMailEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "MailConfirmationEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "MailConfirmationEvents");
        }
    }
}
