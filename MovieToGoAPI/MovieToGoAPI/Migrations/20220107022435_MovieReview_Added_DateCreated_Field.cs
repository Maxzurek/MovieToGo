﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieToGoAPI.Migrations
{
    public partial class MovieReview_Added_DateCreated_Field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "MovieReviews",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "MovieReviews");
        }
    }
}
