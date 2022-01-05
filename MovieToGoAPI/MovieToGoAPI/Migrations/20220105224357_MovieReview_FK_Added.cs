using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieToGoAPI.Migrations
{
    public partial class MovieReview_FK_Added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieReviews_AspNetUsers_UserId",
                table: "MovieReviews");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "MovieReviews",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_MovieReviews_UserId",
                table: "MovieReviews",
                newName: "IX_MovieReviews_UserID");

            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                table: "MovieReviews",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieReviews_AspNetUsers_UserID",
                table: "MovieReviews",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieReviews_AspNetUsers_UserID",
                table: "MovieReviews");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "MovieReviews",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_MovieReviews_UserID",
                table: "MovieReviews",
                newName: "IX_MovieReviews_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "MovieReviews",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieReviews_AspNetUsers_UserId",
                table: "MovieReviews",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
