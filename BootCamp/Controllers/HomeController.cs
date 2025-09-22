using BootCamp.Data;
using BootCamp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Threading.Tasks;

namespace BootCamp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _context;

        public HomeController(ILogger<HomeController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {            
            var employeeCount = await _context.Employees.CountAsync();
            var productCount = await _context.Products.CountAsync();
            var categorieCount = await _context.Categories.CountAsync();


            ViewBag.EmployeeCount = employeeCount;
            ViewBag.ProductCount = productCount;
            ViewBag.CategorieCount = categorieCount;           

            return View();
        }

        public async Task<IActionResult> Product()
        {
            var allProducts = _context.Products.Include(p => p.Employee).Include(p => p.Category).ToList();
            var filteredProducts = allProducts.Where(p => p.Price < 100).ToList();

            ViewBag.FilteredProducts = filteredProducts;
            ViewBag.EmployeeId = new SelectList(_context.Employees, "EmployeeId", "Name");
            ViewBag.CategoryId = new SelectList(_context.Categories, "CategoryId", "Name");
            ViewBag.productcount = allProducts.Count;
            ViewBag.filterproduct = filteredProducts.Count;

            return View(allProducts);
        } 

        public async Task<IActionResult> Private()
        {
            var employeeCount = await _context.Employees.CountAsync();
            var productCount = await _context.Products.CountAsync();
            var categorieCount = await _context.Categories.CountAsync();

            ViewBag.EmployeeCount = employeeCount;
            ViewBag.ProductCount = productCount;
            ViewBag.CategorieCount = categorieCount;

            var viewModel = new DashboardViewModel
            {
                TopEmployees = _context.Employees
             .OrderByDescending(e => e.Salary)
             .Take(4)
             .ToList(),

                TopProducts = _context.Products
             .OrderByDescending(p => p.Price)
             .Take(4)
             .ToList()
            };

            return View(viewModel);
        }


        public async Task<IActionResult> Employee()
        {
            var itEmployees = _context.Employees.Where(e => e.Department == "IT").ToList();

            ViewBag.EmployeeId = new SelectList(itEmployees, "EmployeeId", "Name");

            return View(await _context.Employees.ToListAsync());
        }


        public async Task<IActionResult> Category()
        {
            var categorieCount = await _context.Categories.CountAsync();
            ViewBag.CategorieCount = categorieCount;

            return View(await _context.Categories.ToListAsync());
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}