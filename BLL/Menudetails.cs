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
   public class Menudetails
    {
        DataAccess da = new DataAccess();
        public int TxnId { get; set; }
        public int CompanyID { get; set; }
        public string Description { get; set; }
        public string Url_Name { get; set; }
        public string Code { get; set; }        
       // public System.DateTime ModifiedDate { get; set; }      
        public int Order_No { get; set; }

        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }
        public string Insert_Menu(Menudetails Obj_Menu)
        {

            SqlParameter[] parm = new SqlParameter[5];
           // parm[0] = da.AddSPParameter("TxnId", 1, ParameterDirection.Input, DbType.Int32, 10);           
            parm[0] = da.AddSPParameter("Description", Obj_Menu.Description, ParameterDirection.Input, DbType.String, 100);
            parm[1] = da.AddSPParameter("Url_Name", Obj_Menu.Url_Name, ParameterDirection.Input, DbType.String, 100);
            parm[2] = da.AddSPParameter("Code", Obj_Menu.Code, ParameterDirection.Input, DbType.String, 100);
            parm[3] = da.AddSPParameter("Order_No", Obj_Menu.Order_No, ParameterDirection.Input, DbType.Int32, 10);
            parm[4] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Menu", parm);

            return id;
        }
        public string Update_Menu(Menudetails Obj_Menu)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("TxnId", Obj_Menu.TxnId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Description", Obj_Menu.Description, ParameterDirection.Input, DbType.String);
            parm[2] = da.AddSPParameter("Url_Name", Obj_Menu.Url_Name, ParameterDirection.Input, DbType.String);
            parm[3] = da.AddSPParameter("Code", Obj_Menu.Code, ParameterDirection.Input, DbType.String);

            parm[4] = da.AddSPParameter("Order_No", Obj_Menu.Order_No, ParameterDirection.Input, DbType.Int32, 10);
            parm[5] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Menu", parm);

            return id;
        }




        public List<Menudetails> Get_AllMenulist(int CompanyID)
        {
            SqlParameter[] parm = new SqlParameter[3];          
            parm[0] = da.AddSPParameter("TxnId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Order_No", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();
            List<Menudetails> obj_M = new List<Menudetails>();
            dt = da.Sp_Datatable("Usp_Menu", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Menudetails menulist = new Menudetails();              
                menulist.Description = dt.Rows[i]["Description"].ToString();
                        menulist.Url_Name = dt.Rows[i]["Url_Name"].ToString();
                    menulist.Code = dt.Rows[i]["Code"].ToString();
                       menulist.Order_No = Convert.ToInt32(dt.Rows[i]["Order_No"]);
                menulist.TxnId = Convert.ToInt32(dt.Rows[i]["TxnId"]);


                obj_M.Add(menulist);
            }

            return obj_M;
        }

        public string Delete_Menu(int TxnId)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("TxnId", TxnId, ParameterDirection.Input, DbType.Int32, 10);
            //parm[1] = da.AddSPParameter("Order_No", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Flag", (int)Flag.Delete, ParameterDirection.Input, DbType.Int64);
            //parm[5] = da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Menu", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }

        //public DataTable Edit_Menu(int CompanyId, int UserId)
        //{
        //    DataTable dt = new DataTable();
        //    SqlParameter[] parm = new SqlParameter[3];

        //    parm[0] = da.AddSPParameter("TxnId", 1, ParameterDirection.Input, DbType.Int32, 10);
        //    parm[1] = da.AddSPParameter("Order_No", 1, ParameterDirection.Input, DbType.Int32, 10);
        //    parm[2] = da.AddSPParameter("Flag", Flag.Edit, ParameterDirection.Input, DbType.Int64, 10);
        //    //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
        //    dt = da.Sp_Datatable("Usp_Menu", parm);
        //    return dt;
        //}


    }
}
