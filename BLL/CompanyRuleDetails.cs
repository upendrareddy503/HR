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
    public class CompanyRuleDetails
    {
        DataAccess da = new DataAccess();
        public int TxnId { get; set; }
        public int Tcr_No_Lates_Month { get; set; }
        public int Tcr_Ratio_Late { get; set; }
        public decimal Tcr_Ratio_Absent { get; set; }
        public int Tcr_No_Permission_Month { get; set; }
        public Decimal Tcr_No_Hours_Permission { get; set; }
        public int Tci_Id { get; set; }
        public int Tli_Id { get; set; }
        public int Tcr_UserId { get; set; }
        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }

        public string Insert_ComRules(CompanyRuleDetails obj_comprule)
        {

            SqlParameter[] parm = new SqlParameter[9];
            parm[0] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int64, 20);
            parm[1] = da.AddSPParameter("Tcr_No_Lates_Month", obj_comprule.Tcr_No_Lates_Month, ParameterDirection.Input, DbType.Int32, 20);
            parm[2] = da.AddSPParameter("Tcr_Ratio_Late", obj_comprule.Tcr_Ratio_Late, ParameterDirection.Input, DbType.Int32, 20);
            parm[3] = da.AddSPParameter("Tcr_Ratio_Absent", obj_comprule.Tcr_Ratio_Absent, ParameterDirection.Input, DbType.Decimal, 20);
            parm[4] = da.AddSPParameter("Tcr_No_Permission_Month", obj_comprule.Tcr_No_Permission_Month, ParameterDirection.Input, DbType.Int32, 20);
            parm[5] = da.AddSPParameter("Tcr_No_Hours_Permission", obj_comprule.Tcr_No_Hours_Permission, ParameterDirection.Input, DbType.Decimal, 20);

            parm[6] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int64, 20);
            parm[7] = da.AddSPParameter("Tli_id", 1, ParameterDirection.Input, DbType.Int64, 20);
            parm[8] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);

            string id = da.ExecuteNonQuerySP("Usp_Company_Rules_Details", parm);

            return id;
        }

        public CompanyRuleDetails Get_AllCompruleList(int Tli_id)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tli_id", Tli_id, ParameterDirection.Input, DbType.Int64, 20);
            parm[1] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Company_Rules_Details", parm);
            CompanyRuleDetails Obj_Compr = new CompanyRuleDetails();
            if (dt.Rows.Count > 0)
            {

                Obj_Compr.TxnId = Convert.ToInt32(dt.Rows[0]["TxnId"]);

                Obj_Compr.Tcr_No_Lates_Month = Convert.ToInt32(dt.Rows[0]["Tcr_No_Lates_Month"]);
                Obj_Compr.Tcr_Ratio_Late = Convert.ToInt32(dt.Rows[0]["Tcr_Ratio_Late"].ToString());
                Obj_Compr.Tcr_Ratio_Absent = Convert.ToDecimal(dt.Rows[0]["Tcr_Ratio_Absent"].ToString());
                Obj_Compr.Tcr_No_Permission_Month = Convert.ToInt32(dt.Rows[0]["Tcr_No_Permission_Month"]);
                Obj_Compr.Tcr_No_Hours_Permission = Convert.ToInt32(dt.Rows[0]["Tcr_No_Hours_Permission"]);

            }
            return Obj_Compr;
        }

        public string Update_ComRules(CompanyRuleDetails obj_comprule)
        {
            SqlParameter[] parm = new SqlParameter[8];
           
            parm[0] = da.AddSPParameter("Tcr_No_Lates_Month", obj_comprule.Tcr_No_Lates_Month, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Tcr_Ratio_Late", obj_comprule.Tcr_Ratio_Late, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Tcr_Ratio_Absent", obj_comprule.Tcr_Ratio_Absent, ParameterDirection.Input, DbType.Decimal);

            parm[3] = da.AddSPParameter("Tcr_No_Permission_Month", obj_comprule.Tcr_No_Permission_Month, ParameterDirection.Input, DbType.Int32, 10);
            parm[4] = da.AddSPParameter("Tcr_No_Hours_Permission", obj_comprule.Tcr_No_Hours_Permission, ParameterDirection.Input, DbType.Decimal, 10);
            parm[5] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int64, 20);
            parm[6] = da.AddSPParameter("TxnId", obj_comprule.TxnId, ParameterDirection.Input, DbType.Int32);
            parm[7] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Company_Rules_Details", parm);

            return id;
        }


    }
}
