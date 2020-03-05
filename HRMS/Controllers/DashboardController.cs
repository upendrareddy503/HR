using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data.SqlClient;
using System.Configuration;
using BLL;

namespace HRMS.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        EmployeeDetails obj_Emp = new EmployeeDetails();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult profile()
        {
            return View();
        }
        public JsonResult profile_Details()
        {
            return Json(obj_Emp.Get_Dashboard_profile(Convert.ToInt32(Session["userid"])), JsonRequestBehavior.AllowGet);
        }


    }
}