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
        int CompanyId, LocationId, UserId;

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            return Json(obj_Emprule.Get_AllEmpRules(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmployeeIdwise(string Prefix)
        {           
            return Json(obj_Emprule.Get_employeeidwise(Prefix, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmployeeNamewise(string Prefix)
        {            
            return Json(obj_Emprule.Get_employeeNamewise(Prefix, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDepartment(int Id)
        {
            return Json(obj_Emprule.GetDepartment(Id, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"]), Convert.ToInt32(Session["userid"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Showdetails(Emprulesdetails obj_Emprule)
        {
            return Json(obj_Emprule.GetGroupByRules(obj_Emprule), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShowDeptdetails(Emprulesdetails obj_Emprule)
        {
            return Json(obj_Emprule.GetDeptByRules(obj_Emprule), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShowEmployeedetails(Emprulesdetails obj_Emprule)
        {
            return Json(obj_Emprule.GetEmployeeByRules(obj_Emprule), JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveRules(Emprulesdetails obj_Emprule)
        {
            obj_Emprule.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Emprule.SaveRules(obj_Emprule), JsonRequestBehavior.AllowGet);
        }
    }
}