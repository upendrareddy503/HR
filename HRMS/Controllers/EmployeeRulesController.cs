using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using System.Data;

namespace HRMS.Controllers
{
    public class EmployeeRulesController : Controller
    {
        // GET: EmployeeRules
        Emprulesdetails obj_Emprule = new Emprulesdetails();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            return Json(obj_Emprule.Get_AllEmpRules(1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmployeeIdwise(string Prefix )
        {
            return Json(obj_Emprule.Get_employeeidwise(Prefix), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDivision(int Id)
        {
            return Json(obj_Emprule.GetDivision(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Showdetails(Emprulesdetails obj_Emprule)
        {
            return Json(obj_Emprule.GetGroupByRules(obj_Emprule), JsonRequestBehavior.AllowGet);
        }
    }
}