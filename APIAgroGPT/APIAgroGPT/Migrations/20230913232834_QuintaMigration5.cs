using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIAgroGPT.Migrations
{
    /// <inheritdoc />
    public partial class QuintaMigration5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MLModelOutput",
                table: "MLModelOutput");

            migrationBuilder.RenameTable(
                name: "MLModelOutput",
                newName: "MLModelOutputs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MLModelOutputs",
                table: "MLModelOutputs",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MLModelOutputs",
                table: "MLModelOutputs");

            migrationBuilder.RenameTable(
                name: "MLModelOutputs",
                newName: "MLModelOutput");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MLModelOutput",
                table: "MLModelOutput",
                column: "Id");
        }
    }
}
