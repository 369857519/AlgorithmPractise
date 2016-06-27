package com.multiCom.testMain;

import java.util.ArrayList;
import java.util.Scanner;

import com.multiCom.entity.*;
import com.multiCom.DAO.*;

/**
 * Created by qilianshan on 16/6/27.
 */
public class TestMain {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        UserDAO usrDAO = new UserDAO();
        while(true){
            System.out.println("1、查看用户  2、添加用户  3、删除用户 4、退出");
            int a = sc.nextInt();
            if(a==1){
                ArrayList<User> ar = usrDAO.getList();
                System.out.println("编号\t标题\t内容");
                for(User newUser : ar){
                    System.out.println(newUser.toString());
                }
            }else if(a==2){
                System.out.println("请输入用户名  用户邮箱  用户密码");
                User newUser = new User();
                newUser.setName(sc.next());
                newUser.setEmail(sc.next());
                newUser.setPassword(sc.next());
                boolean b = usrDAO.insert(newUser);
                System.out.println(b);
            }else if(a==3){
                System.out.println("请输入要删除的用户编号");
                int id = sc.nextInt();
                boolean b = usrDAO.delete(id);
                System.out.println(b);
            }else{
                break;
            }
        }
    }
}
