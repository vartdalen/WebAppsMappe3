using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppsMappe3.Models
{
	public class Question
	{
		public int Id { get; set; }

		public string question { get; set; }
		public string asker { get; set; }
		public string answer { get; set; }
		public string replier { get; set; }

		public int voteUp { get; set; }
		public int voteDown { get; set; }
	}
}
