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
    public class DefaultController : Controller
    {
        EmployeeDetails ob_lg = new EmployeeDetails();
        // GET: Default
        public ActionResult Index()
        {
            //Obj_Grp.GetVoucherFileUp();
            return View();
        }
        public JsonResult Login(EmployeeDetails obj_Login)
        {
            ob_lg = ob_lg.GetLogin(obj_Login);
            if (ob_lg.UserID != 0 && ob_lg.UserID != null)
            {
                Session["userid"] = ob_lg.UserID;
                Session["companyid"] = ob_lg.CompanyID;
                Session["LocationID"] = ob_lg.LocationID;

                Session["Username"] = ob_lg.Tei_FirstName;

            }
            return Json(ob_lg, JsonRequestBehavior.AllowGet);
        }
        public JsonResult checkSession()
        {
            bool sessionValue;
            if (Session["userid"] != null)
            {
                sessionValue = true;
            }
            else
            {
                sessionValue = false;

            }
            string CompnayId = (Session["companyid"] == null) ? "" : Session["companyid"].ToString();
            string LocationId= (Session["LocationID"] == null) ? "" : Session["LocationID"].ToString();
            string UserId= (Session["userid"] == null) ? "" : Session["userid"].ToString();
            string UserName= (Session["Username"] == null) ? "" : Session["Username"].ToString();
            string str = sessionValue.ToString() + "-" + CompnayId + "-" + UserId + "-" + LocationId + "-" + UserName;
            return Json(str, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Logout()
        {
            Session.Clear();
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}