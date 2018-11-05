using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppsMappe3.Models;

namespace WebAppsMappe3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FAQsController : ControllerBase
    {
        private readonly DB _context;

        public FAQsController(DB context)
        {
            _context = context;
        }

        // GET: api/FAQs
        [HttpGet]
        public IEnumerable<FAQ> GetFAQ()
        {
            return _context.FAQ;
        }

        // GET: api/FAQs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFAQ([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var faq = await _context.FAQ.FindAsync(id);

            if (faq == null)
            {
                return NotFound();
            }
            return Ok(faq);
        }

        // PUT: api/FAQs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFAQ([FromRoute] int id, [FromBody] FAQ faq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != faq.Id)
            {
                return BadRequest();
            }
            _context.Entry(faq).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FAQExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/FAQs
        [HttpPost]
        public async Task<IActionResult> PostFAQ([FromBody] FAQ faq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.FAQ.Add(faq);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetFAQ", new { id = faq.Id }, faq);
        }

        // DELETE: api/FAQs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFAQ([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var faq = await _context.FAQ.FindAsync(id);
            if (faq == null)
            {
                return NotFound();
            }
            _context.FAQ.Remove(faq);
            await _context.SaveChangesAsync();
            return Ok(faq);
        }

        private bool FAQExists(int id)
        {
            return _context.FAQ.Any(e => e.Id == id);
        }
    }
}