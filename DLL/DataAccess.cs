using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web;
using System.Collections;

namespace DLL
{
   public class DataAccess
    {

        public  string Connectionstring
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["sqlserver"].ConnectionString.ToString();
            }

        }

        private ArrayList cacheSPParamList = null;
        public SqlParameter AddSPParameter(string paramName, object paramValue, ParameterDirection paramDirection = ParameterDirection.Input, DbType paramDataType = 0, int ParamSize = 0)
        {
            if (cacheSPParamList == null)
            {
                cacheSPParamList = new ArrayList();
            }

            SqlParameter spParameter = new SqlParameter();
            spParameter.ParameterName = paramName;
            spParameter.Value = paramValue;
            spParameter.Direction = paramDirection;
            spParameter.DbType = paramDataType;
            spParameter.Size = ParamSize;
            return spParameter;
                      
        }
        public DataTable Sp_Datatable(string spname,SqlParameter[] parm)
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(Connectionstring))
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddRange(parm);
                cmd.CommandText = spname;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            return dt;
        }
        public string ExecuteNonQuerySP(string spname, SqlParameter[] parm)
        {
            string dt = string.Empty;
            using (SqlConnection con = new SqlConnection(Connectionstring))
            {
                SqlCommand cmd = new SqlCommand();
                con.Open();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddRange(parm);
                cmd.CommandText = spname;
                cmd.ExecuteNonQuery();
                
                //dt = cmd.Parameters["@Msg"].Value.ToString();
            }
            return dt;
        }


        public string ExecuteNonQuerySP(string spname, SqlParameter[] parm, bool outParameter)
        {
            if (outParameter)
            {
                string dt = string.Empty;
                using (SqlConnection con = new SqlConnection(Connectionstring))
                {
                    SqlCommand cmd = new SqlCommand();
                    con.Open();
                    cmd.Connection = con;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddRange(parm);
                    cmd.Parameters.Add("@Msg", SqlDbType.Char, 500);
                    cmd.Parameters["@Msg"].Direction = ParameterDirection.Output;
                    cmd.CommandText = spname;
                    cmd.ExecuteNonQuery();
                    dt = cmd.Parameters["@Msg"].Value.ToString();
                    //dt = cmd.Parameters["@Msg"].Value.ToString();
                }
                return dt;
            }
            else
            {
                return ExecuteNonQuerySP(spname, parm);
            }

        }
        public DataSet GetDataSetSP(string spName, SqlParameter[] parm)
        {
            DataSet dt = new DataSet();
            using (SqlConnection con = new SqlConnection(Connectionstring))
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddRange(parm);
                cmd.CommandText = spName;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            return dt;

        }

    }
}
