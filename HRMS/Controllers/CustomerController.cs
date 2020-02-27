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
    public class CustomerController : Controller
    {
        // GET: Customer
        Customer Obj_customer = new Customer();
        public ActionResult Index()
        {
            return View();
        }

       
        public JsonResult customer_List()
        {
            return Json(Obj_customer.Get_AllCustomer(1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_customer(Customer obj_CuInser)
        {
            return Json(Obj_customer.Insert_Customer(obj_CuInser), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_customer(Customer obj_CumUpd)
        {
            return Json(Obj_customer.Update_Customer(obj_CumUpd), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCustomerByID(int ID)
        {
            var CompanyID = Obj_customer.Get_AllCustomer(1).Find(x => x.CustomerId.Equals(ID));
            return Json(CompanyID, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Company(int ID)
        {
            return Json(Obj_customer.Delete_Customer(ID), JsonRequestBehavior.AllowGet);
        }
     
    }
}