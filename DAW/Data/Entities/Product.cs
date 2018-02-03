using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data.Entities
{
  public class Product
  {
    public int Id { get; set; }
    public string Gender { get; set; }
    public decimal Price { get; set; }
    public string Title { get; set; }
    public string AlbumTitle { get; set; }
    public string AlbumDescription { get; set; }
  }
}
