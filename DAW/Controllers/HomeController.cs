using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DAW.Data;
using DAW.Data.Entities;

namespace DAW.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;

        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Home
        public async Task<IActionResult> Index()
        {
            return View(await _context.Products.OrderByDescending(m => m.Id).Take(6).ToListAsync());
        }

        public async Task<IActionResult> Search()
        {
            return View(await _context.Products.OrderByDescending(m => m.Id).ToListAsync());
        }

        public async Task<IActionResult> SearchByGenre(string genre)
        {
            return View(await _context.Products.Where(m=> m.Gender.ToLower() == genre.ToLower()).ToListAsync());
        }

        public async Task<IActionResult> SearchByArtist(string artist)
        {
            return View(await _context.Products.Where(m => m.Title.ToLower() == artist.ToLower()).ToListAsync());
        }

    }
}
