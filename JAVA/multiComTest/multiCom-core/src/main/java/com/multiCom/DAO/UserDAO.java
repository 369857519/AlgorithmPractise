package com.multiCom.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.multiCom.entity.User;
import com.multiCom.util.ConnectionFactory;
/**
 * Created by qilianshan on 16/6/16.
 */
public class UserDAO {
    public ArrayList<User> getList(){
        ArrayList<User> arr=new ArrayList<User>();
        Connection conn=ConnectionFactory.getInstance().makeConnection();
        //Sql 执行器对象
        PreparedStatement preStat=null;
        ResultSet reSet=null;
        try {
            String sql="select * from tbl_user";
            preStat=conn.prepareStatement(sql);
            reSet= preStat.executeQuery();
            while (reSet.next()){
                User user=new User();
                user.setId(reSet.getInt("ID"));
                user.setName(reSet.getString("name"));
                user.setEmail(reSet.getString("Email"));
                user.setPassword(reSet.getString("Password"));
                arr.add(user);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return arr;
    }

    public void insert (User user){
        Connection conn=ConnectionFactory.getInstance().makeConnection();
        //Sql 执行器对象
        PreparedStatement preStat=null;

        String sql="insert into tbl_user(name,password,email) values (\""
                +user.getName()+"\",\""
                +user.getEmail()
                +"\",\""+user.getPassword()+"\");";
        try{
            preStat=conn.prepareStatement(sql);
            System.out.println(preStat.execute());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void update (User user){
        Connection conn=ConnectionFactory.getInstance().makeConnection();
        //Sql 执行器对象
        PreparedStatement preStat=null;

        String sql="update tbl_user set name='"+user.getName()
                +"',email='"+user.getEmail()+"',password='"+user.getPassword()+"' where id="+
                user.getId()+";";
        try{
            preStat=conn.prepareStatement(sql);
            System.out.println(preStat.execute());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void delete(Integer ID){
        Connection conn=ConnectionFactory.getInstance().makeConnection();
        //Sql 执行器对象
        PreparedStatement preStat=null;

        String sql="delete from tbl_user where id="+ID;
        try{
            preStat=conn.prepareStatement(sql);
            System.out.println(preStat.execute());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void main(String[] args){
        User insertUser=new User();
        insertUser.setName("lalal");
        insertUser.setEmail("fdsfds@fdsfds.com");
        insertUser.setPassword("ccc");
        insertUser.setId(10);

//        new UserDAO().insert(insertUser);
//        new UserDAO().update(insertUser);
        new UserDAO().delete(2);
        ArrayList<User> arr=new UserDAO().getList();
        for(User user:arr){
            System.out.println(user.toString());
        }
    }
}
