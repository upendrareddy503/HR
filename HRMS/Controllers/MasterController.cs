using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using System.IO;
using System.Web.Helpers;

namespace HRMS.Controllers
{
    public class MasterController : Controller
    {

        #region Glodal Declaration #
        Division obj_Div = new Division();
        Group obj_Grp = new Group();
        Country obj_Con = new Country();
        Company Obj_comp = new Company();
        DepartmentDetails Obj_Dep = new DepartmentDetails();
        State obj_State = new State();
        Designation obj_Desgi = new Designation();
        Holidaydetails Obj_Holi = new Holidaydetails();
        #endregion #
        // GET: Master
        public ActionResult Index()
        {
            return View();
        }
        #region Divison
        public ActionResult Division()
        {
            return View();
        }

        public JsonResult Division_List()
        {

            return Json(obj_Div.Get_AllDivision(1,1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Division(Division obj_Div)
        {
            return Json(obj_Div.Insert_Division(obj_Div), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Division(Division obj_Div)
        {
            return Json(obj_Div.Update_Division(obj_Div), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDivisionByID(int ID)
        {
            var DivisionId = obj_Div.Get_AllDivision(1,1).Find(x => x.DivisionId.Equals(ID));
            return Json(DivisionId, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDivision_GID(int Id)
        {
            
            return Json(obj_Div.Get_AllDivision_GID(1, 1, Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Divsion(int ID)
        {
            return Json(obj_Div.Delete_Division(ID), JsonRequestBehavior.AllowGet);
        }
        #endregion Division

        #region Group
        public ActionResult Group()
        {
            return View();
        }
        public JsonResult Group_List()
        {
            return Json(obj_Grp.Get_AllGroup(1, 1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Group(Group obj_GrpIns)
        {
            return Json(obj_Grp.Insert_Group(obj_GrpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Group(Group obj_GrpUpd)
        {
            return Json(obj_Grp.Update_Group(obj_GrpUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGroupByID(int ID)
        {
            var GroupId = obj_Grp.Get_AllGroup(1, 1).Find(x => x.GroupId.Equals(ID));

            return Json(GroupId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Group(int ID)
        {
            return Json(obj_Grp.Delete_Group(ID, 1, 1), JsonRequestBehavior.AllowGet);
        }
        #endregion Group

        #region Country
        public ActionResult Country()
        {
            return View();
        }
        public JsonResult Country_List()
        {         
            return Json(obj_Con.Get_AllCountry(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Country(Country obj_CountryIns)
        {
            return Json(obj_Con.Insert_Country(obj_CountryIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Country(Country obj_CountryUpd)
        {
            return Json(obj_Con.Update_Country(obj_CountryUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCountryByID(int ID)
        {
            var CountryId = obj_Con.Get_AllCountry().Find(x => x.CountryId.Equals(ID));
            
            return Json(CountryId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Country(int ID)
        {
            return Json(obj_Con.Delete_Country(ID), JsonRequestBehavior.AllowGet);
        }
        #endregion Country

        #region Company
        public ActionResult Company()
        {
            return View();
        }
        public JsonResult Company_List()
        {
            return Json(Obj_comp.Get_AllCompany(1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Company(Company obj_ComInser)
        {
            return Json(Obj_comp.Insert_Company(obj_ComInser), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Company(Company obj_ComUpd)
        {
            return Json(Obj_comp.Update_Copmpany(obj_ComUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCompanyByID(int ID)
        {
            var CompanyID = Obj_comp.Get_AllCompany(1).Find(x => x.CompanyId.Equals(ID));
            return Json(CompanyID, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Company(int ID)
        {
            return Json(Obj_comp.Delete_Company(ID), JsonRequestBehavior.AllowGet);
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
                    var _comPath = Server.MapPath("/Images/User/User_") + _imgname + _ext;
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
        #endregion Company

        #region Department
        public ActionResult Department()
        {
            return View();
        }
        public JsonResult Department_List()
        {
            return Json(Obj_Dep.Get_AllDepartment(1,1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Department(DepartmentDetails Obj_Dep_Insert)
        {
            return Json(Obj_Dep.Insert_Department(Obj_Dep_Insert), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Department(DepartmentDetails Obj_Dep_Update)
        {
            return Json(Obj_Dep.Update_Department(Obj_Dep_Update), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDepartmentByID(int ID)
        {
            var CompanyID = Obj_Dep.Get_AllDepartment(1,1).Find(x => x.Department_Id.Equals(ID));
            return Json(CompanyID, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDepartment_ID(int Id)
        {
           
            return Json(Obj_Dep.Get_AllDepartment_ID(1, 1, Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Department(int ID)
        {
            return Json(Obj_Dep.Delete_Department(ID), JsonRequestBehavior.AllowGet);
        }
        #endregion Department

        #region Location
        Location Obj_loc_D = new Location();
        public ActionResult Location()
        {
            return View();
        }
        public JsonResult Location_List()
        {           
            return Json(Obj_loc_D.Get_Location(1,1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Location(Location obj_LocInser)
        {
            return Json(Obj_loc_D.Insert_Location(obj_LocInser), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Location(Location obj_locUpd)
        {
            return Json(Obj_loc_D.Update_Location(obj_locUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLocationByID(int ID)
        {                                 
            var LocationID = Obj_loc_D.Get_Location(1, 1).Find(x => x.Tli_Id.Equals(ID));
            return Json(LocationID, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Location(int ID)
        {
            return Json(Obj_loc_D.Delete_Location(ID, 1), JsonRequestBehavior.AllowGet);
        }
        #endregion Location


        #region State #
        public ActionResult State()
        {
            return View();
        }

        public JsonResult State_List()
        {
            return Json(obj_State.Get_AllState(1, 1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_State(State obj_Stt)
        {
            return Json(obj_Stt.Insert_State(obj_Stt), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_State(State obj_Stt)
        {
            return Json(obj_Stt.Update_State(obj_Stt), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStateByID(int ID)
        {
            var StateId = obj_State.Get_AllState(1, 1).Find(x => x.StateId.Equals(ID));
            return Json(StateId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_State(int ID)
        {
            return Json(obj_State.Delete_State(ID), JsonRequestBehavior.AllowGet);
        }
        #endregion #

        #region Designation #
        public ActionResult Designation()
        {
            return View();
        }

        public JsonResult Designation_List()
        {
            return Json(obj_Desgi.Get_AllDesignation(1, 1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Designation(Designation obj_Dig)
        {
            return Json(obj_Dig.Insert_Designation(obj_Dig), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Designation(Designation obj_Dig)
        {
            return Json(obj_Dig.Update_Designation(obj_Dig), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDesignationByID(int ID)
        {
            var DesignationId = obj_Desgi.Get_AllDesignation(1, 1).Find(x => x.DesignationId.Equals(ID));
            return Json(DesignationId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Designation(int ID)
        {
            return Json(obj_Desgi.Delete_Designation(ID), JsonRequestBehavior.AllowGet);
        }
        #endregion #



        #region Holiday
        public ActionResult Holiday()
        {
            return View();
        }

        public JsonResult Holiday_List()
        {
            return Json(Obj_Holi.Get_AllHolidays(1, 1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_HolidayName(Holidaydetails Obj_Holi)
        {
            return Json(Obj_Holi.Insert_HolidayName(Obj_Holi), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_HolidayName(Holidaydetails Obj_Holi)
        {
            return Json(Obj_Holi.Update_HolidayName(Obj_Holi), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetHolidayByID(int ID)
        {
            var holidayid = Obj_Holi.Get_AllHolidays(1, 1).Find(x => x.Thi_id.Equals(ID));
            return Json(holidayid, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Holiday(int ID)
        {
            return Json(Obj_Holi.Delete_Holiday(ID), JsonRequestBehavior.AllowGet);
        }
        #endregion Holiday
    }
}