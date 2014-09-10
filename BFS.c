// http://jingyan.baidu.com/article/22a299b57bacf39e19376a83.html
#include<stdio.h>
#include "conio.h"
#include "stdlib.h"
#define MAX_VERTEX_NUM 10
#define ARC_NUM 12
// #define MAX_QUEUEMEM(MAX_VERTEX_NUM+1)

// 等待被遍历的图
int GraphEdge[ARC_NUM*2][2]={{0,1},{1,0},{1,2},{2,1},{2,3},{3,2},{3,4},{4,3},{4,5},{5,4},{5,0},{0,5},{0,6},{6,0},{6,8},{8,6},{6,7},{7,6},{7,8},{8,7},{7,3},{3,7},{8,4},{4,8}};
int visited[MAX_VERTEX_NUM]={0,0,0,0,0,0,0,0,0};
// 三个结构体
//弧
typedef struct ArcNode{
	int adjvex;//弧指向顶线的位置
	struct ArcNode *nextarc;
}ArcNode;
//头结点
typedef struct VNode
{
	int data;
	//指向的arc
	struct ArcNode * firstarc;
}VNode,AdjList[MAX_VERTEX_NUM];
//图结构
typedef struct{
	VNode vertices[MAX_VERTEX_NUM];
	int verxnum;
	int arcnum;
}ALGraph;

void CreateGraph(ALGraph * alGraph){
	int i,j;
	ArcNode * newnode;
	ArcNode * vexNode;
	//传入一个图结构，并设置最大节点和最大弧
	alGraph->verxnum=MAX_VERTEX_NUM;
	alGraph->arcnum=ARC_NUM;
	/*初始化表头*/
	for(i=0;i<MAX_VERTEX_NUM;i++)
	{
		alGraph->vertices[i].data=i;
		alGraph->vertices[i].firstarc=NULL;
	}
	//建立关系
	for(j=0;j<2*ARC_NUM,j++){
		i=GraphEdge[j][0];
		
	}
}
void OutputGraph(ALGraph * alGraph){
	int i;
	ArcNode *vexNode;
	printf("The graph dedicated ty adjacency li is:\n");
	for(i=0;i<MAX_VERTEX_NUM;i++){
		printf("the header is:[%d]->",alGraph->vertices[i].data);
		//输出邻接表的值
		vexNode=alGraph->vertices[i].firstarc;
		while(vexNode!=NULL){
			printf("[%d]->",vexNode->adjvex);
			vexNode=vexNode->nextarc;
		}
		printf("[END]\n");
	}
}
//深度优先遍历某个节点
void DFS(ALGraph * alGraph,int v){
	int w;
	ArcNode * vexNode;
	visited[v]=1;
	printf("[%d]->",v);
	vexNode=alGraph->vertices[v].firstarc;
	while(vexNode!=NULL){
		w=vexNode->adjvex;
		if(visited[w]==0)
			DFS(alGraph,w);
		vexNode=vexNode->nextarc;
	}
}
//图的深度优先遍历（遍历所有节点）
void DFSTraverse(ALGraph * alGraph){
	int i;
	// 初始化
	for(i=0;i<MAX_VERTEX_NUM;i++){
		visited[i]=0;
	}
	printf("\n");
	puts("**************************************************");
	puts("results of DFS is:");
	for(i=0;i<MAX_VERTEX_NUM;i++){
		if(visited[i]==0)
			DFS(alGraph,i);
	}
	printf("[end]\n");
}
void main(void){
	ALGraph alGraph;
	CreateGraph(&alGraph);
	OutputGraph(&alGraph);
}