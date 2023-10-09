using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIAgroGPT.Migrations
{
    /// <inheritdoc />
    public partial class OutputMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Autor",
                table: "MLModelOutputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Data",
                table: "MLModelOutputs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "MLModelOutputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Autor",
                table: "MLModelOutputs");

            migrationBuilder.DropColumn(
                name: "Data",
                table: "MLModelOutputs");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "MLModelOutputs");
        }
    }
}
