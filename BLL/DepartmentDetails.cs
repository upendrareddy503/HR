using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLL;

namespace BLL
{
    public class DepartmentDetails
    {
        public int Department_Id { get; set; }
        public string Department_Name { get; set; }
        public int GroupId { get; set; }
        public int Companyid { get; set; }
        public int Locationid { get; set; }
        public int UserId { get; set; }

        DataAccess da = new DataAccess();
        public string Insert_Department(DepartmentDetails Obj_Dep)
        {

            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("Department_Name", Obj_Dep.Department_Name, ParameterDirection.Input, DbType.String, 50);           
            parm[1] = da.AddSPParameter("Userid", Obj_Dep.UserId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("CompanyId", Obj_Dep.Companyid, ParameterDirection.Input, DbType.Int32, 100);
            parm[3] = da.AddSPParameter("LocationId", Obj_Dep.Locationid, ParameterDirection.Input, DbType.Int32, 100);
            parm[4] = da.AddSPParameter("Tgi_Id", Obj_Dep.GroupId, ParameterDirection.Input, DbType.Int32, 100);
            parm[5] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);           
            string id = da.ExecuteNonQuerySP("Usp_Department_Details", parm,true);

            return id.TrimEnd(' ');
        }

        public string Update_Department(DepartmentDetails Obj_Dep)
        {
            SqlParameter[] parm = new SqlParameter[7];
            parm[0] = da.AddSPParameter("Department_Name", Obj_Dep.Department_Name, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("CompanyId", Obj_Dep.Companyid, ParameterDirection.Input, DbType.Int32, 100);
            parm[3] = da.AddSPParameter("LocationId", Obj_Dep.Locationid, ParameterDirection.Input, DbType.Int32, 100);
            parm[4] = da.AddSPParameter("Tgi_Id", Obj_Dep.GroupId, ParameterDirection.Input, DbType.Int32, 100);
            parm[5] = da.AddSPParameter("Tdpi_Id", Obj_Dep.Department_Id, ParameterDirection.Input, DbType.Int32, 100);
            parm[6] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64, 10);
            string id = da.ExecuteNonQuerySP("Usp_Department_Details", parm,true);

            return id.TrimEnd(' ');
        }

        public string Delete_Department(int ID)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tdpi_Id", ID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Flag", 4, ParameterDirection.Input, DbType.Int64, 10);
            string id = da.ExecuteNonQuerySP("Usp_Department_Details", parm,true);
            if (id == null)
            {
                id = string.Empty;
            }
            return id.TrimEnd(' ');
        }


        public List<DepartmentDetails> Get_AllDepartment(int CompanyID, int LocationID,int Userid)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Userid", Userid, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("CompanyId", CompanyID, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", LocationID, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Department_Details", parm);
            List<DepartmentDetails> obj_Lst_Dep = new List<DepartmentDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DepartmentDetails Obj_Dep = new DepartmentDetails();
                Obj_Dep.Department_Id = Convert.ToInt32(dt.Rows[i]["Tdpi_Id"]);
                Obj_Dep.Department_Name = dt.Rows[i]["Tdp_Name"].ToString();
                Obj_Dep.GroupId = Convert.ToInt32(dt.Rows[i]["Tgi_Id"].ToString());
                obj_Lst_Dep.Add(Obj_Dep);
            }
            return obj_Lst_Dep;
        }


        public List<DepartmentDetails> Get_AllDepartment_ID(int CompanyID, int LocationID,int ID)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("CompanyId", 3, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("LocationId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Tdi_Id", ID, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Department_Details", parm);
            List<DepartmentDetails> obj_Lst_Dep = new List<DepartmentDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DepartmentDetails Obj_Dep = new DepartmentDetails();
                Obj_Dep.Department_Id = Convert.ToInt32(dt.Rows[i]["Tdpi_Id"]);
                Obj_Dep.Department_Name = dt.Rows[i]["Tdp_Name"].ToString();
                Obj_Dep.GroupId = Convert.ToInt32(dt.Rows[i]["Tgi_Id"].ToString());
                obj_Lst_Dep.Add(Obj_Dep);
            }
            return obj_Lst_Dep;
        }
    }
}
