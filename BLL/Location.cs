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
    public class Location
    {
        DataAccess da = new DataAccess();
        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }
        public int Tli_Id { get; set; }
        public string Tli_Name { get; set; }
        public string Tli_code { get; set; }
        public DateTime Tli_EstDate { get; set; }
        public string Tli_Address { get; set; }
        public string Tli_City { get; set; }
        public string Tli_District { get; set; }
        public int Tsi_Id { get; set; }
        public int Tci_Id { get; set; }
        public string Tli_phoneno { get; set; }
        public string Tli_EmailId { get; set; }
        public string Tli_Website { get; set; }
        public string Tli_gst { get; set; }
        public string Tli_Pan_no { get; set; }
        public string Tli_Tan { get; set; }
        public string Tli_Esi_no { get; set; }
        public string Tli_pf_no { get; set; }
        public string Tli_otherinfo { get; set; }
        public string Tli_UserId { get; set; }
        public string Tci_Companyid { get; set; }


        public string Insert_Location(Location Obj_Location)
        {

            SqlParameter[] parm = new SqlParameter[20];
            parm[0] = da.AddSPParameter("Tli_Name", Obj_Location.Tli_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tli_code", Obj_Location.Tli_code, ParameterDirection.Input, DbType.String, 10);
            parm[2] = da.AddSPParameter("Tli_Address", Obj_Location.Tli_Address, ParameterDirection.Input, DbType.String, 1000);
            parm[3] = da.AddSPParameter("Tli_City", Obj_Location.Tli_City, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Tli_District", Obj_Location.Tli_District, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tsi_Id", 1, ParameterDirection.Input, DbType.Int32, 5);//Obj_Location.Tsi_Id
            parm[6] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32, 5);//Obj_Location.Tci_Id
            parm[7] = da.AddSPParameter("Tli_phoneno", Obj_Location.Tli_phoneno, ParameterDirection.Input, DbType.String, 15);
            if (Obj_Location.Tli_EstDate == null)
            {
                parm[8] = da.AddSPParameter("Tli_EstDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[8] = da.AddSPParameter("Tli_EstDate", Obj_Location.Tli_EstDate, ParameterDirection.Input, DbType.DateTime, 20);
            }
            parm[9] = da.AddSPParameter("Tli_EmailId", Obj_Location.Tli_EmailId, ParameterDirection.Input, DbType.String, 50);
            parm[10] = da.AddSPParameter("Tli_gst", Obj_Location.Tli_gst, ParameterDirection.Input, DbType.String, 20);
            parm[11] = da.AddSPParameter("Tli_Tan", Obj_Location.Tli_Tan, ParameterDirection.Input, DbType.String, 20);
            parm[12] = da.AddSPParameter("Tli_Pan_no", Obj_Location.Tli_Pan_no, ParameterDirection.Input, DbType.String, 20);
            parm[13] = da.AddSPParameter("Tli_Website", Obj_Location.Tli_Website, ParameterDirection.Input, DbType.String, 100);
            parm[14] = da.AddSPParameter("Tli_Esi_no", Obj_Location.Tli_Esi_no, ParameterDirection.Input, DbType.String, 100);
            parm[15] = da.AddSPParameter("Tli_pf_no", Obj_Location.Tli_pf_no, ParameterDirection.Input, DbType.String, 100);
            parm[16] = da.AddSPParameter("Tli_otherinfo", Obj_Location.Tli_otherinfo, ParameterDirection.Input, DbType.String, 100);
            parm[17] = da.AddSPParameter("Tli_UserId", 1, ParameterDirection.Input, DbType.Int32, 100); //Obj_Location.Tli_UserId
             parm[18] = da.AddSPParameter("Tci_Companyid", 4, ParameterDirection.Input, DbType.Int32, 5);
            parm[19] = da.AddSPParameter("Flag", Flag.Insert, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Location_Details", parm);

            return id;
        }

        public string Update_Location(Location Obj_Location)
        {
            SqlParameter[] parm = new SqlParameter[21];
            parm[0] = da.AddSPParameter("Tli_Name", Obj_Location.Tli_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Tli_code", Obj_Location.Tli_code, ParameterDirection.Input, DbType.String, 10);
            parm[2] = da.AddSPParameter("Tli_Address", Obj_Location.Tli_Address, ParameterDirection.Input, DbType.String, 1000);
            parm[3] = da.AddSPParameter("Tli_City", Obj_Location.Tli_City, ParameterDirection.Input, DbType.String, 100);
            parm[4] = da.AddSPParameter("Tli_District", Obj_Location.Tli_District, ParameterDirection.Input, DbType.String, 100);
            parm[5] = da.AddSPParameter("Tsi_Id", 1, ParameterDirection.Input, DbType.Int32, 5);
            parm[6] = da.AddSPParameter("Tci_Id", 1, ParameterDirection.Input, DbType.Int32, 5);
            parm[7] = da.AddSPParameter("Tli_phoneno", Obj_Location.Tli_phoneno, ParameterDirection.Input, DbType.String, 15);
            if (Obj_Location.Tli_EstDate == null)
            {
                parm[8] = da.AddSPParameter("Tli_EstDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[8] = da.AddSPParameter("Tli_EstDate", Obj_Location.Tli_EstDate, ParameterDirection.Input, DbType.DateTime, 20);
            }
            parm[9] = da.AddSPParameter("Tli_EmailId", Obj_Location.Tli_EmailId, ParameterDirection.Input, DbType.String, 50);
            parm[10] = da.AddSPParameter("Tli_gst", Obj_Location.Tli_gst, ParameterDirection.Input, DbType.String, 20);
            parm[11] = da.AddSPParameter("Tli_Tan", Obj_Location.Tli_Tan, ParameterDirection.Input, DbType.String, 20);
            parm[12] = da.AddSPParameter("Tli_Pan_no", Obj_Location.Tli_Pan_no, ParameterDirection.Input, DbType.String, 20);
            parm[13] = da.AddSPParameter("Tli_Website", Obj_Location.Tli_Website, ParameterDirection.Input, DbType.String, 100);
            parm[14] = da.AddSPParameter("Tli_Esi_no", Obj_Location.Tli_Esi_no, ParameterDirection.Input, DbType.String, 100);
            parm[15] = da.AddSPParameter("Tli_pf_no", Obj_Location.Tli_pf_no, ParameterDirection.Input, DbType.String, 100);
            parm[16] = da.AddSPParameter("Tli_otherinfo", Obj_Location.Tli_otherinfo, ParameterDirection.Input, DbType.String, 100);
            parm[17] = da.AddSPParameter("Tli_UserId", 1, ParameterDirection.Input, DbType.Int32, 100);
            parm[18] = da.AddSPParameter("Tci_Companyid", 4, ParameterDirection.Input, DbType.Int32, 5);
            parm[19] = da.AddSPParameter("Tli_Id", Obj_Location.Tli_Id, ParameterDirection.Input, DbType.Int32, 5);
            parm[20] = da.AddSPParameter("Flag", Flag.Update, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Location_Details", parm);


            return id;
        }

        public string Delete_Location(int LocationId,int CompanyID)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tci_id", CompanyID, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Tli_UserId", 1, ParameterDirection.Input, DbType.Int32);
            parm[2] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Location_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<Location> Get_Location(int userid,int Companyid)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Tci_Companyid", 4, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tli_UserId", userid, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", Flag.Select, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Location_Details", parm);
            List<Location> Obj_Loc = new List<Location>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Location obj_L = new Location();
                if (dt.Rows[i]["Tli_Id"].ToString() != null && dt.Rows[i]["Tli_Id"].ToString() != "")
                {
                    obj_L.Tli_Id = Convert.ToInt32(dt.Rows[i]["Tli_id"]);
                }
                obj_L.Tli_Name = dt.Rows[i]["Tli_Name"].ToString();

                obj_L.Tli_Address = dt.Rows[0]["Tli_Address"].ToString();
                obj_L.Tli_code = dt.Rows[0]["Tli_Code"].ToString();
                obj_L.Tli_District = dt.Rows[0]["Tli_District"].ToString();
                obj_L.Tli_City = dt.Rows[0]["Tli_City"].ToString();
                if (dt.Rows[0]["Tli_EstDate"].ToString() != null && dt.Rows[0]["Tli_EstDate"].ToString() != "")
                {
                    obj_L.Tli_EstDate = Convert.ToDateTime(dt.Rows[0]["Tli_EstDate"].ToString());
                }
                if (dt.Rows[0]["Tsi_Id"].ToString() != null && dt.Rows[0]["Tsi_Id"].ToString() != "")
                {
                    obj_L.Tsi_Id = Convert.ToInt32(dt.Rows[0]["Tsi_Id"]);
                }
                if (dt.Rows[0]["Tci_Id"].ToString() != null && dt.Rows[0]["Tci_Id"].ToString() != "")
                {
                    obj_L.Tci_Id = Convert.ToInt32(dt.Rows[0]["Tci_Id"]);
                }
                obj_L.Tli_gst = dt.Rows[0]["Tli_gst"].ToString();
                obj_L.Tli_Tan = dt.Rows[0]["Tli_Tan"].ToString();
                obj_L.Tli_Pan_no = dt.Rows[0]["Tli_Pan_no"].ToString();
                obj_L.Tli_phoneno = dt.Rows[0]["Tli_phoneno"].ToString();
                obj_L.Tli_EmailId = dt.Rows[0]["Tli_EmailId"].ToString();
                obj_L.Tli_Website = dt.Rows[0]["Tli_Website"].ToString();
                obj_L.Tli_Esi_no = dt.Rows[0]["Tli_Esi_no"].ToString();
                obj_L.Tli_pf_no = dt.Rows[0]["Tli_pf_no"].ToString();
                obj_L.Tli_otherinfo = dt.Rows[0]["Tli_otherinfo"].ToString();

                Obj_Loc.Add(obj_L);
            }
            return Obj_Loc;
        }

        public Location Edit_Location(int Tli_Id,  int CompanyId, int UserId)
        {
            DataTable dtEdit = new DataTable();
            List<Location> Obj_locEdit = new List<Location>();
            Location Obj_loc_E = new Location();
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Tli_Id", Tli_Id, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tci_Companyid", CompanyId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Tli_UserId", UserId, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", Flag.Edit, ParameterDirection.Input, DbType.Int64, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            dtEdit = da.Sp_Datatable("Usp_Location_Details", parm);
            if (dtEdit.Rows.Count > 0)
            {

                if (dtEdit.Rows[0]["Tli_Id"].ToString() != null && dtEdit.Rows[0]["Tli_Id"].ToString() != "")
                {
                    Obj_loc_E.Tli_Id = Convert.ToInt32(dtEdit.Rows[0]["Tli_Id"]);
                }
                Obj_loc_E.Tli_Name = dtEdit.Rows[0]["Tli_Name"].ToString();
                Obj_loc_E.Tli_Address = dtEdit.Rows[0]["Tli_Address"].ToString();
                Obj_loc_E.Tli_code = dtEdit.Rows[0]["Tli_Code"].ToString();
                Obj_loc_E.Tli_District = dtEdit.Rows[0]["Tli_District"].ToString();
                Obj_loc_E.Tli_City = dtEdit.Rows[0]["Tli_City"].ToString();
                if (dtEdit.Rows[0]["Tli_EstDate"].ToString() != null && dtEdit.Rows[0]["Tli_EstDate"].ToString() != "")
                {
                    Obj_loc_E.Tli_EstDate = Convert.ToDateTime(dtEdit.Rows[0]["Tli_EstDate"].ToString());
                }
                if (dtEdit.Rows[0]["Tsi_Id"].ToString() != null && dtEdit.Rows[0]["Tsi_Id"].ToString() != "")
                {
                    Obj_loc_E.Tsi_Id = Convert.ToInt32(dtEdit.Rows[0]["Tsi_Id"]);
                }
                if (dtEdit.Rows[0]["Tci_Id"].ToString() != null && dtEdit.Rows[0]["Tci_Id"].ToString() != "")
                {
                    Obj_loc_E.Tci_Id = Convert.ToInt32(dtEdit.Rows[0]["Tci_Id"]);
                }
                Obj_loc_E.Tli_gst = dtEdit.Rows[0]["Tli_gst"].ToString();
                Obj_loc_E.Tli_Tan = dtEdit.Rows[0]["Tli_Tan"].ToString();
                Obj_loc_E.Tli_Pan_no = dtEdit.Rows[0]["Tli_Pan_no"].ToString();
                Obj_loc_E.Tli_phoneno = dtEdit.Rows[0]["Tli_phoneno"].ToString();
                Obj_loc_E.Tli_EmailId = dtEdit.Rows[0]["Tli_EmailId"].ToString();
                Obj_loc_E.Tli_Website = dtEdit.Rows[0]["Tli_Website"].ToString();
                Obj_loc_E.Tli_Esi_no = dtEdit.Rows[0]["Tli_Esi_no"].ToString();
                Obj_loc_E.Tli_pf_no = dtEdit.Rows[0]["Tli_pf_no"].ToString();
                Obj_loc_E.Tli_otherinfo = dtEdit.Rows[0]["Tli_otherinfo"].ToString();
                //obj_Group.Add(grp);
            }
            return Obj_loc_E;
        }

    }
}
