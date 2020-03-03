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
    public class Allowance : Group
    {
        DataAccess da = new DataAccess();
        public int Alw_Id { get; set; }
        public string Alw_Name { get; set; }
        public int Alw_Type { get; set; }
        public string Alw_Val_Type { get; set; }
        public double Alw_Val { get; set; }
        public string Alw_BasedOn { get; set; }
        public string Alw_Fixed { get; set; }


        public string Insert_Allowances(Allowance Obj_Alw)
        {

            SqlParameter[] parm = new SqlParameter[9];
            parm[0] = da.AddSPParameter("Tgi_Id", Obj_Alw.GroupId, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Teai_Name", Obj_Alw.Alw_Name, ParameterDirection.Input, DbType.String, 200);
            parm[2] = da.AddSPParameter("Teai_Type", Obj_Alw.Alw_Type, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Teai_Cal_Type", Obj_Alw.Alw_Val_Type, ParameterDirection.Input, DbType.String, 10);
            parm[4] = da.AddSPParameter("Teai_Value", Obj_Alw.Alw_Val, ParameterDirection.Input, DbType.Double, 10);
            if (Obj_Alw.Alw_BasedOn != "" && Obj_Alw.Alw_BasedOn != null)
                parm[5] = da.AddSPParameter("Teai_Basedon", Obj_Alw.Alw_BasedOn.TrimEnd(','), ParameterDirection.Input, DbType.String, 500);
            else
                parm[5] = da.AddSPParameter("Teai_Basedon", null, ParameterDirection.Input, DbType.String, 500);
            parm[6] = da.AddSPParameter("Teai_Fixed", Obj_Alw.Alw_Fixed, ParameterDirection.Input, DbType.String, 10);
            parm[7] = da.AddSPParameter("UserId", Obj_Alw.UserID, ParameterDirection.Input, DbType.Int32, 10);           
            parm[8] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Allowance_Details", parm,true);

            return id.TrimEnd(' ');
        }

        public string Update_Allowances(Allowance Obj_Alw)
        {

            SqlParameter[] parm = new SqlParameter[10];
            parm[0] = da.AddSPParameter("Tgi_Id", Obj_Alw.GroupId, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Teai_Name", Obj_Alw.Alw_Name, ParameterDirection.Input, DbType.String, 200);
            parm[2] = da.AddSPParameter("Teai_Type", Obj_Alw.Alw_Type, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Teai_Cal_Type", Obj_Alw.Alw_Val_Type, ParameterDirection.Input, DbType.String, 10);
            parm[4] = da.AddSPParameter("Teai_Value", Obj_Alw.Alw_Val, ParameterDirection.Input, DbType.Int32, 10);
            parm[5] = da.AddSPParameter("Teai_Basedon", Obj_Alw.Alw_BasedOn, ParameterDirection.Input, DbType.String, 500);
            parm[6] = da.AddSPParameter("Teai_Fixed", Obj_Alw.Alw_Fixed, ParameterDirection.Input, DbType.String, 10);
            parm[7] = da.AddSPParameter("UserId", Obj_Alw.UserID, ParameterDirection.Input, DbType.Int32, 10);           
            parm[8] = da.AddSPParameter("Teai_Id", Obj_Alw.Alw_Id, ParameterDirection.Input, DbType.Int32, 10);
            parm[9] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Allowance_Details", parm, true);

            return id.TrimEnd(' ');
        }

        public string Delete_Allowance(int Id, int CompanyID, int LocationID, int UserID)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Teai_Id", Id, ParameterDirection.Input, DbType.Int32, 10);            
            parm[1] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64, 10);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Allowance_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }

        public List<Allowance> Get_AllAllowance(int GroupId)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tgi_Id", GroupId, ParameterDirection.Input, DbType.Int32, 10);                      
            parm[1] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);


            DataTable dt = new DataTable();
            List<Allowance> obj_Allw = new List<Allowance>();
            dt = da.Sp_Datatable("Usp_Allowance_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Allowance allw = new Allowance();
                if (dt.Rows[i]["Teai_Id"].ToString() != null && dt.Rows[i]["Teai_Id"].ToString() != "")
                    allw.Alw_Id = Convert.ToInt32(dt.Rows[i]["Teai_Id"]);
                allw.Alw_Name = dt.Rows[i]["Teai_Name"].ToString();
                allw.Alw_Val_Type = dt.Rows[i]["Teai_Cal_Type"].ToString();
                if (dt.Rows[i]["Teai_Value"].ToString() != null && dt.Rows[i]["Teai_Value"].ToString() != "")
                    allw.Alw_Val = Convert.ToInt32(dt.Rows[i]["Teai_Value"]);
                allw.Alw_BasedOn = dt.Rows[i]["Teai_Basedon"].ToString();
                allw.Alw_Fixed = dt.Rows[i]["Teai_Fixed"].ToString();
                if (dt.Rows[i]["Teai_Type"].ToString() != null && dt.Rows[i]["Teai_Type"].ToString() != "")
                    allw.Alw_Type = Convert.ToInt32(dt.Rows[i]["Teai_Type"]);
                if (dt.Rows[i]["Tgi_Id"].ToString() != null && dt.Rows[i]["Tgi_Id"].ToString() != "")
                    allw.GroupId = Convert.ToInt32(dt.Rows[i]["Tgi_Id"]);
                allw.GroupName = (dt.Rows[i]["Tgi_Name"]).ToString();
                obj_Allw.Add(allw);
            }

            return obj_Allw;
        }


        public List<Allowance> Get_AllAllowance(int CompanyID, int LocationID)
        {
            SqlParameter[] parm = new SqlParameter[3];           
            parm[0] = da.AddSPParameter("Tci_Id", CompanyID, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tli_Id", LocationID, ParameterDirection.Input, DbType.Int32, 10);          
            parm[2] = da.AddSPParameter("Flag", 10, ParameterDirection.Input, DbType.Int32, 10);


            DataTable dt = new DataTable();
            List<Allowance> obj_Allw = new List<Allowance>();
            dt = da.Sp_Datatable("Usp_Allowance_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Allowance allw = new Allowance();
                if (dt.Rows[i]["Teai_Id"].ToString() != null && dt.Rows[i]["Teai_Id"].ToString() != "")
                    allw.Alw_Id = Convert.ToInt32(dt.Rows[i]["Teai_Id"]);
                allw.Alw_Name = dt.Rows[i]["Teai_Name"].ToString();
                allw.Alw_Val_Type = dt.Rows[i]["Teai_Cal_Type"].ToString();
                if (dt.Rows[i]["Teai_Value"].ToString() != null && dt.Rows[i]["Teai_Value"].ToString() != "")
                    allw.Alw_Val = Convert.ToInt32(dt.Rows[i]["Teai_Value"]);
                allw.Alw_BasedOn = dt.Rows[i]["Teai_Basedon"].ToString();
                allw.Alw_Fixed = dt.Rows[i]["Teai_Fixed"].ToString();
                if (dt.Rows[i]["Teai_Type"].ToString() != null && dt.Rows[i]["Teai_Type"].ToString() != "")
                    allw.Alw_Type = Convert.ToInt32(dt.Rows[i]["Teai_Type"]);
                if (dt.Rows[i]["Tgi_Id"].ToString() != null && dt.Rows[i]["Tgi_Id"].ToString() != "")
                    allw.GroupId = Convert.ToInt32(dt.Rows[i]["Tgi_Id"]);
                allw.GroupName = (dt.Rows[i]["Tgi_Name"]).ToString();

                obj_Allw.Add(allw);
            }

            return obj_Allw;
        }

        public Allowance Get_Allowance(int Id)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Teai_Id", Id, ParameterDirection.Input, DbType.Int32, 10);            
            parm[1] = da.AddSPParameter("Flag", 5, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Allowance_Details", parm);
            Allowance allw = new Allowance();
            if (dt.Rows.Count > 0)
            {

                if (dt.Rows[0]["Teai_Id"].ToString() != null && dt.Rows[0]["Teai_Id"].ToString() != "")
                    allw.Alw_Id = Convert.ToInt32(dt.Rows[0]["Teai_Id"]);
                allw.Alw_Name = dt.Rows[0]["Teai_Name"].ToString();
                allw.Alw_Val_Type = dt.Rows[0]["Teai_Cal_Type"].ToString();
                if (dt.Rows[0]["Teai_Value"].ToString() != null && dt.Rows[0]["Teai_Value"].ToString() != "")
                    allw.Alw_Val = Convert.ToDouble(dt.Rows[0]["Teai_Value"]);
                allw.Alw_BasedOn = dt.Rows[0]["Teai_Basedon"].ToString();
                allw.Alw_Fixed = dt.Rows[0]["Teai_Fixed"].ToString();
                if (dt.Rows[0]["Teai_Type"].ToString() != null && dt.Rows[0]["Teai_Type"].ToString() != "")
                    allw.Alw_Type = Convert.ToInt32(dt.Rows[0]["Teai_Type"]);
                if (dt.Rows[0]["Tgi_Id"].ToString() != null && dt.Rows[0]["Tgi_Id"].ToString() != "")
                    allw.GroupId = Convert.ToInt32(dt.Rows[0]["Tgi_Id"]);
            }

            return allw;
        }

        public List<Allowance> GetAlwByAddition(Allowance obj_Alw)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Tgi_Id", obj_Alw.GroupId, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Teai_Type", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);


            DataTable dt = new DataTable();
            List<Allowance> obj_Allw = new List<Allowance>();
            dt = da.Sp_Datatable("Usp_Allowance_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Allowance allw = new Allowance();
                if (dt.Rows[i]["Teai_Id"].ToString() != null && dt.Rows[i]["Teai_Id"].ToString() != "")
                    allw.Alw_Id = Convert.ToInt32(dt.Rows[i]["Teai_Id"]);
                allw.Alw_Name = dt.Rows[i]["Teai_Name"].ToString();
                obj_Allw.Add(allw);
            }

            return obj_Allw;
        }


        public List<Allowance> Get_Droupdwon(int ID,int CompanyId,int LocationId)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tgi_Id", ID, ParameterDirection.Input, DbType.Int32, 10);                      
            parm[2] = da.AddSPParameter("Flag", 7, ParameterDirection.Input, DbType.Int32, 10);


            DataTable dt = new DataTable();
            List<Allowance> obj_Allw = new List<Allowance>();
            dt = da.Sp_Datatable("Usp_Allowance_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Allowance allw = new Allowance();
                if (dt.Rows[i]["Teai_Id"].ToString() != null && dt.Rows[i]["Teai_Id"].ToString() != "")
                    allw.Alw_Id = Convert.ToInt32(dt.Rows[i]["Teai_Id"]);
                allw.Alw_Name = dt.Rows[i]["Teai_Name"].ToString();
                obj_Allw.Add(allw);
            }

            return obj_Allw;
        }
    }
}
