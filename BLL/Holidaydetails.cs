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
   public class Holidaydetails
    {
        DataAccess da = new DataAccess();
        public int Thi_id { get; set; }
        public string Thi_Name { get; set; }
        public int Thi_Year { get; set; }
        public DateTime Thi_Date { get; set; }
       // public Nullable<DateTime> Thi_Date { get; set; }
        
        public DateTime Thi_Modified_date { get; set; }
        public int Thi_Userid { get; set; }
        public int Thi_CompanyId { get; set; }
        public int Thi_LocationId { get; set; }
        public bool Thi_Type { get; set; }


        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }

        public string Insert_HolidayName(Holidaydetails Obj_Holi)
        {

            SqlParameter[] parm = new SqlParameter[8];
            parm[0] = da.AddSPParameter("Thi_Name", Obj_Holi.Thi_Name, ParameterDirection.Input, DbType.String, 200);
            parm[1] = da.AddSPParameter("Thi_Year", Obj_Holi.Thi_Year, ParameterDirection.Input, DbType.Int32, 5);
            if (Obj_Holi.Thi_Date == null)
            {
                parm[2] = da.AddSPParameter("Thi_Date", Obj_Holi.Thi_Date, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[2] = da.AddSPParameter("Thi_Date", Obj_Holi.Thi_Date, ParameterDirection.Input, DbType.DateTime, 20);
            }
            parm[3] = da.AddSPParameter("Thi_Userid", Obj_Holi.Thi_Userid, ParameterDirection.Input, DbType.Int32, 100); //Obj_Location.Tli_UserId
            parm[4] = da.AddSPParameter("Thi_Company", Obj_Holi.Thi_CompanyId, ParameterDirection.Input, DbType.Int32, 5);
            parm[5] = da.AddSPParameter("Thi_Location", Obj_Holi.Thi_LocationId, ParameterDirection.Input, DbType.String, 100);
            parm[6] = da.AddSPParameter("Thi_Type", Obj_Holi.Thi_Type, ParameterDirection.Input, DbType.Boolean, 100);
            
            parm[7] = da.AddSPParameter("Flag", Flag.Insert, ParameterDirection.Input, DbType.Int32, 10);
          
            string id = da.ExecuteNonQuerySP("Usp_Holiday_Details", parm, true);

            return id.TrimEnd(' ');
        }
        public string Update_HolidayName(Holidaydetails Obj_Holi)
        {
            SqlParameter[] parm = new SqlParameter[9];
            parm[0] = da.AddSPParameter("Thi_id", Obj_Holi.Thi_id, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Thi_Name", Obj_Holi.Thi_Name, ParameterDirection.Input, DbType.String);
            parm[2] = da.AddSPParameter("Thi_Year", Obj_Holi.Thi_Year, ParameterDirection.Input, DbType.Int32);
            if (Obj_Holi.Thi_Date == null)
            {
                parm[3] = da.AddSPParameter("Thi_Date", Obj_Holi.Thi_Date, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[3] = da.AddSPParameter("Thi_Date", Obj_Holi.Thi_Date, ParameterDirection.Input, DbType.DateTime, 20);
            }

            parm[4] = da.AddSPParameter("Thi_Userid", Obj_Holi.Thi_Userid, ParameterDirection.Input, DbType.Int32, 100); //Obj_Location.Tli_UserId
            parm[5] = da.AddSPParameter("Thi_Company", Obj_Holi.Thi_CompanyId, ParameterDirection.Input, DbType.Int32, 5);
            parm[6] = da.AddSPParameter("Thi_Location", Obj_Holi.Thi_LocationId, ParameterDirection.Input, DbType.String, 100);
            parm[7] = da.AddSPParameter("Thi_Type", Obj_Holi.Thi_Type, ParameterDirection.Input, DbType.Boolean, 100);
            parm[8] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Holiday_Details", parm, true);

            return id;
        }


        public List<Holidaydetails> Get_AllHolidays(int Thi_Location, int Companyid)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Thi_Company", Companyid, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Thi_Location", Thi_Location, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", Flag.Select, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Holiday_Details", parm);
            List<Holidaydetails> Obj_Hol = new List<Holidaydetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Holidaydetails obj_H = new Holidaydetails();
                if (dt.Rows[i]["Thi_id"].ToString() != null && dt.Rows[i]["Thi_id"].ToString() != "")
                {
                    obj_H.Thi_id = Convert.ToInt32(dt.Rows[i]["Thi_id"]);
                }
                obj_H.Thi_Name = dt.Rows[i]["Thi_Name"].ToString();

                if (dt.Rows[i]["Thi_Date"].ToString() != null && dt.Rows[i]["Thi_Date"].ToString() != "")
                {
                    obj_H.Thi_Date = Convert.ToDateTime(dt.Rows[i]["Thi_Date"]);
                }
                else
                {

                }
                obj_H.Thi_Year = Convert.ToInt32(dt.Rows[i]["Thi_Year"]);
                obj_H.Thi_Type = Convert.ToBoolean(dt.Rows[i]["Thi_Type"]);
                Obj_Hol.Add(obj_H);
            }
            return Obj_Hol;
        }

        public string Delete_Holiday(int Thi_id)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Thi_id", Thi_id, ParameterDirection.Input, DbType.Int32, 10);
           
            parm[1] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
           
            string id = da.ExecuteNonQuerySP("Usp_Holiday_Details", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }


        public List<Holidaydetails> Get_DahbordHolidays(int Thi_Location, int Companyid)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("Thi_Company", Companyid, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Thi_Location", Thi_Location, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Holiday_Details", parm);
            List<Holidaydetails> Obj_Hol = new List<Holidaydetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Holidaydetails obj_H = new Holidaydetails();
                
                obj_H.Thi_Name = dt.Rows[i]["Thi_Name"].ToString();

                if (dt.Rows[i]["Thi_Date"].ToString() != null && dt.Rows[i]["Thi_Date"].ToString() != "")
                {
                    obj_H.Thi_Date = Convert.ToDateTime(dt.Rows[i]["Thi_Date"]);
                }
                else
                {

                }
               
                obj_H.Thi_Type = Convert.ToBoolean(dt.Rows[i]["Thi_Type"]);
                Obj_Hol.Add(obj_H);
            }
            return Obj_Hol;
        }


    }
}
