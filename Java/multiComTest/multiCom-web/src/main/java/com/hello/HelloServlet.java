package com.hello;

import com.multiCom.DAO.UserDAO;
import com.multiCom.entity.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * Created by qilianshan on 16/7/7.
 */
public class HelloServlet extends HttpServlet{

    //Servlet+Applet
    //特殊的Java类
    //Servlet用来处理Http

    //关键三个步骤
    //init()
    //service()
    //destroy()

    //servlet里的包

    //常用接口
    //Servlet
    //ServletRequest
    //ServletResponse
    //ServletConfig
    //ServletContext
    //GenericServlet 底层实现
    //ServletInputStream 用来读取二进制数据
    //ServletOutputStream 用来返回二进制数据

    //Servlet.http的接口
    //httpServletRequest
    //HttpServletResponse
    //HttpSession
    //HttpServlet
    //Cookie

    //servlet.annotation
    //servlet.descriptor

    @Override
    public void init() throws ServletException {
        System.out.println("============init=============");
        super.init();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("============service=========");

        PrintWriter helloWriter=resp.getWriter();
        helloWriter.println("HelloWorld");

        UserDAO userDao=new UserDAO();
        ArrayList<User> users=userDao.getList();
        for(User user:users){
            helloWriter.println(user.toString());
        }

        helloWriter.close();
        super.service(req, resp);
    }

    @Override
    public void destroy() {
        System.out.println("============destory=========");
        super.destroy();
    }
}
