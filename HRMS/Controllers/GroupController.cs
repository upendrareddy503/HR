using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using System.Data;

namespace HRMS.Controllers
{
    public class GroupController : Controller
    {
         Group obj_Grp = new Group();
        // GET: Administration
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(obj_Grp.Get_AllGroup(Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"]), Convert.ToInt32(Session["userid"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Group(Group obj_GrpIns)
        {
            obj_GrpIns.CompanyID = Convert.ToInt32(Session["companyid"]);
            obj_GrpIns.LocationID = Convert.ToInt32(Session["LocationID"]);
            obj_GrpIns.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Grp.Insert_Group(obj_GrpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Group(Group obj_GrpUpd)
        {
            obj_GrpUpd.CompanyID = Convert.ToInt32(Session["companyid"]);
            obj_GrpUpd.LocationID = Convert.ToInt32(Session["LocationID"]);
            obj_GrpUpd.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Grp.Update_Group(obj_GrpUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetByID(int ID)
        {
            var GroupId = obj_Grp.Get_AllGroup(Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"]), Convert.ToInt32(Session["userid"])).Find(x => x.GroupId.Equals(ID));

            return Json(GroupId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Group(int ID)
        {
            return Json(obj_Grp.Delete_Group(ID, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }

    }
}