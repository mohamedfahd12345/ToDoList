using System;
using System.Collections.Generic;

namespace WebApplication3.Models
{
    public partial class List
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int? Status { get; set; }
        public string? UserId { get; set; }
    }
}
