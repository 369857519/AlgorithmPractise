
//声明一个犬类
public class Dog{
	/* 这是一个狗类
	狗能叫，能摇尾巴
	有颜色属性，有大小属性		
	*/

	enum Breed{GOLDERNDOG,GENTLEDOG};
	Breed breed;


	//成员变量也叫属性
	//变量有类型
	//变量的类型+变量的名字
	//这个成员变量就是公开的
	public String color;
	public static void main(){
		//1 它是整个程序的入口
		//2 它的名字规定为main，而且
		//声明方法规定为public static void main(){}

		//局部变量
		String HelloWorld;
		//数组
		int[] myArray;

	}
	//狗叫的方法：
	void barking(){
		//方法体
		System.out.println('Wang~ Wang~');
	}

	//摇尾巴方法：
	void wagTail(){
		//空方法
	}
}

public class GoldernDog extends Dog{

}
//继承
//父类和子类
//父类的成员，子类全部拥有,子类的成员，父类不一定拥有
//人类 非洲人，人类就是父类，非洲人就是子类