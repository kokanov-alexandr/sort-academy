using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sort_academy_ap.Migrations
{
    /// <inheritdoc />
    public partial class AddSortingProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SortingProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SortingProperties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SortingSortingProperty",
                columns: table => new
                {
                    SortingId = table.Column<int>(type: "int", nullable: false),
                    SortingPropertyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SortingSortingProperty", x => new { x.SortingId, x.SortingPropertyId });
                    table.ForeignKey(
                        name: "FK_SortingSortingProperty_SortingProperties_SortingPropertyId",
                        column: x => x.SortingPropertyId,
                        principalTable: "SortingProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SortingSortingProperty_Sortings_SortingId",
                        column: x => x.SortingId,
                        principalTable: "Sortings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SortingSortingProperty_SortingPropertyId",
                table: "SortingSortingProperty",
                column: "SortingPropertyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SortingSortingProperty");

            migrationBuilder.DropTable(
                name: "SortingProperties");
        }
    }
}
