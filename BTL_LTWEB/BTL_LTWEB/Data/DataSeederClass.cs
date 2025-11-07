using BTL_LTWEB.Data;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace BTL_LTWEB.Data
{
    public static class DataSeeder
    {
        public static void Seed(this ApplicationDbContext context)
        {
            if (context.Products.Any())
                return;

            var sqlPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "data", "BanDienThoai.sql");

            if (!File.Exists(sqlPath))
            {
                throw new FileNotFoundException("File BanDienThoai.sql không tìm thấy!", sqlPath);
            }

            // Đọc nội dung file SQL
            var sqlScript = File.ReadAllText(sqlPath);

            // Chạy script SQL để insert dữ liệu
            context.Database.ExecuteSqlRaw(sqlScript);
        }
    }
}