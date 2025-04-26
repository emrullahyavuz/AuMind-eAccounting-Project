using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eMuhasebeServer.Infrastructure.Migrations.CompanyDb
{
    /// <inheritdoc />
    public partial class mg29 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_InvoicesDetails_ProductId",
                table: "InvoicesDetails",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoicesDetails_Product_ProductId",
                table: "InvoicesDetails",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoicesDetails_Product_ProductId",
                table: "InvoicesDetails");

            migrationBuilder.DropIndex(
                name: "IX_InvoicesDetails_ProductId",
                table: "InvoicesDetails");
        }
    }
}
