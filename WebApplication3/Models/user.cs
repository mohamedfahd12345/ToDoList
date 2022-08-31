using System;
using System.Collections.Generic;

namespace WebApplication3.Models
{
    public partial class User
    {
        public string Id { get; set; } = null!;
        public string? Email { get; set; }
        public string? Name { get; set; }
    }
}
