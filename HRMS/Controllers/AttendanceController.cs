using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;

namespace HRMS.Controllers
{
    public class AttendanceController : Controller
    {
        Shift obj_Shift = new Shift();
        // GET: Attendance
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ShiftGroup()
        {
            return View();
        }
        public JsonResult Insert_Shift(Shift obj_Shift)
        {
            return Json(obj_Shift.Insert_Shift(obj_Shift), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_Shift(Shift obj_Shift)
        {
            return Json(obj_Shift.Update_Shift(obj_Shift), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Shift_List()
        {
            return Json(obj_Shift.GetAllShifts(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShiftByID(int ID)
        {
            var ShiftId = obj_Shift.GetAllShifts().Find(x => x.ShiftID.Equals(ID));

            return Json(ShiftId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Shift(int ID)
        {
            return Json(obj_Shift.Delete_Shift(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShift_Details()
        {
            return Json(obj_Shift.GetDetails_Shift(), JsonRequestBehavior.AllowGet);
        }

        LeaveGroup obj_Leave = new LeaveGroup();
        public ActionResult LeaveGroup()
        {
            return View();
        }
        public JsonResult Insert_Leave(LeaveGroup obj_Leave)
        {
            return Json(obj_Leave.Insert_Leaves(obj_Leave), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_Leave(LeaveGroup obj_Leave)
        {
            return Json(obj_Leave.Update_Leaves(obj_Leave), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Leave_List()
        {
            return Json(obj_Leave.GetAllLeaves(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLeaveByID(int ID)
        {
            var LeaveId = obj_Leave.GetAllLeaves().Find(x => x.LId.Equals(ID));

            return Json(LeaveId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Leave(int ID)
        {
            return Json(obj_Leave.Delete_Leave(ID), JsonRequestBehavior.AllowGet);
        }

        Rules Obj_rules = new Rules();
        public JsonResult Get_Rules()
        {
            return Json(Obj_rules.GetDetails_Rules(), JsonRequestBehavior.AllowGet);
        }

    }
}