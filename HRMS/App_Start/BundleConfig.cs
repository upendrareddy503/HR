using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace HRMS.App_Start
{
    public class BundleConfig
    {

        public static void RegisterBundles(BundleCollection bundles)
        {
            //Common scripts       
            bundles.Add(new ScriptBundle("~/bundles/CommonScripts").Include(
                    "~/Content/assets/vendor/babel-external-helpers/babel-external-helpers.js",
                    "~/Content/assets/vendor/jquery/jquery.min.js",
                    "~/Content/assets/vendor/popper-js/umd/popper.min.js",
                    "~/Content/assets/vendor/bootstrap/bootstrap.min.js",
                    "~/Content/assets/vendor/animsition/animsition.min.js",
                    "~/Content/assets/vendor/mousewheel/jquery.mousewheel.js",
                    "~/Content/assets/vendor/asscrollbar/jquery-asScrollbar.min.js",
                    "~/Content/assets/vendor/asscrollable/jquery-asScrollable.min.js",
                     "~/Content/assets/vendor/ashoverscroll/jquery-asHoverScroll.min.js"
                    ));
            //Common1 scripts       
            bundles.Add(new ScriptBundle("~/bundles/CommonScripts1").Include(
                    "~/Content/assets/js/Component.min.js",
                    "~/Content/assets/js/Plugin.min.js",
                    "~/Content/assets/js/Base.min.js",
                    "~/Content/assets/js/Config.min.js",
                    "~/Content/assets/js/Section/Menubar.min.js",
                    "~/Content/assets/js/Section/Sidebar.min.js",
                    "~/Content/assets/js/Section/PageAside.min.js",
                    "~/Content/assets/js/plugin/menu.min.js"
                    ));

            //Page scripts       
            bundles.Add(new ScriptBundle("~/bundles/Page").Include(
                    "~/Content/assets/js/Site.min.js",
                    "~/Content/assets/js/plugin/asscrollable.min.js",
                    "~/Content/assets/js/plugin/slidepanel.min.js",
                    "~/Content/assets/js/plugin/switchery.min.js",
                    "~/Content/assets/js/plugin/matchheight.min.js",
                    "~/Content/assets/js/plugin/jvectormap.min.js",
                    "~/Content/assets/examples/js/dashboard/v1.min.js"
                    
                    ));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            ///// CSS Budles

            IItemTransform cssFixer = new CssRewriteUrlTransform();

            //Standard css              
            //Standard css and Bootstrap    
            bundles.Add(
                new StyleBundle("~/bundles/CssStyles")
                    .Include("~/Content/assets/css/bootstrap.min.css", cssFixer)
                    .Include("~/Content/assets/css/bootstrap-extend.min.css", cssFixer)
                    .Include("~/Content/assets/css/site.min.css", cssFixer)
                    .Include("~/Content/assets/css/style.css", cssFixer)
                   );

            //Fonts
            bundles.Add(
                new StyleBundle("~/bundles/CssStyles_")
                    .Include("~/Content/assets/fonts/web-icons/web-icons.min.css", cssFixer)
                    .Include("~/Content/assets/fonts/brand-icons/brand-icons.min.css", cssFixer)
                    .Include("https://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic", cssFixer)
                    .Include("~/Content/assets/fonts/weather-icons/weather-icons.min.css", cssFixer)
            );

        }
    }
}