#include<stdio.h>
void main(void)
{
	int t,number,i,mi,j,c=0;
	scanf("%d %d",&t,&number);
	int totalManus[number][100];
	char inputChar[]="%d ";
	char plus[]="%d";
	//输出
	for(i=0;i<number;i++){
		scanf("%d ",&totalManus[i][0]);
		for(j=0;j<totalManus[i][0];j++){
			strcat(inputChar,plus);
		}
		printf("%s\n",inputChar);
		printf("%d\n",totalManus[i][0]);
	}
}
