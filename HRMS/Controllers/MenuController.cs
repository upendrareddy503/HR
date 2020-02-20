using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using System.Data;
using HRMS.Models;

namespace HRMS.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        Menudetails obj_menu = new Menudetails();
        SubMenudetails obj_SMenu = new SubMenudetails();

        #region Menu
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Menu_List()
        {
            return Json(obj_menu.Get_AllMenulist(1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_Menu(Menudetails obj_menu)
        {
            return Json(obj_menu.Insert_Menu(obj_menu), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_Menu(Menudetails obj_menu)
        {
            return Json(obj_menu.Update_Menu(obj_menu), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMenuByID(int ID)
        {
            var MenuId = obj_menu.Get_AllMenulist(1).Find(x => x.TxnId.Equals(ID));
            return Json(MenuId, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Menu(int Id)
        {
            return Json(obj_menu.Delete_Menu(Id), JsonRequestBehavior.AllowGet);
        }

        #endregion Menu

        #region Submenu
        public ActionResult SubMenu()
        {
            return View();
        }
        public JsonResult SubMenu_List()
        {
            return Json(obj_SMenu.Get_AllSubMenuList(1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_SubMenu(SubMenudetails obj_SMenu)
        {
            return Json(obj_SMenu.Insert_SubMenu(obj_SMenu), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_SubMenu(SubMenudetails obj_SMenu)
        {
            return Json(obj_SMenu.Update_SubMenu(obj_SMenu), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSubMenuByID(int ID)
        {
            var Submenuid = obj_SMenu.Get_AllSubMenuList(1).Find(x => x.TxnId.Equals(ID));
            return Json(Submenuid, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_SubMenu(int ID)
        {
            return Json(obj_SMenu.Delete_SubMenu(ID), JsonRequestBehavior.AllowGet);
        }


        #endregion Submenu


        // AccordionMenu
        public ActionResult GetAccordionMenu()
        {
            Menudetails mm = new Menudetails();
            SubMenudetails mm1 = new SubMenudetails();
            List<Menudetails> accList = new List<Menudetails>();

            try
            {
                               

                    //Get categories
                    var qCategory = mm.Get_AllMenulist(1);
                    foreach (var cat in qCategory)
                    {
                        mm = new Menudetails();
                        mm.Description = Convert.ToString(cat.Description);

                        List<SubMenudetails> sclist = new List<SubMenudetails>();
                        mm.SubMenudetails = sclist;

                    //Get subcategories
                    var qSubcategory = mm1.Get_AllSubMenuList_id(cat.TxnId);
                        foreach (var subcat in qSubcategory)
                        {
                            SubMenudetails sc = new SubMenudetails()
                            {
                                TxnId = Convert.ToInt32(subcat.TxnId),
                                MenuName = Convert.ToString(subcat.Url_Name)
                            };

                            mm.SubMenudetails.Add(sc);
                        }
                        accList.Add(mm);
                    }


                
            }
            catch (Exception ex)
            {
                ViewBag.FormMessage = ex.Message;
                ViewBag.AlertType = "alert-danger";
                ViewBag.FormStatus = "Warning:";
            }

            mm.accList = accList;
            Menu li_menu = new Menu();
            li_menu.accList = accList;
            return PartialView("_vpAccordion", li_menu);

        }
    }

}