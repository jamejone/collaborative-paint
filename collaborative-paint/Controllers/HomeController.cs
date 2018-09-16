using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using collaborative_paint.Models;
using Microsoft.AspNetCore.Mvc;

namespace collaborative_paint.Controllers
{
    [Route("/")]
    [ApiController]
    public class HomeController : Controller
    {
        private IStrokeHistoryManager _strokeHistoryManager;

        public HomeController(IStrokeHistoryManager strokeHistoryManager)
        {
            _strokeHistoryManager = strokeHistoryManager;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View(_strokeHistoryManager);
        }
    }
}