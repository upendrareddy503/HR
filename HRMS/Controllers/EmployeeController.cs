using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using System.Data;
using System.IO;
using System.Web.Helpers;



namespace HRMS.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeDetails obj_Emp = new EmployeeDetails();
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult Insert_Employee(EmployeeDetails obj_EmpIns)
        {
            return Json(obj_Emp.Insert_Employee(obj_EmpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Next_Employee(EmployeeDetails obj_EmpIns)
        {
            return Json(obj_Emp.Next_Employee(obj_EmpIns), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UploadFile()
        {
            string _imgname = string.Empty;
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pic = System.Web.HttpContext.Current.Request.Files["MyImages"];
                if (pic.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(pic.FileName);
                    var _ext = Path.GetExtension(pic.FileName);

                    _imgname = "1";//WebSecurity.CurrentUserId.ToString();
                    var _comPath = Server.MapPath("/Images/Emp/User_") + _imgname + _ext;
                    _imgname = "User_" + _imgname + _ext;

                    ViewBag.Msg = _comPath;
                    var path = _comPath;

                    // Saving Image in Original Mode
                    pic.SaveAs(path);

                    // resizing image
                    MemoryStream ms = new MemoryStream();
                    WebImage img = new WebImage(_comPath);

                    if (img.Width > 200)
                        img.Resize(200, 200);
                    img.Save(_comPath);
                    // end resize

                    //var data = Uow.UserProfile.GetByID(WebSecurity.CurrentUserId);
                    //data.ImageUrl = "/Images/User/" + _imgname;
                    //Uow.UserProfile.Update(data);
                    //Uow.Save();
                }
            }
            return Json(Convert.ToString(_imgname), JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetAllowances(Allowance obj_Allw)
        //{
        //    return Json();
        //}

    }
}