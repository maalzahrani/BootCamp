using System.ComponentModel.DataAnnotations;

namespace BootCamp.Models
{
    public class Employee
    { 
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }       
        public string? Position { get; set; }
        public decimal Salary { get; set; }
        public DateOnly? HireDate { get; set; }
        public string? Department { get; set; }
        [Required]
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        [Required]
        public string? username { get; set; }
        public string? password { get; set; }

    }
}
