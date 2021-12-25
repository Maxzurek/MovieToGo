using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieToGoAPI.Migrations
{
    public partial class Movie_Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItem_WatchLists_WatchListId",
                table: "WatchListItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WatchListItem",
                table: "WatchListItem");

            migrationBuilder.RenameTable(
                name: "WatchListItem",
                newName: "WatchListItems");

            migrationBuilder.RenameIndex(
                name: "IX_WatchListItem_WatchListId",
                table: "WatchListItems",
                newName: "IX_WatchListItems_WatchListId");

            migrationBuilder.AddColumn<int>(
                name: "MovieId",
                table: "WatchListItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WatchListItems",
                table: "WatchListItems",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TheMovieDbApiId = table.Column<int>(type: "int", nullable: false),
                    VoteAverage = table.Column<int>(type: "int", nullable: true),
                    VoteCount = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WatchListItems_MovieId",
                table: "WatchListItems",
                column: "MovieId");

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItems_Movie_MovieId",
                table: "WatchListItems",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItems_WatchLists_WatchListId",
                table: "WatchListItems",
                column: "WatchListId",
                principalTable: "WatchLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItems_Movie_MovieId",
                table: "WatchListItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItems_WatchLists_WatchListId",
                table: "WatchListItems");

            migrationBuilder.DropTable(
                name: "Movie");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WatchListItems",
                table: "WatchListItems");

            migrationBuilder.DropIndex(
                name: "IX_WatchListItems_MovieId",
                table: "WatchListItems");

            migrationBuilder.DropColumn(
                name: "MovieId",
                table: "WatchListItems");

            migrationBuilder.RenameTable(
                name: "WatchListItems",
                newName: "WatchListItem");

            migrationBuilder.RenameIndex(
                name: "IX_WatchListItems_WatchListId",
                table: "WatchListItem",
                newName: "IX_WatchListItem_WatchListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WatchListItem",
                table: "WatchListItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItem_WatchLists_WatchListId",
                table: "WatchListItem",
                column: "WatchListId",
                principalTable: "WatchLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
