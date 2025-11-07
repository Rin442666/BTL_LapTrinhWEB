using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BTL_LTWEB.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchemaToMatchSQL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Products_Masp",
                table: "ProductDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Promos_Products_Masp",
                table: "Promos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Promos",
                table: "Promos");

            migrationBuilder.DropIndex(
                name: "IX_Promos_Masp",
                table: "Promos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductDetails",
                table: "ProductDetails");

            migrationBuilder.DropIndex(
                name: "IX_ProductDetails_Masp",
                table: "ProductDetails");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Promos");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProductDetails");

            migrationBuilder.RenameTable(
                name: "Promos",
                newName: "KhuyenMai");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "SanPham");

            migrationBuilder.RenameTable(
                name: "ProductDetails",
                newName: "ChiTietSanPham");

            migrationBuilder.RenameColumn(
                name: "Masp",
                table: "KhuyenMai",
                newName: "MaSP");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "KhuyenMai",
                newName: "GiaTri");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "KhuyenMai",
                newName: "TenKM");

            migrationBuilder.RenameColumn(
                name: "Masp",
                table: "SanPham",
                newName: "MaSP");

            migrationBuilder.RenameColumn(
                name: "Star",
                table: "SanPham",
                newName: "Sao");

            migrationBuilder.RenameColumn(
                name: "RateCount",
                table: "SanPham",
                newName: "SoDanhGia");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "SanPham",
                newName: "Gia");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SanPham",
                newName: "TenSP");

            migrationBuilder.RenameColumn(
                name: "Img",
                table: "SanPham",
                newName: "HinhAnh");

            migrationBuilder.RenameColumn(
                name: "Company",
                table: "SanPham",
                newName: "HangSX");

            migrationBuilder.RenameColumn(
                name: "Rom",
                table: "ChiTietSanPham",
                newName: "ROM");

            migrationBuilder.RenameColumn(
                name: "Ram",
                table: "ChiTietSanPham",
                newName: "RAM");

            migrationBuilder.RenameColumn(
                name: "Masp",
                table: "ChiTietSanPham",
                newName: "MaSP");

            migrationBuilder.RenameColumn(
                name: "Cpu",
                table: "ChiTietSanPham",
                newName: "CPU");

            migrationBuilder.RenameColumn(
                name: "WaterProof",
                table: "ChiTietSanPham",
                newName: "ChongNuoc");

            migrationBuilder.RenameColumn(
                name: "Screen",
                table: "ChiTietSanPham",
                newName: "ManHinh");

            migrationBuilder.RenameColumn(
                name: "CameraFront",
                table: "ChiTietSanPham",
                newName: "CameraTruoc");

            migrationBuilder.RenameColumn(
                name: "Camera",
                table: "ChiTietSanPham",
                newName: "CameraSau");

            migrationBuilder.RenameColumn(
                name: "Battery",
                table: "ChiTietSanPham",
                newName: "Pin");

            migrationBuilder.AlterColumn<float>(
                name: "Sao",
                table: "SanPham",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhuyenMai",
                table: "KhuyenMai",
                column: "MaSP");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SanPham",
                table: "SanPham",
                column: "MaSP");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietSanPham",
                table: "ChiTietSanPham",
                column: "MaSP");

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietSanPham_SanPham_MaSP",
                table: "ChiTietSanPham",
                column: "MaSP",
                principalTable: "SanPham",
                principalColumn: "MaSP",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMai_SanPham_MaSP",
                table: "KhuyenMai",
                column: "MaSP",
                principalTable: "SanPham",
                principalColumn: "MaSP",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietSanPham_SanPham_MaSP",
                table: "ChiTietSanPham");

            migrationBuilder.DropForeignKey(
                name: "FK_KhuyenMai_SanPham_MaSP",
                table: "KhuyenMai");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SanPham",
                table: "SanPham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KhuyenMai",
                table: "KhuyenMai");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietSanPham",
                table: "ChiTietSanPham");

            migrationBuilder.RenameTable(
                name: "SanPham",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "KhuyenMai",
                newName: "Promos");

            migrationBuilder.RenameTable(
                name: "ChiTietSanPham",
                newName: "ProductDetails");

            migrationBuilder.RenameColumn(
                name: "MaSP",
                table: "Products",
                newName: "Masp");

            migrationBuilder.RenameColumn(
                name: "TenSP",
                table: "Products",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "SoDanhGia",
                table: "Products",
                newName: "RateCount");

            migrationBuilder.RenameColumn(
                name: "Sao",
                table: "Products",
                newName: "Star");

            migrationBuilder.RenameColumn(
                name: "HinhAnh",
                table: "Products",
                newName: "Img");

            migrationBuilder.RenameColumn(
                name: "HangSX",
                table: "Products",
                newName: "Company");

            migrationBuilder.RenameColumn(
                name: "Gia",
                table: "Products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "MaSP",
                table: "Promos",
                newName: "Masp");

            migrationBuilder.RenameColumn(
                name: "TenKM",
                table: "Promos",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "GiaTri",
                table: "Promos",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "ROM",
                table: "ProductDetails",
                newName: "Rom");

            migrationBuilder.RenameColumn(
                name: "RAM",
                table: "ProductDetails",
                newName: "Ram");

            migrationBuilder.RenameColumn(
                name: "CPU",
                table: "ProductDetails",
                newName: "Cpu");

            migrationBuilder.RenameColumn(
                name: "MaSP",
                table: "ProductDetails",
                newName: "Masp");

            migrationBuilder.RenameColumn(
                name: "Pin",
                table: "ProductDetails",
                newName: "Battery");

            migrationBuilder.RenameColumn(
                name: "ManHinh",
                table: "ProductDetails",
                newName: "Screen");

            migrationBuilder.RenameColumn(
                name: "ChongNuoc",
                table: "ProductDetails",
                newName: "WaterProof");

            migrationBuilder.RenameColumn(
                name: "CameraTruoc",
                table: "ProductDetails",
                newName: "CameraFront");

            migrationBuilder.RenameColumn(
                name: "CameraSau",
                table: "ProductDetails",
                newName: "Camera");

            migrationBuilder.AlterColumn<int>(
                name: "Star",
                table: "Products",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Promos",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProductDetails",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Masp");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Promos",
                table: "Promos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductDetails",
                table: "ProductDetails",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Promos_Masp",
                table: "Promos",
                column: "Masp",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetails_Masp",
                table: "ProductDetails",
                column: "Masp",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Products_Masp",
                table: "ProductDetails",
                column: "Masp",
                principalTable: "Products",
                principalColumn: "Masp",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Promos_Products_Masp",
                table: "Promos",
                column: "Masp",
                principalTable: "Products",
                principalColumn: "Masp",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
