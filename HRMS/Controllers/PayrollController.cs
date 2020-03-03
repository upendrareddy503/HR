using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;

namespace HRMS.Controllers
{
    public class PayrollController : Controller
    {
        Allowance obj_Allw = new Allowance();
        public ActionResult Allowance()
        {
            return View();
        }
        public JsonResult Insert_Allowance(Allowance obj_Allw)
        {
            obj_Allw.UserID= Convert.ToInt32(Session["userid"]);
            return Json(obj_Allw.Insert_Allowances(obj_Allw), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_Allowance(Allowance obj_Allw)
        {
            obj_Allw.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Allw.Update_Allowances(obj_Allw), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Allowance_List(int Id)
        {
            return Json(obj_Allw.Get_AllAllowance(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Allowance_List_All()
        {
            return Json(obj_Allw.Get_AllAllowance(Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllowanceByID(int ID)
        {            
            return Json(obj_Allw.Get_Allowance(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Allowance(int Id)
        {
            return Json(obj_Allw.Delete_Allowance(Id, 1,1,1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAlwByAddition(Allowance obj_Allw)
        {
            return Json(obj_Allw.GetAlwByAddition(obj_Allw), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_Dropdown(int ID)
        {
            return Json(obj_Allw.Get_Droupdwon(ID, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
    }
}