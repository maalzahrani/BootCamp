using System.ComponentModel.DataAnnotations;

namespace BootCamp.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string? Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        // Foreign key to Employee
        public int? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        // Foreign key to Category
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

    }
}
