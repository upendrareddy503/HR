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
   public class Rules
    {
        DataAccess da = new DataAccess();
        public int RulesID { get; set; }
        public string RulesName { get; set; }

        public List<Rules> GetDetails_Rules()
        {
            SqlParameter[] parm = new SqlParameter[1];
            parm[0] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            DataTable dt = da.Sp_Datatable("Usp_Rules_Details", parm);

            List<Rules> obj_Rules_lst = new List<Rules>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Rules obj_Rules = new Rules();
                obj_Rules.RulesID = Convert.ToInt32(dt.Rows[i]["Ter_id"].ToString());
                obj_Rules.RulesName = dt.Rows[i]["Ter_Name"].ToString();

                obj_Rules_lst.Add(obj_Rules);
            }
            return obj_Rules_lst;

        }
    }
}
