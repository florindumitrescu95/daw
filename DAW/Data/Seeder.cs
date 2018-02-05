using DAW.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAW.Data
{
    public class Seeder
    {
        private readonly AppDbContext _ctx;
        private readonly UserManager<User> _userManager;

        public Seeder(AppDbContext ctx,
            UserManager<User> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        public async Task Seed()
        {
            _ctx.Database.EnsureCreated();

            var user = await _userManager.FindByEmailAsync("geani.turtucaia@gmail.com");
            var userBasic = await _userManager.FindByEmailAsync("florin.dumitrescu@gmail.com");

            if (userBasic == null)
            {
                userBasic = new User()
                {
                    FirstName = "Florin",
                    LastName = "Dumitrescu",
                    UserName = "florin.dumitrescu@gmail.com",
                    Email = "florin.dumitrescu@gmail.com"
                };
            }

            var resultBasic = await _userManager.CreateAsync(userBasic, "P@ssw0rd!");

            if (user == null)
            {
                user = new User()
                {
                    FirstName = "Geani",
                    LastName = "Turtucaia",
                    UserName = "geani.turtucaia@gmail.com",
                    Email = "geani.turtucaia@gmail.com"
                };
            }

            var result = await _userManager.CreateAsync(user, "P@ssw0rd!");

            if(result != IdentityResult.Success)
            {
                throw new InvalidOperationException("N-am reusit sa creez userul...");
            }

            _ctx.SaveChanges();
        }
    }
}
