using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DLL;
using System.Data;
using System.Data.SqlClient;

namespace BLL
{
   public class Company
    {
        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }
        DataAccess da = new DataAccess();
        public int CompanyId { get; set; }
        public string Tci_Name { get; set; }
        public string Tci_Code { get; set; }
        public string Tci_Logo { get; set; }
        public string Tci_Address { get; set; }
        public string Tci_City { get; set; }
        public string Tci_District { get; set; }
        public int Tci_State { get; set; }
        public int Tci_Country { get; set; }
        public string Tci_phoneNo { get; set; }
        public DateTime Tci_EstDate { get; set; }
        public string Tci_EmailID { get; set; }
        public string Tci_GST { get; set; }
        public string Tci_Tan { get; set; }
        public string Tci_Pan_No { get; set; }
        public string Tci_Website { get; set; }
        public DateTime Tci_Modified_date { get; set; }
        public int Tci_Userid { get; set; }
        public Nullable<DateTime> Tci_Date { get; set; }


        public string Insert_Company(Company Obj_Comp)
        {
            
            SqlParameter[] parm = new SqlParameter[17];
            parm[0] = da.AddSPParameter("Tci_Name", Obj_Comp.Tci_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tci_Code", Obj_Comp.Tci_Code, ParameterDirection.Input, DbType.String, 10);
            if (Obj_Comp.Tci_Logo != null && Obj_Comp.Tci_Logo!="" )
            {
                string[] url = Obj_Comp.Tci_Logo.Split('?');
                parm[2] = da.AddSPParameter("Tci_Logo", url[0], ParameterDirection.Input, DbType.String, 1000);
            }
            else
            {
                parm[2] = da.AddSPParameter("Tci_Logo", null, ParameterDirection.Input, DbType.String, 1000);
            }
            
            parm[3] = da.AddSPParameter("Tci_Address", Obj_Comp.Tci_Address, ParameterDirection.Input, DbType.String, 1000);
            parm[4] = da.AddSPParameter("Tci_City", Obj_Comp.Tci_City, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tci_District", Obj_Comp.Tci_District, ParameterDirection.Input, DbType.String, 100);
            parm[6] = da.AddSPParameter("Tci_State", Obj_Comp.Tci_State, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tci_Country", Obj_Comp.Tci_Country, ParameterDirection.Input, DbType.Int32, 5);
            parm[8] = da.AddSPParameter("Tci_phoneNo", Obj_Comp.Tci_phoneNo, ParameterDirection.Input, DbType.String, 15);
            if(Obj_Comp.Tci_Date == null)
            {
                parm[9] = da.AddSPParameter("Tci_EstDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[9] = da.AddSPParameter("Tci_EstDate", Obj_Comp.Tci_Date, ParameterDirection.Input, DbType.DateTime, 20);
            }
            
            parm[10] = da.AddSPParameter("Tci_EmailID", Obj_Comp.Tci_EmailID, ParameterDirection.Input, DbType.String, 50);
            parm[11] = da.AddSPParameter("Tci_GST", Obj_Comp.Tci_GST, ParameterDirection.Input, DbType.String, 20);
            parm[12] = da.AddSPParameter("Tci_Tan", Obj_Comp.Tci_Tan, ParameterDirection.Input, DbType.String, 20);
            parm[13] = da.AddSPParameter("Tci_Pan_No", Obj_Comp.Tci_Pan_No, ParameterDirection.Input, DbType.String, 20);
            parm[14] = da.AddSPParameter("Tci_Website", Obj_Comp.Tci_Website, ParameterDirection.Input, DbType.String, 100);
            parm[15] = da.AddSPParameter("Userid", Obj_Comp.Tci_Userid, ParameterDirection.Input, DbType.Int32, 5);
            parm[16] = da.AddSPParameter("Flag", Flag.Insert, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Company_Details", parm, true);

            return id;
        }

        public string Update_Copmpany(Company Obj_Comp)
        {
            SqlParameter[] parm = new SqlParameter[18];
            parm[0] = da.AddSPParameter("Tci_Name", Obj_Comp.Tci_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tci_Code", Obj_Comp.Tci_Code, ParameterDirection.Input, DbType.String, 10);
            if (Obj_Comp.Tci_Logo != null && Obj_Comp.Tci_Logo != "")
            {
                string[] url = Obj_Comp.Tci_Logo.Split('?');
                parm[2] = da.AddSPParameter("Tci_Logo", url[0], ParameterDirection.Input, DbType.String, 1000);
            }
            else
            {
                parm[2] = da.AddSPParameter("Tci_Logo", null, ParameterDirection.Input, DbType.String, 1000);
            }
            parm[3] = da.AddSPParameter("Tci_Address", Obj_Comp.Tci_Address, ParameterDirection.Input, DbType.String, 1000);
            parm[4] = da.AddSPParameter("Tci_City", Obj_Comp.Tci_City, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tci_District", Obj_Comp.Tci_District, ParameterDirection.Input, DbType.String, 100);
            parm[6] = da.AddSPParameter("Tci_State", Obj_Comp.Tci_State, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tci_Country", Obj_Comp.Tci_Country, ParameterDirection.Input, DbType.Int32, 5);
            parm[8] = da.AddSPParameter("Tci_phoneNo", Obj_Comp.Tci_phoneNo, ParameterDirection.Input, DbType.String, 15);
            if (Obj_Comp.Tci_Date == null)
            {
                parm[9] = da.AddSPParameter("Tci_EstDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[9] = da.AddSPParameter("Tci_EstDate", Obj_Comp.Tci_Date, ParameterDirection.Input, DbType.DateTime, 20);
            }
            parm[10] = da.AddSPParameter("Tci_EmailID", Obj_Comp.Tci_EmailID, ParameterDirection.Input, DbType.String, 50);
            parm[11] = da.AddSPParameter("Tci_GST", Obj_Comp.Tci_GST, ParameterDirection.Input, DbType.String, 20);
            parm[12] = da.AddSPParameter("Tci_Tan", Obj_Comp.Tci_Tan, ParameterDirection.Input, DbType.String, 20);
            parm[13] = da.AddSPParameter("Tci_Pan_No", Obj_Comp.Tci_Pan_No, ParameterDirection.Input, DbType.String, 20);
            parm[14] = da.AddSPParameter("Tci_Website", Obj_Comp.Tci_Website, ParameterDirection.Input, DbType.String, 100);
            parm[15] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 5);
            parm[16] = da.AddSPParameter("Tci_id", Obj_Comp.CompanyId, ParameterDirection.Input, DbType.Int32, 5);
            parm[17] = da.AddSPParameter("Flag", Flag.Update, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Company_Details", parm, true);

            return id;
        }

        public string Delete_Company(int CompanyID)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tci_id", CompanyID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Company_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<Company> Get_AllCompany(int userid)
        {
            List<Company> Obj_com = new List<Company>();
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Flag", Flag.Select, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Company_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Company obj_c = new Company();
                if (dt.Rows[i]["Tci_id"].ToString() != null && dt.Rows[i]["Tci_id"].ToString() != "")
                {
                    obj_c.CompanyId = Convert.ToInt32(dt.Rows[i]["Tci_id"]);
                }
                obj_c.Tci_Name = dt.Rows[i]["Tci_Name"].ToString();
                obj_c.Tci_Code = dt.Rows[i]["Tci_Code"].ToString();
                obj_c.Tci_Logo = dt.Rows[i]["Tci_Logo"].ToString();
                obj_c.Tci_Address = dt.Rows[i]["Tci_Address"].ToString();
                obj_c.Tci_City = dt.Rows[i]["Tci_City"].ToString();
                obj_c.Tci_District = dt.Rows[i]["Tci_District"].ToString();
                if (dt.Rows[i]["Tci_State"].ToString() != null && dt.Rows[i]["Tci_State"].ToString() != "")
                    obj_c.Tci_State = Convert.ToInt32(dt.Rows[i]["Tci_State"].ToString());
                if (dt.Rows[i]["Tci_Country"].ToString() != null && dt.Rows[i]["Tci_Country"].ToString() != "")
                    obj_c.Tci_Country = Convert.ToInt32(dt.Rows[i]["Tci_Country"].ToString());
                obj_c.Tci_phoneNo = dt.Rows[i]["Tci_phoneNo"].ToString();
                if (dt.Rows[i]["Tci_EstDate"].ToString() != null && dt.Rows[i]["Tci_EstDate"].ToString() != "")
                    obj_c.Tci_Date = Convert.ToDateTime(dt.Rows[i]["Tci_EstDate"].ToString());
                obj_c.Tci_EmailID = dt.Rows[i]["Tci_EmailID"].ToString();
                obj_c.Tci_GST = dt.Rows[i]["Tci_GST"].ToString();
                obj_c.Tci_Tan = dt.Rows[i]["Tci_Tan"].ToString();
                obj_c.Tci_Pan_No = dt.Rows[i]["Tci_Pan_No"].ToString();
                obj_c.Tci_Website = dt.Rows[i]["Tci_Website"].ToString();


                Obj_com.Add(obj_c);
            }

            return Obj_com;
        }

        public DataTable Edit_Company(int CompanyId,int UserId)
        {
            DataTable dt = new DataTable();
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = da.AddSPParameter("Tci_id", CompanyId, ParameterDirection.Input, DbType.Int32,10);
            parm[1] = da.AddSPParameter("Userid", UserId, ParameterDirection.Input, DbType.Int32,10);
            parm[2] = da.AddSPParameter("Flag", Flag.Edit, ParameterDirection.Input, DbType.Int64,10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            dt = da.Sp_Datatable("Usp_Company_Details", parm);
            return dt;
        }

    }
}
