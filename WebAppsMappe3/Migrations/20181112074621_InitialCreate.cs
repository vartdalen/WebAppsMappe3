using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppsMappe3.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FAQ",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    question = table.Column<string>(nullable: true),
                    answer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQ", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    question = table.Column<string>(nullable: true),
                    asker = table.Column<string>(nullable: true),
                    answer = table.Column<string>(nullable: true),
                    replier = table.Column<string>(nullable: true),
                    voteUp = table.Column<int>(nullable: false),
                    voteDown = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "FAQ",
                columns: new[] { "Id", "answer", "question" },
                values: new object[] { 1, "Click the sign up button in the upper right corner of the screen.", "How do i create a user?" });

            migrationBuilder.InsertData(
                table: "FAQ",
                columns: new[] { "Id", "answer", "question" },
                values: new object[] { 2, "Press the logout button.", "How can i sign out?" });

            migrationBuilder.InsertData(
                table: "FAQ",
                columns: new[] { "Id", "answer", "question" },
                values: new object[] { 3, "No.", "Does this FAQ answer any legitimate questions?" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FAQ");

            migrationBuilder.DropTable(
                name: "Question");
        }
    }
}
