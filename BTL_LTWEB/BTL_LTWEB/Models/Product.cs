using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BTL_LTWEB.Models
{
    [Table("SanPham")]
    public class Product
    {
        [Key]
        [Column("MaSP")]
        public string? Masp { get; set; }

        [Column("TenSP")]
        public string? Name { get; set; }

        [Column("HangSX")]
        public string? Company { get; set; }

        [Column("HinhAnh")]
        public string? Img { get; set; }

        [Column("Gia")]
        public string? Price { get; set; }
           
        [Column("Sao")]
        public double Star { get; set; }

        [Column("SoDanhGia")]
        public int RateCount { get; set; }

        public Promo? Promo { get; set; }
        public ProductDetail? Detail { get; set; }
    }

    [Table("KhuyenMai")]
    public class Promo
    {
        [Key]
        [Column("MaSP")]
        public string? Masp { get; set; }

        [Column("TenKM")]
        public string? Name { get; set; }

        [Column("GiaTri")]
        public string? Value { get; set; }

        // FK reference
        [ForeignKey("Masp")]
        public Product? Product { get; set; }
    }

    [Table("ChiTietSanPham")]
    public class ProductDetail
    {
        [Key]
        [Column("MaSP")]
        public string? Masp { get; set; }

        [Column("ManHinh")]
        public string? Screen { get; set; }

        [Column("CameraSau")]
        public string? Camera { get; set; }

        [Column("CameraTruoc")]
        public string? CameraFront { get; set; }
                
        [Column("CPU")]
        public string? Cpu { get; set; }

        [Column("RAM")]
        public string? Ram { get; set; }

        [Column("ROM")]
        public string? Rom { get; set; }

        [Column("ChongNuoc")]
        public string? WaterProof { get; set; }

        [Column("Pin")]
        public string? Battery { get; set; }
           
        // FK reference
        [ForeignKey("Masp")]
        public Product? Product { get; set; }
    }

    
    public class User
    {
        [Key]
        public string? Username { get; set; }
        public string? Pass { get; set; }
        public string? Ho { get; set; }
        public string? Ten { get; set; }
        public string? Email { get; set; }
        public List<CartItem> Products { get; set; } = new();
        public List<Order> Donhang { get; set; } = new();
    }

    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public string? Masp { get; set; }
        public int Soluong { get; set; }
        public DateTime Date { get; set; }
        public string? Username { get; set; }
        public User? User { get; set; }
    }

    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public List<CartItem> Items { get; set; } = new();
        public DateTime OrderDate { get; set; }
    }
}