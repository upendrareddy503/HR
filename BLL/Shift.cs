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
    public class Shift:Group
    {
        DataAccess da = new DataAccess();
        public int ShiftID { get; set; }
        public string ShiftName { get; set; }
        public string ShiftCode { get; set; }
        public string ShiftInTime { get; set; }
        public string ShiftLateInCutTime { get; set; }
        public string ShiftInCutTime { get; set; }
        public string SecShiftInTime { get; set; }
        public string SecShiftLateInTime { get; set; }
        public string SecShiftInCutTime { get; set; }
        public string ShiftOutTime { get; set; }
        public string ShiftOTBefore { get; set; }
        public string ShiftOTAfter { get; set; }
        public string TotalHours { get; set; }
        //public int GroupId { get; set; }
        public int UserId { get; set; }


        public string Insert_Shift(Shift Obj_Shift)
        {

            SqlParameter[] parm = new SqlParameter[14];
            parm[0] = da.AddSPParameter("Tsh_Name", Obj_Shift.ShiftName, ParameterDirection.Input, DbType.String, 100);
            parm[1] = da.AddSPParameter("Tsh_code", Obj_Shift.ShiftCode, ParameterDirection.Input, DbType.String, 100);
            parm[2] = da.AddSPParameter("Tsh_Intime", Obj_Shift.ShiftInTime, ParameterDirection.Input, DbType.Time, 200);
            parm[3] = da.AddSPParameter("Tsh_Lateincutofftime", Obj_Shift.ShiftLateInCutTime, ParameterDirection.Input, DbType.Time, 200);

            parm[4] = da.AddSPParameter("Tsh_Shiftincutofftime", Obj_Shift.ShiftInCutTime, ParameterDirection.Input, DbType.Time, 200);
            parm[5] = da.AddSPParameter("Tsh_SecShiftintime", Obj_Shift.SecShiftInTime, ParameterDirection.Input, DbType.Time, 200);
            parm[6] = da.AddSPParameter("Tsh_Secshiftlateintime", Obj_Shift.SecShiftLateInTime, ParameterDirection.Input, DbType.Time, 200);
            parm[7] = da.AddSPParameter("Tsh_secshiftcutoftime", Obj_Shift.SecShiftInCutTime, ParameterDirection.Input, DbType.Time, 200);

            parm[8] = da.AddSPParameter("Tsh_OutTime", Obj_Shift.ShiftOutTime, ParameterDirection.Input, DbType.Time, 200);
            parm[9] = da.AddSPParameter("Tsh_OTBshift", Obj_Shift.ShiftOTBefore, ParameterDirection.Input, DbType.Time, 200);
            parm[10] = da.AddSPParameter("Tsh_OTAshift", Obj_Shift.ShiftOTAfter, ParameterDirection.Input, DbType.Time, 200);
            parm[11] = da.AddSPParameter("Tsh_Totalhours", Obj_Shift.TotalHours, ParameterDirection.Input, DbType.Decimal, 200);
            parm[12] = da.AddSPParameter("Tsh_GroupId", Obj_Shift.GroupId, ParameterDirection.Input, DbType.Int32, 100);

            parm[13] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Shift_Details", parm);

            return id;
        }
        public string Update_Shift(Shift Obj_Shift)
        {

            SqlParameter[] parm = new SqlParameter[15];
            parm[0] = da.AddSPParameter("Tsh_Name", Obj_Shift.ShiftName, ParameterDirection.Input, DbType.String, 100);
            parm[1] = da.AddSPParameter("Tsh_code", Obj_Shift.ShiftCode, ParameterDirection.Input, DbType.String, 100);
            parm[2] = da.AddSPParameter("Tsh_Intime", Obj_Shift.ShiftInTime, ParameterDirection.Input, DbType.Time, 200);
            parm[3] = da.AddSPParameter("Tsh_Lateincutofftime", Obj_Shift.ShiftLateInCutTime, ParameterDirection.Input, DbType.Time, 200);

            parm[4] = da.AddSPParameter("Tsh_Shiftincutofftime", Obj_Shift.ShiftInCutTime, ParameterDirection.Input, DbType.Time, 200);
            parm[5] = da.AddSPParameter("Tsh_SecShiftintime", Obj_Shift.SecShiftInTime, ParameterDirection.Input, DbType.Time, 200);
            parm[6] = da.AddSPParameter("Tsh_Secshiftlateintime", Obj_Shift.SecShiftLateInTime, ParameterDirection.Input, DbType.Time, 200);
            parm[7] = da.AddSPParameter("Tsh_secshiftcutoftime", Obj_Shift.SecShiftInCutTime, ParameterDirection.Input, DbType.Time, 200);

            parm[8] = da.AddSPParameter("Tsh_OutTime", Obj_Shift.ShiftOutTime, ParameterDirection.Input, DbType.Time, 200);
            parm[9] = da.AddSPParameter("Tsh_OTBshift", Obj_Shift.ShiftOTBefore, ParameterDirection.Input, DbType.Time, 200);
            parm[10] = da.AddSPParameter("Tsh_OTAshift", Obj_Shift.ShiftOTAfter, ParameterDirection.Input, DbType.Time, 200);
            parm[11] = da.AddSPParameter("Tsh_Totalhours", Obj_Shift.TotalHours, ParameterDirection.Input, DbType.Decimal, 200);
            parm[12] = da.AddSPParameter("Tsh_GroupId", Obj_Shift.GroupId, ParameterDirection.Input, DbType.Int32, 100);
            parm[13] = da.AddSPParameter("Tsh_id", Obj_Shift.ShiftID, ParameterDirection.Input, DbType.Int32, 100);

            parm[14] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Shift_Details", parm);

            return id;
        }
        public List<Shift> GetAllShifts()
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt= da.Sp_Datatable("Usp_Shift_Details", parm);
            List<Shift> obj_Shift_lst = new List<Shift>();
           for(int i=0;i<dt.Rows.Count;i++)
            {
                Shift obj_Shift = new Shift();
                obj_Shift.ShiftID = Convert.ToInt32(dt.Rows[i]["Tsh_id"].ToString());
                obj_Shift.ShiftName = dt.Rows[i]["Tsh_Name"].ToString();
                obj_Shift.ShiftCode= dt.Rows[i]["Tsh_code"].ToString();
                obj_Shift.GroupId = Convert.ToInt32(dt.Rows[i]["Tsh_GroupId"].ToString());
                obj_Shift.ShiftInTime = dt.Rows[i]["Tsh_Intime"].ToString();
                obj_Shift.ShiftLateInCutTime= dt.Rows[i]["Tsh_Lateincutofftime"].ToString();
                obj_Shift.ShiftInCutTime= dt.Rows[i]["Tsh_Shiftincutofftime"].ToString();
                obj_Shift.SecShiftInTime= dt.Rows[i]["Tsh_SecShiftintime"].ToString();
                obj_Shift.SecShiftLateInTime= dt.Rows[i]["Tsh_Secshiftlateintime"].ToString();
                obj_Shift.SecShiftInCutTime= dt.Rows[i]["Tsh_secshiftcutoftime"].ToString();
                obj_Shift.ShiftOutTime= dt.Rows[i]["Tsh_OutTime"].ToString();
                obj_Shift.ShiftOTBefore= dt.Rows[i]["Tsh_OTBshift"].ToString();
                obj_Shift.ShiftOTAfter= dt.Rows[i]["Tsh_OTAshift"].ToString();
                obj_Shift.TotalHours = dt.Rows[i]["Tsh_Totalhours"].ToString();
                //obj_Shift.GroupName = dt.Rows[i]["Tgi_Name"].ToString();
                obj_Shift_lst.Add(obj_Shift);
            }
            return obj_Shift_lst;
        }

        public string Delete_Shift(int ShiftID)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tsh_id", ShiftID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", 4, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Shift_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }

        public List<Shift> GetDetails_Shift()
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            DataTable dt = da.Sp_Datatable("Usp_Shift_Details", parm);

            List<Shift> obj_Shift_lst = new List<Shift>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Shift obj_Shift = new Shift();
                obj_Shift.ShiftID = Convert.ToInt32(dt.Rows[i]["Tsh_id"].ToString());
                obj_Shift.ShiftName = dt.Rows[i]["Tsh_Name"].ToString();
                
                obj_Shift_lst.Add(obj_Shift);
            }
            return obj_Shift_lst;
                        
        }


        public List<Shift> GetPunchTimings(int UserId)
        {
            SqlParameter[] parm = new SqlParameter[1];
            //parm[0] = da.AddSPParameter("UserId", UserID, ParameterDirection.Input, DbType.Int32, 10);
            parm[0] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = da.Sp_Datatable("Usp_Shift_Details", parm);
            List<Shift> obj_Shift_lst = new List<Shift>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Shift obj_Shift = new Shift();
                obj_Shift.ShiftID = Convert.ToInt32(dt.Rows[i]["Tsh_id"].ToString());
                obj_Shift.ShiftName = dt.Rows[i]["Tsh_Name"].ToString();
                obj_Shift.ShiftCode = dt.Rows[i]["Tsh_code"].ToString();
                obj_Shift.GroupId = Convert.ToInt32(dt.Rows[i]["Tsh_GroupId"].ToString());
                obj_Shift.ShiftInTime = dt.Rows[i]["Tsh_Intime"].ToString();
                obj_Shift.ShiftLateInCutTime = dt.Rows[i]["Tsh_Lateincutofftime"].ToString();
                obj_Shift.ShiftInCutTime = dt.Rows[i]["Tsh_Shiftincutofftime"].ToString();
                obj_Shift.SecShiftInTime = dt.Rows[i]["Tsh_SecShiftintime"].ToString();
                obj_Shift.SecShiftLateInTime = dt.Rows[i]["Tsh_Secshiftlateintime"].ToString();
                obj_Shift.SecShiftInCutTime = dt.Rows[i]["Tsh_secshiftcutoftime"].ToString();
                obj_Shift.ShiftOutTime = dt.Rows[i]["Tsh_OutTime"].ToString();
                obj_Shift.ShiftOTBefore = dt.Rows[i]["Tsh_OTBshift"].ToString();
                obj_Shift.ShiftOTAfter = dt.Rows[i]["Tsh_OTAshift"].ToString();
                obj_Shift.TotalHours = dt.Rows[i]["Tsh_Totalhours"].ToString();
                //obj_Shift.GroupName = dt.Rows[i]["Tgi_Name"].ToString();
                obj_Shift_lst.Add(obj_Shift);
            }
            return obj_Shift_lst;
        }
    }
}
