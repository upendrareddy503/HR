using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace HRMS.Controllers
{
    public class RulesController : Controller
    {
        // GET: Rules
        Attnrulesdetails obj_attnrules = new Attnrulesdetails();
        CompanyRuleDetails obj_comprule = new CompanyRuleDetails();
        // GET: Difrules regweion for attn rules
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult AttnRuleList()
        {
            return Json(obj_attnrules.Get_AllAtnruleList(7), JsonRequestBehavior.AllowGet);
        }


        public JsonResult Insert_AttnRules(Attnrulesdetails obj_attnrules)
        {
            return Json(obj_attnrules.Insert_AttnRules(obj_attnrules), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_AttnRules(Attnrulesdetails obj_attnrules)
        {
            return Json(obj_attnrules.Update_AttnrRules(obj_attnrules), JsonRequestBehavior.AllowGet);
        }

        //regrion for company rules

        public ActionResult CompanyRules()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(obj_comprule.Get_AllCompruleList(1), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Insert_ComRules(CompanyRuleDetails obj_comprule)
        {
            return Json(obj_comprule.Insert_ComRules(obj_comprule), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update_CompRules(CompanyRuleDetails obj_comprule)
        {
            return Json(obj_comprule.Update_ComRules(obj_comprule), JsonRequestBehavior.AllowGet);
        }


        public ActionResult PayrollRules()
        {
            return View();
        }

    }
}