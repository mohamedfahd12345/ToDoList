using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models;
namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class listsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<List>> getall()
        {
           // checkuser();
            var db = new TODOLISTContext();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);// will give the user's userId
            var all_list = db.Lists.Where(x=>x.UserId==userId).ToList();
            return all_list;

        }

        [HttpPost]
        public ActionResult create(List list)
        {
          //  checkuser();
            var db = new TODOLISTContext();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            list.UserId = userId;
            db.Lists.Add(list);
            db.SaveChanges();
            return CreatedAtAction(nameof(create), new { id = list.Id }, list); //it return status code 201  Note ->this fun take 3 paramters

        }

        [HttpDelete("{id}")]
        public ActionResult delete(int id)
        {
           // checkuser();
            var db = new TODOLISTContext();
            var target_list = db.Lists.Where(x => x.Id == id).FirstOrDefault();
            if (target_list == null)
                return NotFound();
            db.Lists.Remove(target_list);
            db.SaveChanges();
            return NoContent();
        }

    }
}
