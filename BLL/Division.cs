using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL;
using DLL;
using System.Data;
using System.Data.SqlClient;

namespace BLL
{
    public class Division:Group
    {
        DataAccess da = new DataAccess();
        public int Sno { get; set; }
        public int DivisionId { get; set; }
        public string DivisionName { get; set; }

        public string Insert_Division(Division Obj_Div)
        {

            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = da.AddSPParameter("Division_Name", Obj_Div.DivisionName, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("Tgi_Id", Obj_Div.GroupId, ParameterDirection.Input, DbType.Int32, 100);
            parm[2] = da.AddSPParameter("Tdi_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("CompanyId",3, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("LocationId", 1, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("@Msg", null, ParameterDirection.Output, DbType.String, 500);
            parm[6] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
           
            string id = da.ExecuteNonQuerySP("Usp_Division_Details", parm,true);
            
            return id;
        }

        public string Update_Division(Division Obj_Div)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Division_Name", Obj_Div.DivisionName, ParameterDirection.Input, DbType.String,50);
            parm[1] = da.AddSPParameter("Tgi_Id", Obj_Div.GroupId, ParameterDirection.Input, DbType.Int32,100);
            parm[2] = da.AddSPParameter("Tdi_Id", Obj_Div.DivisionId, ParameterDirection.Input, DbType.Int32,100);            
            parm[3] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64,10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Division_Details", parm);

            return id;
        }

        public string Delete_Division(int ID)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tdi_Id", ID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Flag", 4, ParameterDirection.Input, DbType.Int64, 10);
            string id = da.ExecuteNonQuerySP("Usp_Division_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<Division> Get_AllDivision(int CompanyID, int LocationID)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Tdi_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("CompanyId",3, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Division_Details", parm);
            List<Division> obj_Lst_Div = new List<Division>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Division obj_Div = new Division();
                obj_Div.Sno= Convert.ToInt32(dt.Rows[i]["Sno"]);
                obj_Div.DivisionId = Convert.ToInt32(dt.Rows[i]["Tdi_Id"]);
                obj_Div.DivisionName = dt.Rows[i]["Tdi_Name"].ToString();
                obj_Div.GroupId = Convert.ToInt32(dt.Rows[i]["Tgi_Id"]);
                obj_Div.GroupName = dt.Rows[i]["Tgi_Name"].ToString();
                obj_Lst_Div.Add(obj_Div);
            }
            return obj_Lst_Div;
        }


        public List<Division> Get_AllDivision_GID(int CompanyID, int LocationID,int DivisionId)
        {
            SqlParameter[] parm = new SqlParameter[5];
            parm[0] = da.AddSPParameter("Tdi_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("CompanyId", 3, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Tgi_Id", DivisionId, ParameterDirection.Input, DbType.Int32, 10);
            parm[4] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Division_Details", parm);
            List<Division> obj_Lst_Div = new List<Division>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Division obj_Div = new Division();
                obj_Div.DivisionId = Convert.ToInt32(dt.Rows[i]["Tdi_Id"]);
                obj_Div.DivisionName = dt.Rows[i]["Tdi_Name"].ToString();
                obj_Lst_Div.Add(obj_Div);
            }
            return obj_Lst_Div;
        }


    }
}
