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
    public class Group
    {
        DataAccess da = new DataAccess();
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int LocationID { get; set; }
        public System.DateTime ModifiedDate { get; set; }
        public int CompanyID { get; set; }
        public Nullable<int> UserID { get; set; }
        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }
         ///#region Group Methods

        public string Insert_Group(Group Obj_Grp)
        {
           
            SqlParameter[] parm = new SqlParameter[5];
            parm[0] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Tli_Id", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Tgi_Name",Obj_Grp.GroupName, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Group_Details",parm,true);

            return id.TrimEnd(' ');
        }

        public string Update_Group(Group Obj_Grp)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("Tgi_Id", Obj_Grp.GroupId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Tgi_Name", Obj_Grp.GroupName, ParameterDirection.Input, DbType.String);
            parm[2] = da.AddSPParameter("userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[3] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32);
            parm[4] = da.AddSPParameter("Tli_Id", 1, ParameterDirection.Input, DbType.Int32);
            parm[5] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Group_Details",parm, true);

            return id.TrimEnd(' ');
        }

        public string Delete_Group(int GrpId, int CompanyID, int LocationID)
        {
            SqlParameter[] parm = new SqlParameter[5];
            parm[0] = da.AddSPParameter("Tgi_Id", GrpId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32);
            parm[3] = da.AddSPParameter("Tli_Id", 1, ParameterDirection.Input, DbType.Int32);
            parm[4] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Group_Details",parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id.TrimEnd(' ');
        }


        public List<Group> Get_AllGroup(int CompanyID, int LocationID)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Tli_Id", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
           
            DataTable dt = new DataTable();
            List<Group> obj_Group = new List<Group>();
            dt = da.Sp_Datatable("Usp_Group_Details",parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Group grp = new Group();
                if (dt.Rows[i]["Tgi_Id"].ToString() != null && dt.Rows[i]["Tgi_Id"].ToString() != "")
                {
                    grp.GroupId = Convert.ToInt32(dt.Rows[i]["Tgi_Id"]);
                }
                grp.GroupName = dt.Rows[i]["Tgi_Name"].ToString();


                obj_Group.Add(grp);
            }

            return obj_Group;
        }

        public DataTable Edit_Group(int GrpId, int CompanyID, int LocationID)
        {
            DataTable dt = new DataTable();
            SqlParameter[] parm = new SqlParameter[5];

            parm[0] = da.AddSPParameter("Tgi_Id", GrpId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32);
            parm[3] = da.AddSPParameter("Tli_Id", 1, ParameterDirection.Input, DbType.Int32);
            parm[4] = da.AddSPParameter("Flag", 5, ParameterDirection.Input, DbType.Int64);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            dt = da.Sp_Datatable("Usp_Group_Details",parm);
            return dt;
        }
    }
}
