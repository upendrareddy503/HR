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
            return Json(obj_Grp.Get_AllGroup(1,1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Group(Group obj_GrpIns)
        {
            return Json(obj_Grp.Insert_Group(obj_GrpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Group(Group obj_GrpUpd)
        {
            return Json(obj_Grp.Update_Group(obj_GrpUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetByID(int ID)
        {
            var GroupId = obj_Grp.Edit_Group(ID, 1,1);
           
            return Json(GroupId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Group(int ID)
        {
            return Json(obj_Grp.Delete_Group(ID, 1, 1), JsonRequestBehavior.AllowGet);
        }

    }
}