using BTL_LTWEB.Data;
using BTL_LTWEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BTL_LTWEB.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult index()
        {
            ViewData["Title"] = "Trang Chủ";
            return View();
        }

        [Route("chitietsanpham")]
        public IActionResult chitietsanpham()
        {
            ViewData["Title"] = "Chi Tiết Sản Phẩm";
            return View();
        }
        [Route("giohang")]
        public IActionResult giohang()
        {
            ViewData["Title"] = "Giỏ hàng";
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet("api/products")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Promo)
                .Include(p => p.Detail)
                .ToListAsync();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                MaxDepth = 64  // Tăng nếu cần
            };
            return Json(products, options);
        }


        [HttpGet("api/products/{masp}")]
        public async Task<IActionResult> GetProduct(string masp)
        {
            var product = await _context.Products.Include(p => p.Promo).Include(p => p.Detail)
                .FirstOrDefaultAsync(p => p.Masp == masp);
            return product != null ? Json(product) : NotFound();
        }
        // Tương tự cho User, Cart nếu cần (e.g., lưu cart vào DB nếu user login)
        [HttpPost("api/cart/add")]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            // Logic thêm vào cart (nếu lưu DB)
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
