using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HRMS.Models;

namespace HRMS.Helpers
{
    public static class HtmlHelpers
    {
        // Truncate string
        public static string Truncate(this HtmlHelper helper, string text, int length)
        {
            if (text == null || text.Length < length)
                return text;
            int iNextSpace = text.LastIndexOf(" ", length);
            return string.Format("{0}...", text.Substring(0, (iNextSpace > 0) ? iNextSpace : length).Trim());
        }

        // Replace And with -
        public static string ReplaceAnd(this HtmlHelper helper, string text)
        {
            text = text.Trim();
            text = text.Replace("&", "and");
            text = text.Replace("  ", " ");
            return text.Replace(" ", "-");
        }

        //public static string GetSubcategoryName(this HtmlHelper helper, int categoryid)
        //{
        //    string subcategoryname = "";
        //    using (var db = new TEOSDBContext())
        //    {
        //        var qSubDetails = db.gtc_fsp_get_TopActiveSubcategoryByCategoryID(categoryid);
        //        foreach (var sub in qSubDetails)
        //        {
        //            subcategoryname = sub.subcatName;
        //        }
        //    }

        //    return subcategoryname;
        //}
    }
}