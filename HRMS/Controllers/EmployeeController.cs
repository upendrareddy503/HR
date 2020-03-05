using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using System.Data;
using System.IO;
using System.Web.Helpers;
using LinqToExcel;
using System.Net;
using System.Data.OleDb;
using System.Configuration;

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

        public ActionResult EmployeeList()
        {
            return View();
        }

        public ActionResult EmployeeDivList()
        {
            return View();
        }


        public JsonResult Insert_Employee(EmployeeDetails obj_EmpIns)
        {
            obj_EmpIns.CompanyID = Convert.ToInt32(Session["companyid"]);
            obj_EmpIns.LocationID = Convert.ToInt32(Session["LocationID"]);
            obj_EmpIns.UserID= Convert.ToInt32(Session["userid"]);
            return Json(obj_Emp.Insert_Employee(obj_EmpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Next_Employee(EmployeeDetails obj_EmpNxt)
        {
            obj_EmpNxt.CompanyID = Convert.ToInt32(Session["companyid"]);
            obj_EmpNxt.LocationID = Convert.ToInt32(Session["LocationID"]);
            obj_EmpNxt.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Emp.Next_Employee(obj_EmpNxt), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Second_Employee(EmployeeDetails obj_EmpIns)
        {            
            obj_EmpIns.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Emp.Second_Employee(obj_EmpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Third_Employee(EmployeeDetails obj_EmpIns)
        {           
            obj_EmpIns.UserID = Convert.ToInt32(Session["userid"]);
            return Json(obj_Emp.Salary_Employee(obj_EmpIns), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_DesignationReport(string Id)
        {
            return Json(obj_Emp.Get_AllEmployee_GID(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_EmpID(string Id)
        {
            return Json(obj_Emp.Get_EmpID(Id, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_Email(EmployeeDetails obj_EmpIns)
        {
            return Json(obj_Emp.Get_EmpEmail(obj_EmpIns.Tei_Email, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_EmpPhone(string Id)
        {
            return Json(obj_Emp.Get_EmpPhone(Id, Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
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
                    int CompanyId = Convert.ToInt32(Session["companyid"]), LocationId= Convert.ToInt32(Session["LocationID"]);
                   
                    DataTable dt = obj_Emp.Get_Top_EmpID(CompanyId, LocationId);
                    if (dt.Rows.Count > 0)
                    {
                        _imgname = dt.Rows[0]["Tei_Id"].ToString();
                    }
                    else
                    {
                        _imgname = "1";//WebSecurity.CurrentUserId.ToString();
                    }
                    var _comPath = Server.MapPath("/Images/Emp/User_")+CompanyId+"_"+LocationId+"_"+ _imgname + _ext;
                    _imgname = "User_" + CompanyId + "_" + LocationId + "_" + _imgname + _ext;

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


        public ActionResult Import()
        {
            return View();
        }
        public JsonResult UploadExcelsheet()
        {
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];
                List<EmployeeDetails> _lstProductMaster = new List<EmployeeDetails>();
                string filePath = string.Empty;
                if (Request.Files != null)
                {
                    string path = Server.MapPath("~/Uploads/Product/");
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    filePath = path + Path.GetFileName("ProductUploadSheet-" + DateTime.Now.ToString("dd-MMM-yyyy-HH-mm-ss-ff") + Path.GetExtension(file.FileName));
                    string extension = Path.GetExtension("ProductUploadSheet-" + DateTime.Now.ToString("dd-MMM-yyyy-HH-mm-ss-ff") + Path.GetExtension(file.FileName));
                    file.SaveAs(filePath);

                    string conString = string.Empty;
                    switch (extension)
                    {
                        case ".xls": //Excel 97-03.
                            conString = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
                            break;
                        case ".xlsx": //Excel 07 and above.
                            conString = ConfigurationManager.ConnectionStrings["Excel07ConString"].ConnectionString;
                            break;
                    }
                    int total = 0;
                    int entered = 0;
                    int failed = 0;

                    conString = string.Format(conString, filePath);

                    using (OleDbConnection connExcel = new OleDbConnection(conString))
                    {
                        using (OleDbCommand cmdExcel = new OleDbCommand())
                        {
                            using (OleDbDataAdapter odaExcel = new OleDbDataAdapter())
                            {
                                DataTable dt = new DataTable();
                                cmdExcel.Connection = connExcel;

                                //Get the name of First Sheet.
                                connExcel.Open();
                                DataTable dtExcelSchema;
                                dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                                string sheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
                                connExcel.Close();

                                //Read Data from First Sheet.
                                connExcel.Open();
                                cmdExcel.CommandText = "SELECT * From [" + sheetName + "]";
                                odaExcel.SelectCommand = cmdExcel;
                                odaExcel.Fill(dt);
                                connExcel.Close();


                                if (dt.Rows.Count > 0)
                                {

                                    foreach (DataRow row in dt.Rows)
                                    {
                                        total++;
                                        _lstProductMaster.Add(new EmployeeDetails
                                        {
                                            //Tei_Empno = row["ProductName"].ToString().Replace("'", "''"),
                                            //ProductSKU = row["VendorSKU"].ToString().Trim() + "GL" + DateTime.Now.Year.ToString().Substring(2),
                                            //VendorSKU = row["VendorSKU"].ToString().Trim(),
                                            //DisplayText = row["DisplayText"].ToString().Trim(),
                                            //ProductSpecification = row["ProductSpecification"].ToString().Replace("'", "''"),
                                            //Description = row["Description"].ToString().Replace("'", "''"),
                                            //ShortDescription = row["ShortDescription"].ToString().Replace("'", "''"),
                                            //LongDescription = row["LongDescription"].ToString().Replace("'", "''"),
                                            //InventoryCount = row["InventoryCount"].ToString().Trim(),
                                            //ListPrice = row["ListPrice"].ToString().Trim(),
                                            //SellingPrice = row["SellingPrice"].ToString().Trim(),
                                            // if (chkMultiple.Checked == true && ProductSKU != "")
                                            //{
                                            //    ProductImage = Convert.ToString(VendorSKU).Trim() + "_1.jpg";
                                            //}
                                            //else if ((chkMultiple.Checked == false && details.SKU != ""))
                                            //{
                                            //    ProductImage = Convert.ToString(VendorSKU).Trim() + ".jpg";
                                            //}
                                        });
                                        entered++;
                                        if (entered > 0)
                                        {
                                           // GetOccassionRecipientMasters();
                                        }
                                    }
                                }
                            }
                            failed = total - entered;
                            if (failed > 0)
                            {
                                ViewBag.Fail = failed + " Records not entered";
                            }
                            else
                            {
                                ViewBag.Pass = entered + " Records entered";
                                ViewBag.Fail = failed + " Records not entered";


                            }
                            ViewBag.Total = total + " Total Records";

                        }
                    }
                }
               
                //List<ProductMaster> _productmaster = new List<ProductMaster>();
                //ViewBag.maindata = _lstProductMaster;
                ////return Json(_lstProductMaster, JsonRequestBehavior.AllowGet);
                //return View("ImportProductsFromExcel", _lstProductMaster);
            }
            return Json(JsonRequestBehavior.AllowGet);


        }


        public JsonResult UploadHomeReport(string id)
        {
            var file = Request.Files[0];
             string filePath = string.Empty;
            if (Request.Files != null)
            {
                string path = Server.MapPath("~/Excels/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                filePath = path + Path.GetFileName("ProductUploadSheet-" + DateTime.Now.ToString("dd-MMM-yyyy-HH-mm-ss-ff") + Path.GetExtension(file.FileName));
                string extension = Path.GetExtension("ProductUploadSheet-" + DateTime.Now.ToString("dd-MMM-yyyy-HH-mm-ss-ff") + Path.GetExtension(file.FileName));
                file.SaveAs(filePath);

                string conString = string.Empty;
                switch (extension)
                {
                    case ".xls": //Excel 97-03.
                        conString = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
                        break;
                    case ".xlsx": //Excel 07 and above.
                        conString = ConfigurationManager.ConnectionStrings["Excel07ConString"].ConnectionString;
                        break;
                }
                int total = 0;
                int entered = 0;
                int failed = 0;

                conString = string.Format(conString, filePath);

                using (OleDbConnection connExcel = new OleDbConnection(conString))
                {
                    using (OleDbCommand cmdExcel = new OleDbCommand())
                    {
                        using (OleDbDataAdapter odaExcel = new OleDbDataAdapter())
                        {
                            DataTable dt = new DataTable();
                            cmdExcel.Connection = connExcel;

                            //Get the name of First Sheet.
                            connExcel.Open();
                            DataTable dtExcelSchema;
                            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                            string sheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
                            connExcel.Close();

                            //Read Data from First Sheet.
                            connExcel.Open();
                            cmdExcel.CommandText = "SELECT * From [" + sheetName + "]";
                            odaExcel.SelectCommand = cmdExcel;
                            odaExcel.Fill(dt);
                            connExcel.Close();
                          

                            if (dt.Rows.Count > 0)
                            {

                                foreach (DataRow row in dt.Rows)
                                {
                                    total++;

                                    if(row["EmpNo"]!="")
                                    { 
                                    obj_Emp.Tei_Empno = row["EmpNo"].ToString();
                                    }
                                    obj_Emp.Tei_Title = row["Title"].ToString();
                                    obj_Emp.Tei_FirstName = row["First Name"].ToString();
                                    obj_Emp.Tei_LastName = row["Last Name"].ToString();
                                    obj_Emp.Tei_Gender = row["Gender"].ToString();
                                    obj_Emp.Tei_Phone = row["Phone"].ToString();
                                    obj_Emp.Tei_Email = row["Email"].ToString();
                                    obj_Emp.Tei_Type = row["Type"].ToString();
                                    obj_Emp.Tei_Father = row["Father Name"].ToString();
                                    if (row["DateofBirth"] != "")
                                    {
                                        obj_Emp.Tei_DateofBirth = Convert.ToDateTime(row["DateofBirth"].ToString());
                                    }
                                    if (row["JoiningDate"] != "")
                                    {
                                        obj_Emp.Tei_JoiningDate = Convert.ToDateTime(row["JoiningDate"].ToString());
                                    }
                                    obj_Emp.Tei_Address1 = row["Address"].ToString();
                                    obj_Emp.Tei_AadharNo = row["AadharNo"].ToString();
                                    obj_Emp.CompanyID = Convert.ToInt32(Session["companyid"]);
                                    obj_Emp.LocationID = Convert.ToInt32(Session["LocationID"]);
                                    obj_Emp.UserID = Convert.ToInt32(Session["userid"]);

                                    string k = obj_Emp.Insert_Employee(obj_Emp);
                                    //                        _lstProductMaster.Add(new EmployeeDetails
                                    // {
                                    //Tei_Empno = row["ProductName"].ToString().Replace("'", "''"),
                                    //ProductSKU = row["VendorSKU"].ToString().Trim() + "GL" + DateTime.Now.Year.ToString().Substring(2),
                                    //VendorSKU = row["VendorSKU"].ToString().Trim(),
                                    //DisplayText = row["DisplayText"].ToString().Trim(),
                                    //ProductSpecification = row["ProductSpecification"].ToString().Replace("'", "''"),
                                    //Description = row["Description"].ToString().Replace("'", "''"),
                                    //ShortDescription = row["ShortDescription"].ToString().Replace("'", "''"),
                                    //LongDescription = row["LongDescription"].ToString().Replace("'", "''"),
                                    //InventoryCount = row["InventoryCount"].ToString().Trim(),
                                    //ListPrice = row["ListPrice"].ToString().Trim(),
                                    //SellingPrice = row["SellingPrice"].ToString().Trim(),
                                    // if (chkMultiple.Checked == true && ProductSKU != "")
                                    //{
                                    //    ProductImage = Convert.ToString(VendorSKU).Trim() + "_1.jpg";
                                    //}
                                    //else if ((chkMultiple.Checked == false && details.SKU != ""))
                                    //{
                                    //    ProductImage = Convert.ToString(VendorSKU).Trim() + ".jpg";
                                    //}
                                    //  });
                                    //entered++;
                                    ///if (entered > 0)
                                    //{
                                        // GetOccassionRecipientMasters();
                                    //}
                                }
                            }
                        }
                        failed = total - entered;
                        if (failed > 0)
                        {
                            ViewBag.Fail = failed + " Records not entered";
                        }
                        else
                        {
                            ViewBag.Pass = entered + " Records entered";
                            ViewBag.Fail = failed + " Records not entered";


                        }
                        ViewBag.Total = total + " Total Records";

                    }
                }
            }

            // return Json("File uploaded successfully");
            return Json(JsonRequestBehavior.AllowGet);
        }


        public JsonResult List()
        {
            return Json(obj_Emp.Get_AllEmp(Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmpDivList()
        {
            return Json(obj_Emp.Get_AllEmp(Convert.ToInt32(Session["companyid"]), Convert.ToInt32(Session["LocationID"])), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmployeeById(int ID)
        {
            return Json(obj_Emp.Get_Dashboard_profile(ID), JsonRequestBehavior.AllowGet);
        }


        public JsonResult Delete_Employee(int ID)
        {
            return Json(obj_Emp.Delete_Employee(ID), JsonRequestBehavior.AllowGet);
        }

    }
}