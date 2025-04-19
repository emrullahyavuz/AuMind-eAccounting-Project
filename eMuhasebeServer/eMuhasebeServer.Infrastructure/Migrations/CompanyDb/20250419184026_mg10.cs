using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eMuhasebeServer.Infrastructure.Migrations.CompanyDb
{
    /// <inheritdoc />
    public partial class mg10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CashRegisterDetails_CashRegisters_CashRegisterDetailId",
                table: "CashRegisterDetails");

            migrationBuilder.DropIndex(
                name: "IX_CashRegisterDetails_CashRegisterDetailId",
                table: "CashRegisterDetails");

            migrationBuilder.DropColumn(
                name: "CashRegisterDetailId",
                table: "CashRegisterDetails");

            migrationBuilder.CreateIndex(
                name: "IX_CashRegisterDetails_CashRegisterId",
                table: "CashRegisterDetails",
                column: "CashRegisterId");

            migrationBuilder.AddForeignKey(
                name: "FK_CashRegisterDetails_CashRegisters_CashRegisterId",
                table: "CashRegisterDetails",
                column: "CashRegisterId",
                principalTable: "CashRegisters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CashRegisterDetails_CashRegisters_CashRegisterId",
                table: "CashRegisterDetails");

            migrationBuilder.DropIndex(
                name: "IX_CashRegisterDetails_CashRegisterId",
                table: "CashRegisterDetails");

            migrationBuilder.AddColumn<Guid>(
                name: "CashRegisterDetailId",
                table: "CashRegisterDetails",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CashRegisterDetails_CashRegisterDetailId",
                table: "CashRegisterDetails",
                column: "CashRegisterDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_CashRegisterDetails_CashRegisters_CashRegisterDetailId",
                table: "CashRegisterDetails",
                column: "CashRegisterDetailId",
                principalTable: "CashRegisters",
                principalColumn: "Id");
        }
    }
}
