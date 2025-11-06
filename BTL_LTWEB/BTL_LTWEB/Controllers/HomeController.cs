using System.Diagnostics;
using BTL_LTWEB.Models;
using Microsoft.AspNetCore.Mvc;

namespace BTL_LTWEB.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
