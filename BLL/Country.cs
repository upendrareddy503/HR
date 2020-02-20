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
    public class Country
    {
        DataAccess da = new DataAccess();
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public System.DateTime ModifiedDate { get; set; }
        public int UserID { get; set; }
        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }
        ///#region Group Methods

        public string Insert_Country(Country Obj_Contry)
        {

            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tci_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tci_Name", Obj_Contry.CountryName, ParameterDirection.Input, DbType.String, 100);
            parm[2] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Country_Details", parm,true);

            return id.TrimEnd(' ');
        }

        public string Update_Country(Country Obj_Contry)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Tci_Id", Obj_Contry.CountryId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Tci_Name", Obj_Contry.CountryName, ParameterDirection.Input, DbType.String);
            parm[2] = da.AddSPParameter("Tci_Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[3] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Country_Details", parm,true);

            return id.TrimEnd(' '); 
        }

        public string Delete_Country(int GrpId)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tci_Id", GrpId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Tci_Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Country_Details", parm,true);
            if (id == null)
            {
                id = string.Empty;
            }
            return id.TrimEnd(' ');
        }


        public List<Country> Get_AllCountry()
        {
            List<Country> obj_CountryList = new List<Country>();
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tci_Userid", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Country_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Country Cnt = new Country();
                if (dt.Rows[i]["Tci_Id"].ToString() != null && dt.Rows[i]["Tci_Id"].ToString() != "")
                {
                    Cnt.CountryId = Convert.ToInt32(dt.Rows[i]["Tci_Id"]);
                }
                Cnt.CountryName = dt.Rows[i]["Tci_Name"].ToString();


                obj_CountryList.Add(Cnt);
            }

            return obj_CountryList;
        }

        public DataTable Edit_Country(int CountryId)
        {
            DataTable dt = new DataTable();
            SqlParameter[] parm = new SqlParameter[3];

            parm[0] = da.AddSPParameter("Tci_Id", CountryId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Tci_Userid", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", 5, ParameterDirection.Input, DbType.Int64);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            dt = da.Sp_Datatable("Usp_Country_Details", parm);
            return dt;
        }
    }
}
