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
    public class EmployeeDetails:Group
    {       

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
        public int Tei_GroupId { get; set; }
        public int Tei_DivisionId { get; set; }
        public int Tei_DepartmentId { get; set; }
        public int Tei_DesignationId { get; set; }
        public string Tei_PfNo { get; set; }
        public string Tei_EsiNo { get; set; }
        public string Tei_AadharNo { get; set; }



        public string Insert_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[27];
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
            if (Obj_Emp.Tei_GroupId != null)
            {
                parm[16] = da.AddSPParameter("Tei_GroupId", Obj_Emp.Tei_GroupId, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[16] = da.AddSPParameter("Tei_GroupId", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_DivisionId != null)
            {
                parm[17] = da.AddSPParameter("Tei_DivisionId", Obj_Emp.Tei_DivisionId, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[17] = da.AddSPParameter("Tei_DivisionId", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_DepartmentId != null)
            {
                parm[18] = da.AddSPParameter("Tei_DepartmentId", Obj_Emp.Tei_DepartmentId, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[18] = da.AddSPParameter("Tei_DepartmentId", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_DesignationId != null)
            {
                parm[19] = da.AddSPParameter("Tei_DesignationId", Obj_Emp.Tei_DesignationId, ParameterDirection.Input, DbType.Int32, 100);
            }
            else
            {
                parm[19] = da.AddSPParameter("Tei_DesignationId", 0, ParameterDirection.Input, DbType.Int32, 100);
            }
            parm[20] = da.AddSPParameter("Tei_PfNo", Obj_Emp.Tei_PfNo, ParameterDirection.Input, DbType.String, 30);
            parm[21] = da.AddSPParameter("Tei_EsiNo", Obj_Emp.Tei_EsiNo, ParameterDirection.Input, DbType.String, 30);
            parm[22] = da.AddSPParameter("Tei_AadharNo", Obj_Emp.Tei_AadharNo, ParameterDirection.Input, DbType.String, 30);
            parm[23] = da.AddSPParameter("@CompanyId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[24] = da.AddSPParameter("@LocationId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[25] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[26] = da.AddSPParameter("Flag", 1, ParameterDirection.Input, DbType.Int32, 10);
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
            if (Obj_Emp.Tei_GroupId != null)
            {
                parm[16] = da.AddSPParameter("Tei_GroupId", Obj_Emp.Tei_GroupId, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[16] = da.AddSPParameter("Tei_GroupId", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_DivisionId != null)
            {
                parm[17] = da.AddSPParameter("Tei_DivisionId", Obj_Emp.Tei_DivisionId, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[17] = da.AddSPParameter("Tei_DivisionId", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_DepartmentId != null)
            {
                parm[18] = da.AddSPParameter("Tei_DepartmentId", Obj_Emp.Tei_DepartmentId, ParameterDirection.Input, DbType.Int32, 20);
            }
            else
            {
                parm[18] = da.AddSPParameter("Tei_DepartmentId", 0, ParameterDirection.Input, DbType.Int32, 20);
            }
            if (Obj_Emp.Tei_DesignationId != null)
            {
                parm[19] = da.AddSPParameter("Tei_DesignationId", Obj_Emp.Tei_DesignationId, ParameterDirection.Input, DbType.Int32, 100);
            }
            else
            {
                parm[19] = da.AddSPParameter("Tei_DesignationId", 0, ParameterDirection.Input, DbType.Int32, 100);
            }
            parm[20] = da.AddSPParameter("Tei_PfNo", Obj_Emp.Tei_PfNo, ParameterDirection.Input, DbType.String, 30);
            parm[21] = da.AddSPParameter("Tei_EsiNo", Obj_Emp.Tei_EsiNo, ParameterDirection.Input, DbType.String, 30);
            parm[22] = da.AddSPParameter("Tei_AadharNo", Obj_Emp.Tei_AadharNo, ParameterDirection.Input, DbType.String, 30);
            parm[23] = da.AddSPParameter("@CompanyId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[24] = da.AddSPParameter("@LocationId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[25] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[26] = da.AddSPParameter("Tei_Id", Obj_Emp.Tei_Id, ParameterDirection.Input, DbType.String, 10);
            parm[27] = da.AddSPParameter("Flag", 2, ParameterDirection.Input, DbType.Int32, 10);
            //da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm);

            return id;
        }


        public string Next_Employee(EmployeeDetails Obj_Emp)
        {

            SqlParameter[] parm = new SqlParameter[21];
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
            
            parm[16] = da.AddSPParameter("Tei_AadharNo", Obj_Emp.Tei_AadharNo, ParameterDirection.Input, DbType.String, 30);
            parm[17] = da.AddSPParameter("@CompanyId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[18] = da.AddSPParameter("@LocationId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[19] = da.AddSPParameter("@UserId", 1, ParameterDirection.Input, DbType.Int32, 30);
            parm[20] = da.AddSPParameter("Flag", 6, ParameterDirection.Input, DbType.Int32, 10);
            //parm[27]=da.AddSPParameter("Msg", null, ParameterDirection.Output, DbType.String);
            string id = da.ExecuteNonQuerySP("Usp_Employee_Details", parm,true);

            return id.TrimEnd(' ');
        }
    }
}