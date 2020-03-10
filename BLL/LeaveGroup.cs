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
    public class LeaveGroup:Group
    {
        DataAccess da = new DataAccess();
        public int LId { get; set; }
        public string LName { get; set; }
        public string LCode { get; set; }
        public int LNoDays { get; set; }
        public string LType { get; set; }
        public string LProperty { get; set; }
        public int LAvailMax { get; set; }
        public int LAvailMin { get; set; }
        public int LNoTimeAvail { get; set; }
        public string LSandwich { get; set; }
        public int LAdvancelive { get; set; }
        public string Lprefixed { get; set; }


        public string Insert_Leaves(LeaveGroup Obj_Leav)
        {

            SqlParameter[] parm = new SqlParameter[16];
            parm[0] = da.AddSPParameter("Tli_Name", Obj_Leav.LName, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tli_Code", Obj_Leav.LCode, ParameterDirection.Input, DbType.String, 10);            

            parm[2] = da.AddSPParameter("Tli_Nodays", Obj_Leav.LNoDays, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Tli_Type", Obj_Leav.LType, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Tli_property", Obj_Leav.LProperty, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tli_availedmax", Obj_Leav.LAvailMax, ParameterDirection.Input, DbType.Int32, 5);
            parm[6] = da.AddSPParameter("Tli_availedmin", Obj_Leav.LAvailMin, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tli_NoTimeavailed", Obj_Leav.LNoTimeAvail, ParameterDirection.Input, DbType.Int32, 15);           
            parm[8] = da.AddSPParameter("Tli_sandwich", Obj_Leav.LSandwich, ParameterDirection.Input, DbType.String, 50);
            parm[9] = da.AddSPParameter("Tli_advancelive", Obj_Leav.LAdvancelive, ParameterDirection.Input, DbType.Int32, 10);
            parm[10] = da.AddSPParameter("Tli_prefixed", Obj_Leav.Lprefixed, ParameterDirection.Input, DbType.String, 20);
            parm[11] = da.AddSPParameter("Tli_Groupid", Obj_Leav.GroupId, ParameterDirection.Input, DbType.String, 20);
            parm[12] = da.AddSPParameter("Tli_companyid", Obj_Leav.CompanyID, ParameterDirection.Input, DbType.String, 100);
            parm[13] = da.AddSPParameter("Tli_location", Obj_Leav.LocationID, ParameterDirection.Input, DbType.Int32, 5);
            parm[14] = da.AddSPParameter("UserId", Obj_Leav.UserID, ParameterDirection.Input, DbType.Int32, 5);
            parm[15] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Leave_Details", parm);

            return id;
        }
        public string Update_Leaves(LeaveGroup Obj_Leav)
        {

            SqlParameter[] parm = new SqlParameter[17];
            parm[0] = da.AddSPParameter("Tli_Name", Obj_Leav.LName, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tli_Code", Obj_Leav.LCode, ParameterDirection.Input, DbType.String, 10);

            parm[2] = da.AddSPParameter("Tli_Nodays", Obj_Leav.LNoDays, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Tli_Type", Obj_Leav.LType, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Tli_property", Obj_Leav.LProperty, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tli_availedmax", Obj_Leav.LAvailMax, ParameterDirection.Input, DbType.Int32, 5);
            parm[6] = da.AddSPParameter("Tli_availedmin", Obj_Leav.LAvailMin, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tli_NoTimeavailed", Obj_Leav.LNoTimeAvail, ParameterDirection.Input, DbType.Int32, 15);
            parm[8] = da.AddSPParameter("Tli_sandwich", Obj_Leav.LSandwich, ParameterDirection.Input, DbType.String, 50);
            parm[9] = da.AddSPParameter("Tli_advancelive", Obj_Leav.LAdvancelive, ParameterDirection.Input, DbType.Int32, 10);
            parm[10] = da.AddSPParameter("Tli_prefixed", Obj_Leav.Lprefixed, ParameterDirection.Input, DbType.String, 20);
            parm[11] = da.AddSPParameter("Tli_Groupid", Obj_Leav.GroupId, ParameterDirection.Input, DbType.String, 20);
            parm[12] = da.AddSPParameter("Tli_companyid", Obj_Leav.CompanyID, ParameterDirection.Input, DbType.String, 100);
            parm[13] = da.AddSPParameter("Tli_location", Obj_Leav.LocationID, ParameterDirection.Input, DbType.Int32, 5);
            parm[14] = da.AddSPParameter("UserId", Obj_Leav.UserID, ParameterDirection.Input, DbType.Int32, 5);
            parm[15] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
            parm[16] = da.AddSPParameter("Tli_Id", Obj_Leav.LId, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Leave_Details", parm);

            return id;
        }

        public string Delete_Leave(int Id)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tli_Id", Id, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Leave_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<LeaveGroup> GetAllLeaves()
        {
            List<LeaveGroup> Obj_leave = new List<LeaveGroup>();
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Flag", Flag.Select, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Leave_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                LeaveGroup obj_l = new LeaveGroup();
                if (dt.Rows[i]["Tli_Id"].ToString() != null && dt.Rows[i]["Tli_Id"].ToString() != "")
                {
                    obj_l.LId = Convert.ToInt32(dt.Rows[i]["Tli_Id"]);
                }
                obj_l.LName = dt.Rows[i]["Tli_Name"].ToString();
                obj_l.LCode = dt.Rows[i]["Tli_Code"].ToString();
                if (dt.Rows[i]["Tli_Nodays"].ToString() != null && dt.Rows[i]["Tli_Nodays"].ToString() != "")                
                    obj_l.LNoDays = Convert.ToInt32(dt.Rows[i]["Tli_Nodays"]);
                obj_l.LType = dt.Rows[i]["Tli_Type"].ToString();
                obj_l.LProperty = dt.Rows[i]["Tli_property"].ToString();
                if (dt.Rows[i]["Tli_availedmax"].ToString() != null && dt.Rows[i]["Tli_availedmax"].ToString() != "")
                    obj_l.LAvailMax = Convert.ToInt32(dt.Rows[i]["Tli_availedmax"]);
                if (dt.Rows[i]["Tli_availedmin"].ToString() != null && dt.Rows[i]["Tli_availedmin"].ToString() != "")
                    obj_l.LAvailMin = Convert.ToInt32(dt.Rows[i]["Tli_availedmin"]);
                if (dt.Rows[i]["Tli_NoTimeavailed"].ToString() != null && dt.Rows[i]["Tli_NoTimeavailed"].ToString() != "")
                    obj_l.LNoTimeAvail = Convert.ToInt32(dt.Rows[i]["Tli_NoTimeavailed"]);
                obj_l.LSandwich = dt.Rows[i]["Tli_sandwich"].ToString();
                if (dt.Rows[i]["Tli_advancelive"].ToString() != null && dt.Rows[i]["Tli_advancelive"].ToString() != "")
                    obj_l.LAdvancelive = Convert.ToInt32(dt.Rows[i]["Tli_advancelive"]);
                obj_l.Lprefixed = dt.Rows[i]["Tli_prefixed"].ToString();
                if (dt.Rows[i]["Tli_Groupid"].ToString() != null && dt.Rows[i]["Tli_Groupid"].ToString() != "")
                    obj_l.GroupId= Convert.ToInt32(dt.Rows[i]["Tli_Groupid"]);
                Obj_leave.Add(obj_l);
            }

            return Obj_leave;
        }
    }
}
