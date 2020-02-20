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
    public class SubMenudetails:Menudetails
    {
        DataAccess da = new DataAccess();
      //  public int SubMenu_Id { get; set; }
        public string Description { get; set; }
        public string Url_Name { get; set; }
        public int Order_No { get; set; }
        public int MainMenuId { get; set; }
        public string MenuName { get; set; }
        public int TxnId { get; set; }

        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }

        public string Insert_SubMenu(SubMenudetails obj_SMenu)
        {

            SqlParameter[] parm = new SqlParameter[5];
            parm[0] = da.AddSPParameter("Description", obj_SMenu.Description, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("MainMenuId", obj_SMenu.MainMenuId, ParameterDirection.Input, DbType.Int32, 100);
           
            parm[2] = da.AddSPParameter("Url_Name", obj_SMenu.Url_Name, ParameterDirection.Input, DbType.String, 50);
            parm[3] = da.AddSPParameter("Order_No", obj_SMenu.Order_No, ParameterDirection.Input, DbType.Int32, 50);
           
           
            parm[4] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            
            string id = da.ExecuteNonQuerySP("Usp_Menu_Sub", parm);

            return id;
        }

        public List<SubMenudetails> Get_AllSubMenuList(int CompanyID)
        {
            SqlParameter[] parm = new SqlParameter[1];
           // parm[0] = da.AddSPParameter("TxnId", 1, ParameterDirection.Input, DbType.Int32, 10);
           // parm[1] = da.AddSPParameter("MainMenuId", 1, ParameterDirection.Input, DbType.Int32, 10);
           // parm[2] = da.AddSPParameter("Order_No", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[0] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Menu_Sub", parm);
            List<SubMenudetails> obj_Lst_Smenu = new List<SubMenudetails>();
            if(dt.Rows.Count>0)
            { 
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                SubMenudetails Obj_SubM = new SubMenudetails();
                Obj_SubM.MainMenuId = Convert.ToInt32(dt.Rows[i]["MainMenuId"]);
                Obj_SubM.Description = dt.Rows[i]["Description"].ToString();
                Obj_SubM.Url_Name = dt.Rows[i]["Url_Name"].ToString();
                if(dt.Rows[i]["Order_No"].ToString()!=""&& dt.Rows[i]["Order_No"].ToString()!=null)
                { 
                Obj_SubM.Order_No = Convert.ToInt32(dt.Rows[i]["Order_No"]);
                }
                Obj_SubM.TxnId = Convert.ToInt32(dt.Rows[i]["TxnId"]);
            
                obj_Lst_Smenu.Add(Obj_SubM);
            }
            }
            return obj_Lst_Smenu;
        }

        public string Update_SubMenu(SubMenudetails obj_SMenu)
        {
            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("Description", obj_SMenu.Description, ParameterDirection.Input, DbType.String, 50);
            parm[1] = da.AddSPParameter("Url_Name", obj_SMenu.Url_Name, ParameterDirection.Input, DbType.String, 50);
            parm[2] = da.AddSPParameter("MainMenuId", obj_SMenu.MainMenuId, ParameterDirection.Input, DbType.Int32, 100);
            parm[3] = da.AddSPParameter("Order_No", obj_SMenu.Order_No, ParameterDirection.Input, DbType.Int32, 100);
            parm[4] = da.AddSPParameter("TxnId", obj_SMenu.TxnId, ParameterDirection.Input, DbType.Int32, 100);
            parm[5] = da.AddSPParameter("Flag", 3, ParameterDirection.Input, DbType.Int64, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Menu_Sub", parm);

            return id;
        }


        public string Delete_SubMenu(int TxnId)
        {
            SqlParameter[] parm = new SqlParameter[2];
            // parm[0] = da.AddSPParameter("MainMenuId", MainMenuId, ParameterDirection.Input, DbType.Int32);
            parm[0] = da.AddSPParameter("TxnId", TxnId, ParameterDirection.Input, DbType.Int32);
            parm[1] = da.AddSPParameter("Flag", 4, ParameterDirection.Input, DbType.Int64, 10);
            string id = da.ExecuteNonQuerySP("Usp_Menu_Sub", parm);
            if (id == null)
            {
                id = string.Empty;
            }
            return id;
        }

        public List<SubMenudetails> Get_AllSubMenuList_id(int ID)
        {
            SqlParameter[] parm = new SqlParameter[2];
             parm[1] = da.AddSPParameter("MainMenuId", ID, ParameterDirection.Input, DbType.Int32, 20);
             parm[0] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Menu_Sub", parm);
            List<SubMenudetails> obj_Lst_Smenu = new List<SubMenudetails>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    SubMenudetails Obj_SubM = new SubMenudetails();
                    Obj_SubM.MainMenuId = Convert.ToInt32(dt.Rows[i]["MainMenuId"]);
                    Obj_SubM.Description = dt.Rows[i]["Description"].ToString();
                    Obj_SubM.Url_Name = dt.Rows[i]["Url_Name"].ToString();
                    if (dt.Rows[i]["Order_No"].ToString() != "" && dt.Rows[i]["Order_No"].ToString() != null)
                    {
                        Obj_SubM.Order_No = Convert.ToInt32(dt.Rows[i]["Order_No"]);
                    }
                    Obj_SubM.TxnId = Convert.ToInt32(dt.Rows[i]["TxnId"]);

                    obj_Lst_Smenu.Add(Obj_SubM);
                }
            }
            return obj_Lst_Smenu;
        }
    }
}
