using DLL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class Customer
    {

        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }
        DataAccess da = new DataAccess();
        public int CustomerId { get; set; }
        public string Tcm_Name { get; set; }
        public string Tcm_Code { get; set; }
        public string Tcm_Address { get; set; }
        public string Tcm_phoneNo { get; set; }
        public string Tcm_EmailID { get; set; }
        public string Tcm_GST { get; set; }
        public string Tcm_Pan_No { get; set; }
        public int Tcm_Userid { get; set; }




        public string Insert_Customer(Customer Obj_cus)
        {

            SqlParameter[] parm = new SqlParameter[8];
            parm[0] = da.AddSPParameter("Tcm_Name", Obj_cus.Tcm_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tcm_Code", Obj_cus.Tcm_Code, ParameterDirection.Input, DbType.String, 10);
            parm[2] = da.AddSPParameter("Tcm_Address", Obj_cus.Tcm_Address, ParameterDirection.Input, DbType.String, 1000);
            parm[3] = da.AddSPParameter("Tcm_Phone", Obj_cus.Tcm_phoneNo, ParameterDirection.Input, DbType.Int32, 15);
            parm[4] = da.AddSPParameter("Tcm_Emailid", Obj_cus.Tcm_EmailID, ParameterDirection.Input, DbType.String, 50);
            parm[5] = da.AddSPParameter("Tcm_Gst", Obj_cus.Tcm_GST, ParameterDirection.Input, DbType.String, 20);
            parm[6] = da.AddSPParameter("Tcm_PanNumber", Obj_cus.Tcm_Pan_No, ParameterDirection.Input, DbType.String, 20);
            parm[7] = da.AddSPParameter("Flag", Flag.Insert, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Customer_info", parm);

            return id;
        }

        public string Update_Customer(Customer Obj_cus)
        {
            SqlParameter[] parm = new SqlParameter[9];
            parm[0] = da.AddSPParameter("Tcm_Name", Obj_cus.Tcm_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tcm_Code", Obj_cus.Tcm_Code, ParameterDirection.Input, DbType.String, 10);
            parm[2] = da.AddSPParameter("Tcm_Address", Obj_cus.Tcm_Address, ParameterDirection.Input, DbType.String, 1000);
            parm[3] = da.AddSPParameter("Tcm_Phone", Obj_cus.Tcm_phoneNo, ParameterDirection.Input, DbType.String, 15);
            parm[4] = da.AddSPParameter("Tcm_Emailid", Obj_cus.Tcm_EmailID, ParameterDirection.Input, DbType.String, 50);
            parm[5] = da.AddSPParameter("Tcm_Gst", Obj_cus.Tcm_GST, ParameterDirection.Input, DbType.String, 20);
            parm[6] = da.AddSPParameter("Tcm_PanNumber", Obj_cus.Tcm_Pan_No, ParameterDirection.Input, DbType.String, 20);
            parm[7] = da.AddSPParameter("Txnid", Obj_cus.CustomerId, ParameterDirection.Input, DbType.Int32, 200);
            parm[8] = da.AddSPParameter("Flag", Flag.Update, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Customer_info", parm);

            return id;
        }

        public string Delete_Customer(int CompanyID)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Txnid", CompanyID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Customer_info", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<Customer> Get_AllCustomer(int userid)
        {
            List<Customer> Obj_com = new List<Customer>();
            SqlParameter[] parm = new SqlParameter[1];
          
            parm[0] = da.AddSPParameter("Flag", Flag.Select, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Customer_info", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Customer obj_c = new Customer();


                if (dt.Rows[i]["Txnid"].ToString() != null && dt.Rows[i]["Txnid"].ToString() != "")
                {
                    obj_c.CustomerId = Convert.ToInt32(dt.Rows[i]["Txnid"]);
                }
                obj_c.Tcm_Name = dt.Rows[i]["Tcm_Name"].ToString();
                obj_c.Tcm_Address = dt.Rows[i]["Tcm_Address"].ToString();
                obj_c.Tcm_Code = dt.Rows[i]["Tcm_Code"].ToString();
                obj_c.Tcm_EmailID = dt.Rows[i]["Tcm_Emailid"].ToString();
                obj_c.Tcm_GST = dt.Rows[i]["Tcm_Gst"].ToString();
                obj_c.Tcm_phoneNo = dt.Rows[i]["Tcm_Phone"].ToString();
                obj_c.Tcm_Pan_No = dt.Rows[i]["Tcm_PanNumber"].ToString();
                Obj_com.Add(obj_c);
            }

            return Obj_com;
        }

        public DataTable Edit_Customer(int CompanyId, int UserId)
        {
            DataTable dt = new DataTable();
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = da.AddSPParameter("Tci_id", CompanyId, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Userid", UserId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", Flag.Edit, ParameterDirection.Input, DbType.Int64, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            dt = da.Sp_Datatable("Usp_Company_Details", parm);
            return dt;
        }
    }
}