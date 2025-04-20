using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sort_academy_ap.Migrations
{
    /// <inheritdoc />
    public partial class ChangePropertyValueType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "SortingSortingProperty");

            migrationBuilder.AddColumn<int>(
                name: "Value",
                table: "SortingSortingProperty",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Value",
                table: "SortingSortingProperty");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SortingSortingProperty",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
