﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DLL;
using System.Data;
using System.Data.SqlClient;


namespace BLL
{
    public class EmployeeDetails:Group
    {
        public enum Flag
        {
            Insert = 1, Select = 2, Update = 3, Delete = 4, Edit = 5
        }

        DataAccess da = new DataAccess();
        public int Tei_Id { get; set; }
        public string Tei_Title { get; set; }
        public string Tei_FirstName { get; set; }
        public string Tei_LastName { get; set; }
        public string Tei_Gender { get; set; }
        public string Tei_Empno { get; set; }
        public string Tei_Phone { get; set; }
        public string Tei_Email { get; set; }
        public string Tei_Type { get; set; }
        public string Tei_Father { get; set; }
        public Nullable<DateTime> Tei_DateofBirth { get; set; }
        public Nullable<DateTime> Tei_JoiningDate { get; set; }
        public string Tei_Address1 { get; set; }
        public string Tei_Address2 { get; set; }
        public int Tei_stateId { get; set; }
        public int Tei_CountryId { get; set; }
        public string Tei_Photo { get; set; }
        public string Tei_AadharNo { get; set; }
        public int Tei_TypeofExpe { get; set; }
        public string Tei_Old_Company { get; set; }
        public string Tei_prev_Disig { get; set; }
        public int Tei_Prev_Exp { get; set; }
        public Nullable<DateTime> Tegi_Region_Date { get; set; }

        /// <summary>
        /// Employee_Grop_Info
        /// </summary>
        public int Txt_GId { get; set; }
        public int Tegi_Shift_Group { get; set; }
        public int Tegi_GroupId { get; set; }
        public int Tegi_DivisionId { get; set; }
        public int Tegi_DepartmentId { get; set; }
        public int Tegi_DesignationId { get; set; }
        public string Tei_PfNo { get; set; }
        public string Tei_EsiNo { get; set; }
        public string Tegi_Weekoff { get; set; }
        public string Tegi_ReportingLevel { get; set; }
        public string Tegi_UANNumber { get; set; }
        public string Tegi_PF_Type { get; set; }
        public string Tegi_Emp_Rules { get; set; }
        public string Tegi_Grade { get; set; }

        /// <summary>
        /// Employees Files 
        /// </summary>
        public int FileId { get; set; }
        public string Tef_FileName { get; set; }
        public string Tef_FilePath { get; set; }

        public int Tes_SalID { get; set; }
        public DateTime Tes_Sal_Efctive_Date { get; set; }
        public int Tes_Sal_CTC { get; set; }
        public decimal Tes_Sal { get; set; }
        public decimal Tes_Increment { get; set; }

        public int A_Id { get; set; }
        public int Tea_AllowanceId { get; set; }
        public string Tea_Name { get; set; }
        public string Tea_Allowance_Type { get; set; }
        public string Tef_Value { get; set; }
        public int UserId { get; set; }

        public string Insert_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[25];
            parm[0] = da.AddSPParameter("Tei_Title", Obj_Emp.Tei_Title, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("Tei_FirstName", Obj_Emp.Tei_FirstName, ParameterDirection.Input, DbType.String, 200);
            parm[2] = da.AddSPParameter("Tei_LastName", Obj_Emp.Tei_LastName, ParameterDirection.Input, DbType.String, 200);
            parm[3] = da.AddSPParameter("Gender", Obj_Emp.Tei_Gender, ParameterDirection.Input, DbType.String, 2);
            parm[4] = da.AddSPParameter("Tei_Empno", Obj_Emp.Tei_Empno, ParameterDirection.Input, DbType.String, 200);
            parm[5] = da.AddSPParameter("Tei_Type", 1, ParameterDirection.Input, DbType.Int32, 2);
            parm[6] = da.AddSPParameter("Tei_Father", Obj_Emp.Tei_Father, ParameterDirection.Input, DbType.String, 200);
            if (Obj_Emp.Tei_Photo != null && Obj_Emp.Tei_Photo != "")
            {
                string[] url = Obj_Emp.Tei_Photo.Split('?');
                parm[7] = da.AddSPParameter("Tei_Photo", url[0], ParameterDirection.Input, DbType.String, 1000);
            }
            else
            {
                parm[7] = da.AddSPParameter("Tei_Photo", null, ParameterDirection.Input, DbType.String, 1000);
            }

            parm[8] = da.AddSPParameter("Tei_Address1", Obj_Emp.Tei_Address1, ParameterDirection.Input, DbType.String, 1000);
            parm[9] = da.AddSPParameter("Tei_Address2", Obj_Emp.Tei_Address2, ParameterDirection.Input, DbType.String, 100);
            parm[10] = da.AddSPParameter("Tei_stateId", Obj_Emp.Tei_stateId, ParameterDirection.Input, DbType.Int32, 100);
            parm[11] = da.AddSPParameter("Tei_CountryId", Obj_Emp.Tei_CountryId, ParameterDirection.Input, DbType.Int32, 5);
            parm[12] = da.AddSPParameter("Tei_Phone", Obj_Emp.Tei_Phone, ParameterDirection.Input, DbType.String, 15);
            if (Obj_Emp.Tei_DateofBirth == null)
            {
                parm[13] = da.AddSPParameter("Tei_DateofBirth", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[13] = da.AddSPParameter("Tei_DateofBirth", Obj_Emp.Tei_DateofBirth, ParameterDirection.Input, DbType.DateTime, 20);
            }

            if (Obj_Emp.Tei_JoiningDate == null)
            {
                parm[14] = da.AddSPParameter("Tei_JoiningDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[14] = da.AddSPParameter("Tei_JoiningDate", Obj_Emp.Tei_JoiningDate, ParameterDirection.Input, DbType.DateTime, 20);
            }

            parm[15] = da.AddSPParameter("Tei_Email", Obj_Emp.Tei_Email, ParameterDirection.Input, DbType.String, 50);
            if (Obj_Emp.Tei_TypeofExpe != null)
            {
                parm[16] = da.AddSPParameter("Tei_TypeofExpe", Obj_Emp.Tei_TypeofExpe, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[16] = da.AddSPParameter("Tei_TypeofExpe", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_Old_Company != null)
            {
                parm[17] = da.AddSPParameter("Tei_Old_Company", Obj_Emp.Tei_Old_Company, ParameterDirection.Input, DbType.String, 200);
            }
            else
            {
                parm[17] = da.AddSPParameter("Tei_Old_Company", 0, ParameterDirection.Input, DbType.String, 20);
            }
            if (Obj_Emp.Tei_prev_Disig != null)
            {
                parm[18] = da.AddSPParameter("Tei_prev_Disig", Obj_Emp.Tei_prev_Disig, ParameterDirection.Input, DbType.String, 200);
            }
            else
            {
                parm[18] = da.AddSPParameter("Tei_prev_Disig", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_Prev_Exp != null)
            {
                parm[19] = da.AddSPParameter("Tei_Prev_Exp", Obj_Emp.Tei_Prev_Exp, ParameterDirection.Input, DbType.Int32, 100);
            }
            else
            {
                parm[19] = da.AddSPParameter("Tei_Prev_Exp", 0, ParameterDirection.Input, DbType.Int32, 100);
            }
           
            parm[20] = da.AddSPParameter("Tei_AadharNo", Obj_Emp.Tei_AadharNo, ParameterDirection.Input, DbType.String, 30);
            parm[21] = da.AddSPParameter("@CompanyId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[22] = da.AddSPParameter("@LocationId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[23] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[24] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm);

            return id;
        }


        public string Update_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[28];
            parm[0] = da.AddSPParameter("Tei_Title", Obj_Emp.Tei_Title, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("Tei_FirstName", Obj_Emp.Tei_FirstName, ParameterDirection.Input, DbType.String, 200);
            parm[2] = da.AddSPParameter("Tei_LastName", Obj_Emp.Tei_LastName, ParameterDirection.Input, DbType.String, 200);
            parm[3] = da.AddSPParameter("Gender", Obj_Emp.Tei_Gender, ParameterDirection.Input, DbType.String, 2);
            parm[4] = da.AddSPParameter("Tei_Empno", Obj_Emp.Tei_Empno, ParameterDirection.Input, DbType.String, 200);
            parm[5] = da.AddSPParameter("Tei_Type", 1, ParameterDirection.Input, DbType.Int32, 2);
            parm[6] = da.AddSPParameter("Tei_Father", Obj_Emp.Tei_Father, ParameterDirection.Input, DbType.String, 200);
            if (Obj_Emp.Tei_Photo != null && Obj_Emp.Tei_Photo != "")
            {
                string[] url = Obj_Emp.Tei_Photo.Split('?');
                parm[7] = da.AddSPParameter("Tei_Photo", url[0], ParameterDirection.Input, DbType.String, 1000);
            }
            else
            {
                parm[7] = da.AddSPParameter("Tei_Photo", null, ParameterDirection.Input, DbType.String, 1000);
            }

            parm[8] = da.AddSPParameter("Tei_Address1", Obj_Emp.Tei_Address1, ParameterDirection.Input, DbType.String, 1000);
            parm[9] = da.AddSPParameter("Tei_Address2", Obj_Emp.Tei_Address2, ParameterDirection.Input, DbType.String, 100);
            parm[10] = da.AddSPParameter("Tei_stateId", Obj_Emp.Tei_stateId, ParameterDirection.Input, DbType.Int32, 100);
            parm[11] = da.AddSPParameter("Tei_CountryId", Obj_Emp.Tei_CountryId, ParameterDirection.Input, DbType.Int32, 5);
            parm[12] = da.AddSPParameter("Tei_Phone", Obj_Emp.Tei_Phone, ParameterDirection.Input, DbType.String, 15);
            if (Obj_Emp.Tei_DateofBirth == null)
            {
                parm[13] = da.AddSPParameter("Tei_DateofBirth", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[13] = da.AddSPParameter("Tei_DateofBirth", Obj_Emp.Tei_DateofBirth, ParameterDirection.Input, DbType.DateTime, 20);
            }

            if (Obj_Emp.Tei_JoiningDate == null)
            {
                parm[14] = da.AddSPParameter("Tei_JoiningDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[14] = da.AddSPParameter("Tei_JoiningDate", Obj_Emp.Tei_JoiningDate, ParameterDirection.Input, DbType.DateTime, 20);
            }

            parm[15] = da.AddSPParameter("Tei_Email", Obj_Emp.Tei_Email, ParameterDirection.Input, DbType.String, 50);
            if (Obj_Emp.Tei_TypeofExpe != null)
            {
                parm[16] = da.AddSPParameter("Tei_TypeofExpe", Obj_Emp.Tei_TypeofExpe, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[16] = da.AddSPParameter("Tei_TypeofExpe", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_Old_Company != null)
            {
                parm[17] = da.AddSPParameter("Tei_Old_Company", Obj_Emp.Tei_Old_Company, ParameterDirection.Input, DbType.String, 200);
            }
            else
            {
                parm[17] = da.AddSPParameter("Tei_Old_Company", 0, ParameterDirection.Input, DbType.String, 20);
            }
            if (Obj_Emp.Tei_prev_Disig != null)
            {
                parm[18] = da.AddSPParameter("Tei_prev_Disig", Obj_Emp.Tei_prev_Disig, ParameterDirection.Input, DbType.String, 200);
            }
            else
            {
                parm[18] = da.AddSPParameter("Tei_prev_Disig", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_Prev_Exp != null)
            {
                parm[19] = da.AddSPParameter("Tei_Prev_Exp", Obj_Emp.Tei_Prev_Exp, ParameterDirection.Input, DbType.Int32, 100);
            }
            else
            {
                parm[19] = da.AddSPParameter("Tei_Prev_Exp", 0, ParameterDirection.Input, DbType.Int32, 100);
            }

            parm[20] = da.AddSPParameter("Tei_AadharNo", Obj_Emp.Tei_AadharNo, ParameterDirection.Input, DbType.String, 30);
            parm[21] = da.AddSPParameter("@CompanyId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[22] = da.AddSPParameter("@LocationId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[23] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[24] = da.AddSPParameter("Tei_Id", Obj_Emp.Tei_Id, ParameterDirection.Input, DbType.String, 10);
            parm[25] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm);

            return id;
        }


        public string Next_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[25];
            parm[0] = da.AddSPParameter("Tei_Title", Obj_Emp.Tei_Title, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("Tei_FirstName", Obj_Emp.Tei_FirstName, ParameterDirection.Input, DbType.String, 200);
            parm[2] = da.AddSPParameter("Tei_LastName", Obj_Emp.Tei_LastName, ParameterDirection.Input, DbType.String, 200);
            parm[3] = da.AddSPParameter("Gender", Obj_Emp.Tei_Gender, ParameterDirection.Input, DbType.String, 2);
            parm[4] = da.AddSPParameter("Tei_Empno", Obj_Emp.Tei_Empno, ParameterDirection.Input, DbType.String, 200);
            parm[5] = da.AddSPParameter("Tei_Type", 1, ParameterDirection.Input, DbType.Int32, 2);
            parm[6] = da.AddSPParameter("Tei_Father", Obj_Emp.Tei_Father, ParameterDirection.Input, DbType.String, 200);
            if (Obj_Emp.Tei_Photo != null && Obj_Emp.Tei_Photo != "")
            {
                string[] url = Obj_Emp.Tei_Photo.Split('?');
                parm[7] = da.AddSPParameter("Tei_Photo", url[0], ParameterDirection.Input, DbType.String, 1000);
            }
            else
            {
                parm[7] = da.AddSPParameter("Tei_Photo", null, ParameterDirection.Input, DbType.String, 1000);
            }

            parm[8] = da.AddSPParameter("Tei_Address1", Obj_Emp.Tei_Address1, ParameterDirection.Input, DbType.String, 1000);
            parm[9] = da.AddSPParameter("Tei_Address2", Obj_Emp.Tei_Address2, ParameterDirection.Input, DbType.String, 100);
            parm[10] = da.AddSPParameter("Tei_stateId", Obj_Emp.Tei_stateId, ParameterDirection.Input, DbType.Int32, 100);
            parm[11] = da.AddSPParameter("Tei_CountryId", Obj_Emp.Tei_CountryId, ParameterDirection.Input, DbType.Int32, 5);
            parm[12] = da.AddSPParameter("Tei_Phone", Obj_Emp.Tei_Phone, ParameterDirection.Input, DbType.String, 15);
            if (Obj_Emp.Tei_DateofBirth == null)
            {
                parm[13] = da.AddSPParameter("Tei_DateofBirth", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[13] = da.AddSPParameter("Tei_DateofBirth", Obj_Emp.Tei_DateofBirth, ParameterDirection.Input, DbType.DateTime, 20);
            }

            if (Obj_Emp.Tei_JoiningDate == null)
            {
                parm[14] = da.AddSPParameter("Tei_JoiningDate", null, ParameterDirection.Input, DbType.DateTime, 20);
            }
            else
            {
                parm[14] = da.AddSPParameter("Tei_JoiningDate", Obj_Emp.Tei_JoiningDate, ParameterDirection.Input, DbType.DateTime, 20);
            }

            parm[15] = da.AddSPParameter("Tei_Email", Obj_Emp.Tei_Email, ParameterDirection.Input, DbType.String, 50);
            if (Obj_Emp.Tei_TypeofExpe != null)
            {
                parm[16] = da.AddSPParameter("Tei_TypeofExpe", Obj_Emp.Tei_TypeofExpe, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[16] = da.AddSPParameter("Tei_TypeofExpe", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_Old_Company != null)
            {
                parm[17] = da.AddSPParameter("Tei_Old_Company", Obj_Emp.Tei_Old_Company, ParameterDirection.Input, DbType.String, 200);
            }
            else
            {
                parm[17] = da.AddSPParameter("Tei_Old_Company", 0, ParameterDirection.Input, DbType.String, 20);
            }
            if (Obj_Emp.Tei_prev_Disig != null)
            {
                parm[18] = da.AddSPParameter("Tei_prev_Disig", Obj_Emp.Tei_prev_Disig, ParameterDirection.Input, DbType.String, 200);
            }
            else
            {
                parm[18] = da.AddSPParameter("Tei_prev_Disig", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_Prev_Exp != null)
            {
                parm[19] = da.AddSPParameter("Tei_Prev_Exp", Obj_Emp.Tei_Prev_Exp, ParameterDirection.Input, DbType.Int32, 100);
            }
            else
            {
                parm[19] = da.AddSPParameter("Tei_Prev_Exp", 0, ParameterDirection.Input, DbType.Int32, 100);
            }

            parm[20] = da.AddSPParameter("Tei_AadharNo", Obj_Emp.Tei_AadharNo, ParameterDirection.Input, DbType.String, 30);
            parm[21] = da.AddSPParameter("@CompanyId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[22] = da.AddSPParameter("@LocationId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[23] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[24] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm,true);

            return id.TrimEnd(' ');
        }





        public string Second_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[16];
            parm[0] = da.AddSPParameter("Tei_Id", Obj_Emp.Tei_Id, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("Tegi_Shift_Group", Obj_Emp.Tegi_Shift_Group, ParameterDirection.Input, DbType.Int32, 200);
            parm[2] = da.AddSPParameter("Tegi_GroupId", Obj_Emp.Tegi_GroupId, ParameterDirection.Input, DbType.Int32, 200);
            parm[3] = da.AddSPParameter("Tegi_DivisionId", Obj_Emp.Tegi_DivisionId, ParameterDirection.Input, DbType.Int32, 2);
            parm[4] = da.AddSPParameter("Tegi_DepartmentId", Obj_Emp.Tegi_DepartmentId, ParameterDirection.Input, DbType.Int32, 200);
            parm[5] = da.AddSPParameter("Tegi_DesignationId", Obj_Emp.Tegi_DesignationId, ParameterDirection.Input, DbType.Int32, 2);
            parm[6] = da.AddSPParameter("Tegi_PfNo", Obj_Emp.Tei_PfNo, ParameterDirection.Input, DbType.String, 50);
            parm[7] = da.AddSPParameter("Tegi_EsiNo", Obj_Emp.Tei_EsiNo, ParameterDirection.Input, DbType.String, 50);
            parm[8] = da.AddSPParameter("Tegi_Weekoff", Obj_Emp.Tegi_Weekoff, ParameterDirection.Input, DbType.String, 100);
            if (Obj_Emp.Tegi_ReportingLevel != "0")
            {
                parm[9] = da.AddSPParameter("Tegi_ReportingLevel", Obj_Emp.Tegi_ReportingLevel.TrimEnd(','), ParameterDirection.Input, DbType.String, 100);
            }
            else
            {
                parm[9] = da.AddSPParameter("Tegi_ReportingLevel", 0, ParameterDirection.Input, DbType.String, 100);
            }
            parm[10] = da.AddSPParameter("Tegi_UANNumber", Obj_Emp.Tegi_UANNumber, ParameterDirection.Input, DbType.Int32,50);
            parm[11] = da.AddSPParameter("Tegi_PF_Type", Obj_Emp.Tegi_PF_Type, ParameterDirection.Input, DbType.Int32, 50);
            
            parm[12] = da.AddSPParameter("Tegi_Emp_Rules", Obj_Emp.Tegi_Emp_Rules.TrimEnd(','), ParameterDirection.Input, DbType.String, 500);
            

            parm[13] = da.AddSPParameter("Tegi_Grade", 1, ParameterDirection.Input, DbType.String, 30);
            parm[14] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[15] = da.AddSPParameter("Flag", 7, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm);

            return id.TrimEnd(' ');
        }

        public string Salary_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[6];
            parm[0] = da.AddSPParameter("Tei_Id", Obj_Emp.Tei_Id, ParameterDirection.Input, DbType.String, 10);
            parm[1] = da.AddSPParameter("Tes_Sal_Efctive_Date", Obj_Emp.Tes_Sal_Efctive_Date, ParameterDirection.Input, DbType.DateTime, 200);
            parm[2] = da.AddSPParameter("Tes_Sal_CTC", Obj_Emp.Tes_Sal_CTC, ParameterDirection.Input, DbType.Int32, 200);
            parm[3] = da.AddSPParameter("Tes_Sal", Obj_Emp.Tes_Sal, ParameterDirection.Input, DbType.Int32, 2);
            parm[4] = da.AddSPParameter("Tes_Increment", Obj_Emp.Tes_Increment, ParameterDirection.Input, DbType.Int32, 200);
            
            parm[5] = da.AddSPParameter("Flag", 8, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm);

            return id.TrimEnd(' ');
        }


        public List<EmployeeDetails> Get_AllEmployee_GID(string Tei_FirstName)
        {
            SqlParameter[] parm = new SqlParameter[2];
            parm[0] = da.AddSPParameter("Tei_FirstName", Tei_FirstName, ParameterDirection.Input, DbType.String, 100);
            parm[1] = da.AddSPParameter("Flag", 9, ParameterDirection.Input, DbType.Int32, 10);

            DataTable dt = new DataTable();

            dt = da.Sp_Datatable("Usp_Employee_Details", parm);
            List<EmployeeDetails> obj_Lst_Dig = new List<EmployeeDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                EmployeeDetails obj_Dig = new EmployeeDetails();
                obj_Dig.Tei_Id = Convert.ToInt32(dt.Rows[i]["Tei_Id"]);
                obj_Dig.Tei_FirstName = dt.Rows[i]["Tei_FirstName"].ToString();
                obj_Lst_Dig.Add(obj_Dig);
            }
            return obj_Lst_Dig;
        }
    }
}