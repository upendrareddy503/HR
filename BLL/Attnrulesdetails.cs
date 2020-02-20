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
   public class Attnrulesdetails
    {
        DataAccess da = new DataAccess();
        public Int64 TxnId { get; set; }
       public int Tgi_Id { get; set; }
        public decimal Tar_Cutoff_Day { get; set; }
        public decimal Tar_Ratio_NormalDay { get; set; }
        public decimal Tar_Ratio_WeekDay { get; set; }
        public decimal Tar_Compoff { get; set; }
        public int Tar_leave_approve { get; set; }
        public int Tar_OD_approve { get; set; }
        public string Tar_Earned_LeaveTyp { get; set; }
        public decimal Tar_Earned_Value { get; set; }
        public int UserId { get; set; }

        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }

        public string Insert_AttnRules(Attnrulesdetails obj_attnrules)
        {

            SqlParameter[] parm = new SqlParameter[12];
            parm[0] = da.AddSPParameter("Tgi_Id", 7, ParameterDirection.Input, DbType.Int64, 20);
            parm[1] = da.AddSPParameter("Tar_Cutoff_Day", obj_attnrules.Tar_Cutoff_Day, ParameterDirection.Input, DbType.Decimal, 20);
            parm[2] = da.AddSPParameter("Tar_Ratio_NormalDay", obj_attnrules.Tar_Ratio_NormalDay, ParameterDirection.Input, DbType.Decimal, 20);
            parm[3] = da.AddSPParameter("Tar_Ratio_WeekDay", obj_attnrules.Tar_Ratio_WeekDay, ParameterDirection.Input, DbType.Decimal, 20);
            parm[4] = da.AddSPParameter("Tar_Compoff", obj_attnrules.Tar_Compoff, ParameterDirection.Input, DbType.Decimal, 20);
            parm[5] = da.AddSPParameter("Tar_leave_approve", obj_attnrules.Tar_leave_approve, ParameterDirection.Input, DbType.Int64, 20);
            parm[6] = da.AddSPParameter("Tar_OD_approve", obj_attnrules.Tar_OD_approve, ParameterDirection.Input, DbType.Int64, 20);
            parm[7] = da.AddSPParameter("Tar_Earned_LeaveTyp", obj_attnrules.Tar_Earned_LeaveTyp, ParameterDirection.Input, DbType.String, 20);
            parm[8] = da.AddSPParameter("Tar_Earned_Value", obj_attnrules.Tar_Earned_Value, ParameterDirection.Input, DbType.Decimal, 20);
            parm[9] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int64, 20);
           parm[10] = da.AddSPParameter("TxnId", 3, ParameterDirection.Input, DbType.Int64, 20);
            parm[11] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);

            string id = da.ExecuteNonQuerySP("Usp_Attendance_Rules_Details", parm);

            return id;
        }


        public Attnrulesdetails Get_AllAtnruleList(int Tgi_Id)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tgi_Id", Tgi_Id, ParameterDirection.Input, DbType.Int64, 20);
            parm[1] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Attendance_Rules_Details", parm);
            Attnrulesdetails Obj_Attnr = new Attnrulesdetails();
            if (dt.Rows.Count > 0)
            {

                Obj_Attnr.TxnId = Convert.ToInt32(dt.Rows[0]["TxnId"]);
                Obj_Attnr.Tgi_Id = Convert.ToInt32(dt.Rows[0]["Tgi_Id"]);

                Obj_Attnr.Tar_Cutoff_Day = Convert.ToInt32(dt.Rows[0]["Tar_Cutoff_Day"]);
                Obj_Attnr.Tar_Ratio_NormalDay = Convert.ToDecimal(dt.Rows[0]["Tar_Ratio_NormalDay"].ToString());
                Obj_Attnr.Tar_Ratio_WeekDay = Convert.ToDecimal(dt.Rows[0]["Tar_Ratio_WeekDay"].ToString());
                Obj_Attnr.Tar_Compoff = Convert.ToInt32(dt.Rows[0]["Tar_Compoff"]);
                Obj_Attnr.Tar_leave_approve = Convert.ToInt32(dt.Rows[0]["Tar_leave_approve"]);
                Obj_Attnr.Tar_OD_approve = Convert.ToInt32(dt.Rows[0]["Tar_OD_approve"]);
                Obj_Attnr.Tar_Earned_LeaveTyp = dt.Rows[0]["Tar_Earned_LeaveTyp"].ToString();
                Obj_Attnr.Tar_Earned_Value = Convert.ToDecimal(dt.Rows[0]["Tar_Earned_Value"]);

            }
            return Obj_Attnr;
        }
        public string Update_AttnrRules(Attnrulesdetails obj_attnrules)
        {
            SqlParameter[] parm = new SqlParameter[12];

            parm[0] = da.AddSPParameter("Tgi_Id", Tgi_Id , ParameterDirection.Input, DbType.Int64, 20);
            parm[1] = da.AddSPParameter("Tar_Cutoff_Day", obj_attnrules.Tar_Cutoff_Day, ParameterDirection.Input, DbType.Decimal, 20);
            parm[2] = da.AddSPParameter("Tar_Ratio_NormalDay", obj_attnrules.Tar_Ratio_NormalDay, ParameterDirection.Input, DbType.Decimal, 20);
            parm[3] = da.AddSPParameter("Tar_Ratio_WeekDay", obj_attnrules.Tar_Ratio_WeekDay, ParameterDirection.Input, DbType.Decimal, 20);
            parm[4] = da.AddSPParameter("Tar_Compoff", obj_attnrules.Tar_Compoff, ParameterDirection.Input, DbType.Decimal, 20);
            parm[5] = da.AddSPParameter("Tar_leave_approve", obj_attnrules.Tar_leave_approve, ParameterDirection.Input, DbType.Int64, 20);
            parm[6] = da.AddSPParameter("Tar_OD_approve", obj_attnrules.Tar_OD_approve, ParameterDirection.Input, DbType.Int64, 20);
            parm[7] = da.AddSPParameter("Tar_Earned_LeaveTyp", obj_attnrules.Tar_Earned_LeaveTyp, ParameterDirection.Input, DbType.String, 20);
            parm[8] = da.AddSPParameter("Tar_Earned_Value", obj_attnrules.Tar_Earned_Value, ParameterDirection.Input, DbType.Decimal, 20);
            parm[9] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int64, 20);

            parm[10] = da.AddSPParameter("TxnId", obj_attnrules.TxnId, ParameterDirection.Input, DbType.Int32);
            parm[11] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Attendance_Rules_Details", parm);



         
            return id;
        }



    }
}
