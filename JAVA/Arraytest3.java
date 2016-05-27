class Arraytest3
{
	public static void main (String[] args)
	{
		toHex(26);
		toBinary(-6);
		toOctal(26);
		System.out.println(Integer.toBinaryString(-6));

	}
	public static void toHex(int num)
	{
		trans(num,15,4);
	}
	public static void toBinary(int num)
	{
		trans(num,1,1);
	}
	public static void toOctal(int num)
	{
		trans(num,7,3);
	}
	public static void trans(int num,int base,int offset)
	{
		if(num==0)
		{
			System.out.println("0");
			return;
		}
		char[] arr={'0','1','2','3','4','5','6','7','8','9'};
		char[] arr=new char[8];
		int pos=arr.length;
		while (num!=0)
		{
			int temp =num&15;
			arr[--pos]=chs[temp];
			num=num>>>4;
		}
		System.out.println("pos="+pos);
		for(int x=pos;x<arr.length;x++)
		{
			System.out.print(arr[x]);
		}
	}
}