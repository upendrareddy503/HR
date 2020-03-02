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
    public class Designation
    {
        DataAccess da = new DataAccess();
        public int DesignationId { get; set; }
        public int LevelId { get; set; }
        public string DesignationName { get; set; }
        public string LevelName { get; set; }

        public string Insert_Designation(Designation Obj_Dig)
        {

            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = da.AddSPParameter("Tdg_Name", Obj_Dig.DesignationName, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("Tdg_LevelId", Obj_Dig.LevelId, ParameterDirection.Input, DbType.Int32, 100);
            parm[2] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("CompanyId", 3, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("LocationId", 1, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tdg_LevelName", Obj_Dig.LevelName, ParameterDirection.Input, DbType.String, 100);
            parm[6] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Designation_Details", parm, true);

            return id;
        }

        public string Update_Designation(Designation Obj_Dig)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("Tdg_Id", Obj_Dig.DesignationId, ParameterDirection.Input, DbType.Int32, 100);
            parm[1] = da.AddSPParameter("Tdg_Name", Obj_Dig.DesignationName, ParameterDirection.Input, DbType.String, 50);
            parm[2] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int32, 100);
            parm[3] = da.AddSPParameter("Tdg_LevelId", Obj_Dig.LevelId, ParameterDirection.Input, DbType.Int32, 100);
            parm[4] = da.AddSPParameter("Tdg_LevelName", Obj_Dig.LevelName, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Designation_Details", parm, true);

            return id;
        }

        public string Delete_Designation(int ID)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tdg_Id", ID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Flag", 4, ParameterDirection.Input, DbType.Int64, 10);
            string id = da.ExecuteNonQuerySP("Usp_Designation_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<Designation> Get_AllDesignation(int CompanyID, int LocationID)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("CompanyId", 3, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Designation_Details", parm);
            List<Designation> obj_Lst_Dig = new List<Designation>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Designation obj_Dig = new Designation();
                obj_Dig.DesignationName = dt.Rows[i]["Tdg_Name"].ToString();
                obj_Dig.DesignationId = Convert.ToInt32(dt.Rows[i]["Tdg_Id"]);
                obj_Dig.LevelId = Convert.ToInt32(dt.Rows[i]["Tdg_LevelId"]);
                obj_Dig.LevelName = dt.Rows[i]["Tdg_LevelName"].ToString();
                obj_Lst_Dig.Add(obj_Dig);
            }
            return obj_Lst_Dig;
        }
    }
}
