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
   public class LeaveEntry
    {
        DataAccess da = new DataAccess();
        public int LId { get; set; }
        public int Tle_EntryType { get; set; }
        public DateTime Tle_EntryDate { get; set; }
        public string Tle_Reason { get; set; }
        public int Tle_Type_Permission { get; set; }
        public DateTime Tle_FromDate { get; set; }
        public DateTime Tle_ToDate { get; set; }
        public int Tle_NoOfDays { get; set; }
        public DateTime Tle_FromTime { get; set; }
        public DateTime Tle_ToTime { get; set; }
        public int Tle_NoOfHours { get; set; }
        public int Tle_Type_Leave { get; set; }
        public int Tei_Id { get; set; }
        public int Tle_UserId { get; set; }

        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }

        public string Insert_Leaves_entry(LeaveEntry Obj_Leav_Entry)
        {

            SqlParameter[] parm = new SqlParameter[14];
            parm[0] = da.AddSPParameter("Tle_EntryType", Obj_Leav_Entry.Tle_EntryType, ParameterDirection.Input, DbType.Int32, 1);
            parm[1] = da.AddSPParameter("Tle_EntryDate", Obj_Leav_Entry.Tle_EntryDate, ParameterDirection.Input, DbType.DateTime, 20);

            parm[2] = da.AddSPParameter("Tle_Reason", Obj_Leav_Entry.Tle_Reason, ParameterDirection.Input, DbType.String, 200);
            parm[3] = da.AddSPParameter("Tle_Type_Permission", Obj_Leav_Entry.Tle_Type_Permission, ParameterDirection.Input, DbType.Int32, 10);
            parm[4] = da.AddSPParameter("Tle_FromDate", Obj_Leav_Entry.Tle_FromDate, ParameterDirection.Input, DbType.DateTime, 100);
            parm[5] = da.AddSPParameter("Tle_ToDate", Obj_Leav_Entry.Tle_ToDate, ParameterDirection.Input, DbType.DateTime, 100);
            parm[6] = da.AddSPParameter("Tle_NoOfDays", Obj_Leav_Entry.Tle_NoOfDays, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tle_FromTime", Obj_Leav_Entry.Tle_FromTime, ParameterDirection.Input, DbType.Time, 15);
            parm[8] = da.AddSPParameter("Tle_ToTime", Obj_Leav_Entry.Tle_ToTime, ParameterDirection.Input, DbType.String, 50);
            parm[9] = da.AddSPParameter("Tle_NoOfHours", Obj_Leav_Entry.Tle_NoOfHours, ParameterDirection.Input, DbType.Int32, 10);
            parm[10] = da.AddSPParameter("Tle_Type_Leave", Obj_Leav_Entry.Tle_Type_Leave, ParameterDirection.Input, DbType.Int32, 20);
            parm[11] = da.AddSPParameter("Tei_Id", Obj_Leav_Entry.Tei_Id, ParameterDirection.Input, DbType.Int32, 20);
            parm[12] = da.AddSPParameter("Tle_UserId", Obj_Leav_Entry.Tle_UserId, ParameterDirection.Input, DbType.Int32, 5);
            parm[13] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Leave_Entry_Details", parm);

            return id;
        }
        public string Update_Leaves_entry(LeaveEntry Obj_Leav_Entry)
        {

            SqlParameter[] parm = new SqlParameter[15];

            parm[0] = da.AddSPParameter("Tle_EntryType", Obj_Leav_Entry.Tle_EntryType, ParameterDirection.Input, DbType.Int32, 1);
            parm[1] = da.AddSPParameter("Tle_EntryDate", Obj_Leav_Entry.Tle_EntryDate, ParameterDirection.Input, DbType.DateTime, 20);

            parm[2] = da.AddSPParameter("Tle_Reason", Obj_Leav_Entry.Tle_Reason, ParameterDirection.Input, DbType.String, 200);
            parm[3] = da.AddSPParameter("Tle_Type_Permission", Obj_Leav_Entry.Tle_Type_Permission, ParameterDirection.Input, DbType.Int32, 10);
            parm[4] = da.AddSPParameter("Tle_FromDate", Obj_Leav_Entry.Tle_FromDate, ParameterDirection.Input, DbType.DateTime, 100);
            parm[5] = da.AddSPParameter("Tle_ToDate", Obj_Leav_Entry.Tle_ToDate, ParameterDirection.Input, DbType.DateTime, 100);
            parm[6] = da.AddSPParameter("Tle_NoOfDays", Obj_Leav_Entry.Tle_NoOfDays, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tle_FromTime", Obj_Leav_Entry.Tle_FromTime, ParameterDirection.Input, DbType.Time, 15);
            parm[8] = da.AddSPParameter("Tle_ToTime", Obj_Leav_Entry.Tle_ToTime, ParameterDirection.Input, DbType.String, 50);
            parm[9] = da.AddSPParameter("Tle_NoOfHours", Obj_Leav_Entry.Tle_NoOfHours, ParameterDirection.Input, DbType.Int32, 10);
            parm[10] = da.AddSPParameter("Tle_Type_Leave", Obj_Leav_Entry.Tle_Type_Leave, ParameterDirection.Input, DbType.Int32, 20);
            parm[11] = da.AddSPParameter("Tei_Id", Obj_Leav_Entry.Tei_Id, ParameterDirection.Input, DbType.Int32, 20);
            parm[12] = da.AddSPParameter("Tle_UserId", Obj_Leav_Entry.Tle_UserId, ParameterDirection.Input, DbType.Int32, 5);
            parm[13] = da.AddSPParameter("LId", Obj_Leav_Entry.LId, ParameterDirection.Input, DbType.Int32, 100);
            parm[14] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Leave_Entry_Details", parm);
            return id;
        }

        public string Delete_Leave_entry(int Id)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("LId", Id, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Leave_Entry_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<LeaveEntry> GetAllLeaves_Entry()
        {
            List<LeaveEntry> Obj_leave = new List<LeaveEntry>();
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Flag", Flag.Select, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Leave_Entry_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                LeaveEntry obj_l = new LeaveEntry();
                if (dt.Rows[i]["TxnId"].ToString() != null && dt.Rows[i]["TxnId"].ToString() != "")
                {
                    obj_l.LId = Convert.ToInt32(dt.Rows[i]["TxnId"]);
                }
                obj_l.Tle_EntryType = Convert.ToInt32(dt.Rows[i]["Tle_EntryType"].ToString());
                obj_l.Tle_EntryDate = Convert.ToDateTime(dt.Rows[i]["Tle_EntryDate"].ToString());
                if (dt.Rows[i]["Tle_Reason"].ToString() != null && dt.Rows[i]["Tle_Reason"].ToString() != "")
                    obj_l.Tle_Reason = dt.Rows[i]["Tle_Reason"].ToString();
                obj_l.Tle_Type_Permission = Convert.ToInt32(dt.Rows[i]["Tli_Type"].ToString());
                obj_l.Tle_FromDate = Convert.ToDateTime(dt.Rows[i]["Tle_FromDate"].ToString());
                if (dt.Rows[i]["Tle_ToDate"].ToString() != null && dt.Rows[i]["Tle_ToDate"].ToString() != "")
                    obj_l.Tle_ToDate = Convert.ToDateTime(dt.Rows[i]["Tle_ToDate"]);
                if (dt.Rows[i]["Tle_NoOfDays"].ToString() != null && dt.Rows[i]["Tle_NoOfDays"].ToString() != "")
                    obj_l.Tle_NoOfDays = Convert.ToInt32(dt.Rows[i]["Tle_NoOfDays"]);
                if (dt.Rows[i]["Tle_FromTime"].ToString() != null && dt.Rows[i]["Tle_FromTime"].ToString() != "")
                    obj_l.Tle_FromTime = Convert.ToDateTime(dt.Rows[i]["Tle_FromTime"]);
                obj_l.Tle_ToTime = Convert.ToDateTime(dt.Rows[i]["Tle_ToTime"].ToString());
                if (dt.Rows[i]["Tle_NoOfHours"].ToString() != null && dt.Rows[i]["Tle_NoOfHours"].ToString() != "")
                    obj_l.Tle_NoOfHours = Convert.ToInt32(dt.Rows[i]["Tle_NoOfHours"]);
                obj_l.Tle_Type_Leave = Convert.ToInt32(dt.Rows[i]["Tle_Type_Leave"].ToString());
                if (dt.Rows[i]["Tei_Id"].ToString() != null && dt.Rows[i]["Tei_Id"].ToString() != "")
                    obj_l.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                Obj_leave.Add(obj_l);
            }

            return Obj_leave;
        }

    }
}
