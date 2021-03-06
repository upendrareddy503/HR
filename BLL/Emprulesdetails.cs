﻿using DLL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class properties
        {
        public int Tei_DivisionId { get; set; }
        public int Tei_DepartmentId { get; set; }
        public int Tei_Id { get; set; }
        public string Tei_Empno { get; set; }
        public string Tei_FirstName { get; set; }        
        public int Tegi_GroupId { get; set; }

    }

 
    public class Emprulesdetails: EmployeeDetails
    {
        public List<EmployeesCols> EmployeesCols{ get; set; }
        public string Rules { get; set; }
        public List<EmployeeRuleHistory> EmployeeRuleHistories{ get; set; }   
        DataAccess da = new DataAccess();
        public List<EmployeesCols> Get_AllEmpRules()
        {
            SqlParameter[] parm = new SqlParameter[1];            
            parm[0] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();
            List<EmployeesCols> obj_Rule = new List<EmployeesCols>();
            dt = da.Sp_Datatable("Usp_Rules_Details", parm);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                

                EmployeesCols empcol = new EmployeesCols();
                empcol.Ter_id = Convert.ToInt32(dt.Rows[i]["Ter_id"]);
                empcol.Ter_Name= dt.Rows[i]["Ter_Name"].ToString();

                obj_Rule.Add(empcol);
              
            }

            return obj_Rule;
        }

     public List<properties> Get_employeeidwise(string Ter_id,int CompanyId,int LocationId)
        {

            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Ter_id", Ter_id, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("CompanyId", CompanyId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", LocationId, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag",0 , ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();            
            dt = da.Sp_Datatable("Usp_Test_Details", parm);



            List<properties> propert= new List<properties>();
           // foreach(DataRow r in dt.Rows)
           for(int i=0;i<dt.Rows.Count;i++)
            {
                properties empidwise = new properties();
                empidwise.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                empidwise.Tei_Empno = dt.Rows[i]["Tei_Empno"].ToString();
                empidwise.Tei_FirstName = dt.Rows[i]["Tei_FirstName"].ToString();
                empidwise.Tei_DivisionId = Convert.ToInt32(dt.Rows[i]["Tegi_DivisionId"]);
                empidwise.Tei_DepartmentId = Convert.ToInt32(dt.Rows[i]["Tegi_DepartmentId"]);
                empidwise.Tegi_GroupId = Convert.ToInt32(dt.Rows[i]["Tegi_GroupId"]);
                propert.Add(empidwise);

            }

            return propert;
        }
        public List<properties> Get_employeeNamewise(string Ter_id,int CompanyId,int LocationId)
        {

            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Ter_Name", Ter_id, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("CompanyId", CompanyId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", LocationId, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Test_Details", parm);



            List<properties> propert = new List<properties>();
            // foreach(DataRow r in dt.Rows)
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                properties empidwise = new properties();
                empidwise.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                empidwise.Tei_Empno = dt.Rows[i]["Tei_Empno"].ToString();
                empidwise.Tei_FirstName = dt.Rows[i]["Tei_FirstName"].ToString();
                empidwise.Tei_DivisionId = Convert.ToInt32(dt.Rows[i]["Tegi_DivisionId"]);
                empidwise.Tei_DepartmentId = Convert.ToInt32(dt.Rows[i]["Tegi_DepartmentId"]);
                empidwise.Tegi_GroupId = Convert.ToInt32(dt.Rows[i]["Tegi_GroupId"]);
                propert.Add(empidwise);

            }

            return propert;
        }

        public List<DepartmentDetails> GetDepartment(int Id, int CompanyId, int LocationId,int UserId)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("Tgi_Id", Id, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("CompanyId", CompanyId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("LocationId", LocationId, ParameterDirection.Input, DbType.Int32, 10);
            //parm[3] = da.AddSPParameter("Tdp_UserId", UserId, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Department_Details", parm);



            List<DepartmentDetails> lst_Dep = new List<DepartmentDetails>();
            // foreach(DataRow r in dt.Rows)
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DepartmentDetails obj_Dep = new DepartmentDetails();
                obj_Dep.Department_Id = Convert.ToInt32(dt.Rows[i]["Tdpi_Id"]);
                obj_Dep.Department_Name = dt.Rows[i]["Tdp_Name"].ToString();
                lst_Dep.Add(obj_Dep);

            }

            return lst_Dep;
        }

        public List<Emprulesdetails> GetGroupByRules(Emprulesdetails obj_Rules)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("GroupId", obj_Rules.GroupId, ParameterDirection.Input, DbType.Int32, 10);            
            parm[1] = da.AddSPParameter("Flag", 7, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Rules_Details", parm);



            List<Emprulesdetails> lst_EmpRules = new List<Emprulesdetails>();
            // foreach(DataRow r in dt.Rows)
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Emprulesdetails obj_EmpRules = new Emprulesdetails();
                obj_EmpRules.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                obj_EmpRules.Tei_FirstName = dt.Rows[i]["Tei_Name"].ToString();
                obj_EmpRules.Tei_Empno = dt.Rows[i]["Tei_Empno"].ToString();
                obj_EmpRules.Tegi_DivisionId = Convert.ToInt32(dt.Rows[i]["Tegi_DivisionId"]);
                obj_EmpRules.Rules = dt.Rows[i]["Rules"].ToString();                
                lst_EmpRules.Add(obj_EmpRules);
            }

            return lst_EmpRules;
        }
        public List<Emprulesdetails> GetDeptByRules(Emprulesdetails obj_Rules)
        {
            SqlParameter[] parm = new SqlParameter[3];
            parm[0] = da.AddSPParameter("GroupId", obj_Rules.GroupId, ParameterDirection.Input, DbType.Int32, 10);
            parm[1] = da.AddSPParameter("Tegi_DepartmentId", obj_Rules.Tegi_DepartmentId, ParameterDirection.Input, DbType.Int32, 10);
            parm[2] = da.AddSPParameter("Flag", 8, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Rules_Details", parm);



            List<Emprulesdetails> lst_EmpRules = new List<Emprulesdetails>();
            // foreach(DataRow r in dt.Rows)
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Emprulesdetails obj_EmpRules = new Emprulesdetails();
                obj_EmpRules.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                obj_EmpRules.Tei_FirstName = dt.Rows[i]["Tei_Name"].ToString();
                obj_EmpRules.Tei_Empno = dt.Rows[i]["Tei_Empno"].ToString();
                obj_EmpRules.Tegi_DivisionId = Convert.ToInt32(dt.Rows[i]["Tegi_DivisionId"]);
                obj_EmpRules.Rules = dt.Rows[i]["Rules"].ToString();
                lst_EmpRules.Add(obj_EmpRules);
            }

            return lst_EmpRules;
        }
        public List<Emprulesdetails> GetEmployeeByRules(Emprulesdetails obj_Rules)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Ter_id", obj_Rules.Tei_Id, ParameterDirection.Input, DbType.Int32, 10);            
            parm[1] = da.AddSPParameter("Flag", 9, ParameterDirection.Input, DbType.Int32, 10);
            DataTable dt = new DataTable();
            dt = da.Sp_Datatable("Usp_Rules_Details", parm);



            List<Emprulesdetails> lst_EmpRules = new List<Emprulesdetails>();
            // foreach(DataRow r in dt.Rows)
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Emprulesdetails obj_EmpRules = new Emprulesdetails();
                obj_EmpRules.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                obj_EmpRules.Tei_FirstName = dt.Rows[i]["Tei_Name"].ToString();
                obj_EmpRules.Tei_Empno = dt.Rows[i]["Tei_Empno"].ToString();
                obj_EmpRules.Tegi_DivisionId = Convert.ToInt32(dt.Rows[i]["Tegi_DivisionId"]);
                obj_EmpRules.Rules = dt.Rows[i]["Rules"].ToString();
                lst_EmpRules.Add(obj_EmpRules);
            }

            return lst_EmpRules;
        }

        public string SaveRules(Emprulesdetails obj_Rules)
        {
            SqlParameter[] parm = new SqlParameter[4];
            parm[0] = da.AddSPParameter("EmpId", obj_Rules.Tei_Empno, ParameterDirection.Input, DbType.String, 500);
            parm[1] = da.AddSPParameter("Rules", obj_Rules.Rules.TrimStart('$'), ParameterDirection.Input, DbType.String, 500);
            parm[2] = da.AddSPParameter("UserId", 1, ParameterDirection.Input, DbType.Int32, 10);
            parm[3] = da.AddSPParameter("Flag", 10, ParameterDirection.Input, DbType.Int32, 10);           
            string i = da.ExecuteNonQuerySP("Usp_Rules_Details", parm);            
            return i;
        }
    }
   
    public class EmployeesCols
    {

        public int Ter_id { get; set; }
        public string Ter_Name { get; set; }
        public int Ter_UserId { get; set; }
    }
    public class EmployeeRuleHistory
    {
        public int MyProperty { get; set; }

        //rules history table details was display here
    }
   

   

}
