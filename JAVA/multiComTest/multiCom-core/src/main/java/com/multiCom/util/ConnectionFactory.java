package com.multiCom.util;
import java.io.InputStream;
import java.sql.*;
import java.util.*;
/**
 * Created by qilianshan on 16/6/15.
 */
public class ConnectionFactory {
    private static String driver;
    private static String dburl;
    private static String user;
    private static String password;

    private static final ConnectionFactory factory=new ConnectionFactory();

    private Connection conn;

    static {
        Properties prop =new Properties();
        try {
            InputStream in = ConnectionFactory.class.getClassLoader()
                    .getResourceAsStream("dbconfig.properties");
            prop.load(in);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
            System.out.println("配置文件读取错误 " + exception.getMessage());
        }

        driver =prop.getProperty("driver");
        dburl=prop.getProperty("dburl");
        user=prop.getProperty("user");
        password=prop.getProperty("password");
    }

    private ConnectionFactory(){

    }

    public static ConnectionFactory getInstance(){
        return factory;
    }

    public Connection makeConnection(){
        try {
//            Class.forName(driver);
            conn= DriverManager.getConnection(dburl,user,password);
        }catch (Exception e){
            e.printStackTrace();
        }
        return conn;
    }

    public static void colseRes(PreparedStatement preStat,Connection conn){
        try{
            if(preStat!=null){
                preStat.close();
            }
            if(conn!=null){
                conn.close();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void colseRes(ResultSet resSet,PreparedStatement preStat,Connection conn){
        try{
            if(resSet!=null){
                resSet.close();
            }
            if(preStat!=null){
                preStat.close();
            }
            if(conn!=null){
                conn.close();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

//    public static void main(String[] args) throws SQLException{
//        Connection conn=ConnectionFactory.getInstance().makeConnection();
//        System.out.println(conn.getAutoCommit());
//    }
}
