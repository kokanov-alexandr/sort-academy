using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sort_academy_ap.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserAnswerOptionsType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAnswerOptions");

            migrationBuilder.CreateTable(
                name: "AnswerOptionQuestionResult",
                columns: table => new
                {
                    QuestionResultsId = table.Column<int>(type: "int", nullable: false),
                    UserAnswerOptionsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerOptionQuestionResult", x => new { x.QuestionResultsId, x.UserAnswerOptionsId });
                    table.ForeignKey(
                        name: "FK_AnswerOptionQuestionResult_AnswerOptions_UserAnswerOptionsId",
                        column: x => x.UserAnswerOptionsId,
                        principalTable: "AnswerOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnswerOptionQuestionResult_QuestionResults_QuestionResultsId",
                        column: x => x.QuestionResultsId,
                        principalTable: "QuestionResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnswerOptionQuestionResult_UserAnswerOptionsId",
                table: "AnswerOptionQuestionResult",
                column: "UserAnswerOptionsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswerOptionQuestionResult");

            migrationBuilder.CreateTable(
                name: "UserAnswerOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    QuestionResultId = table.Column<int>(type: "int", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswerOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAnswerOptions_QuestionResults_QuestionResultId",
                        column: x => x.QuestionResultId,
                        principalTable: "QuestionResults",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswerOptions_QuestionResultId",
                table: "UserAnswerOptions",
                column: "QuestionResultId");
        }
    }
}
