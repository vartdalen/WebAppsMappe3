using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WebAppsMappe3.Models
{
	public class DB : DbContext
	{
		public DB(DbContextOptions<DB> options) : base(options) { }

		public DbSet<FAQ> FAQ { get; set; }
		public DbSet<Question> Question { get; set; }
	}
}
