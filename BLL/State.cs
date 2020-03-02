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
    public class State: Country
    {
        DataAccess da = new DataAccess();
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string StateGstCode { get; set; }
        public string StateCode { get; set; }

        public string Insert_State(State Obj_State)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("Tsi_Name", Obj_State.StateName, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("Tci_id", Obj_State.CountryId, ParameterDirection.Input, DbType.Int32, 100);
            parm[2] = da.AddSPParameter("Tsi_Gst_code", Obj_State.StateGstCode, ParameterDirection.Input, DbType.Int32, 100);
            parm[3] = da.AddSPParameter("Tsi_code", Obj_State.StateCode, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Tsi_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[5] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_State_Details", parm, true);

            return id;
        }

        public string Update_State(State Obj_State)
        {
            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = da.AddSPParameter("Tsi_Name", Obj_State.StateName, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("Tci_id", Obj_State.CountryId, ParameterDirection.Input, DbType.Int32, 100);
            parm[2] = da.AddSPParameter("Tsi_Gst_code", Obj_State.StateGstCode, ParameterDirection.Input, DbType.Int32, 100);
            parm[3] = da.AddSPParameter("Tsi_code", Obj_State.StateCode, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Tsi_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[5] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64, 10);
            parm[6] = da.AddSPParameter("Tsi_Id", Obj_State.StateId, ParameterDirection.Input, DbType.Int32);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_State_Details", parm, true);

            return id;
        }

        public string Delete_State(int ID)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tsi_Id", ID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Flag", 4, ParameterDirection.Input, DbType.Int64, 10);
            string id = da.ExecuteNonQuerySP("Usp_State_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<State> Get_AllState(int CompanyID, int LocationID)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tsi_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("@Tci_id", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_State_Details", parm);
            List<State> obj_Lst_Stt = new List<State>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                State obj_Stt = new State();
                obj_Stt.CountryId = Convert.ToInt32(dt.Rows[i]["Tci_id"]);
                obj_Stt.CountryName = dt.Rows[i]["Tci_Name"].ToString();
                obj_Stt.StateId = Convert.ToInt32(dt.Rows[i]["Tsi_Id"]);
                obj_Stt.StateName=dt.Rows[i]["Tsi_Name"].ToString();
                obj_Stt.StateCode=dt.Rows[i]["Tsi_code"].ToString();
                obj_Stt.StateGstCode = dt.Rows[i]["Tsi_Gst_code"].ToString();
                obj_Lst_Stt.Add(obj_Stt);
            }
            return obj_Lst_Stt;
        }
    }
}
