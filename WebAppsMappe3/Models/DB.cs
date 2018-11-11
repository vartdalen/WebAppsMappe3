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
		public DbSet<FAQ> FAQ { get; set; }
		public DbSet<Question> Question { get; set; }

		public DB(DbContextOptions<DB> options) : base(options) {
			Database.EnsureCreated();
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<FAQ>().HasData(
				new FAQ
				{
					Id = 1,
					question = "How do i create a user?",
					answer = "Click the sign up button in the upper right corner of the screen."
				},
				new FAQ
				{
					Id = 2,
					question = "How can i sign out?",
					answer = "Press the logout button."
				},
				new FAQ
				{
					Id = 3,
					question = "Does this FAQ answer any legitimate questions?",
					answer = "No."
				}
			);
		}
	}
}
