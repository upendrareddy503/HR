using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data.SqlClient;
using System.Configuration;

namespace HRMS.Controllers
{
    public class DefaultController : Controller
    {
        // GET: Default
        public ActionResult Index()

        {
            //Obj_Grp.GetVoucherFileUp();
            return View();
        }
    }
}