
Hbase 一个分布式，面向列的开源数据库

HIVE集群＋Hbase集群

hive于关系型数据库的比较：
	查询语言：	HQL		SQL
	数据库的存储位置：	HDFS	Raw Device/LocalFs
	数据格式：	用户定义	系统定义
	数据更新：不支持	数据更新：不支持
	索引：	无 有
	执行：MapReduce Executor
	执行延迟：高	低
	可扩展性：高	低
	数据规模：大	小

数据仓库：DW
	面向主题
	数据的集合性
	相对稳定性
	随时间而改变
	数据模型
		星型，雪花型

数据库于数据仓库
	数据处理方式不同
	系统结构不同
	数据组织方式不同


Hibe的体系结构
	主要包括：用户接口，Thrift服务器，元数据存储，解释器，编译器

MapReduce
	主要分为两个主要阶段：mapping reducing
	每个阶段定义为一个数据处理函数，一个是mapper，一个是reducer
		mapper阶段：获取输入数据，降数据单元装入mapper
			过滤于转换
		reducer阶段：reducer处理来自mapper的所有输出，并给出最终结果
			聚合
	四个函数
		mapping
		reducing
		partitioning
		shuffling
	输入与输出（定制化）
		map 
			input:<k1,v1> output:<k2,v2>
		reduce
			input:<k2,list(v2)> output:<k3,v3>
		例子
			contWord:
			input:<String filename,String file_content>//filename会被忽略掉
			output:<String word,Integer count>
				我们可以输出一个又重复版本的信息
					<"foo",3>或者<"foo",1>
			这个时候reducer接收到的版本是<"foo",list(1,1,1,1)>
			统计后的output为
			<"foo",5>
	下面来展示一下伪代码
		map(String filename,String document){
			List<String> T=tokenize(document);
			for each tocken in T{
				emit((String)token,(Integer) 1);
			}
		}
		reduce(String token,List<Integer> values){
			Integer sum=0;
			for each value in values{
				sum=sum+value
			}
			emit((String)token,(Integer)sum);
		}
第一个Hadoop程序
	常用command
		namenode -format	格式化dfs文件系统
		secondarynamenode	运行dfs的第二namenode
		namenode	运行dfs的namenode
		datanode	云顶dfs的datanode
		dfsadmin	运行admin客户端
		fsck 	运行dfs文件系统检查工具
		fs 普通文件系统客户端
		balancer	运行集群的负载均衡工具
		jobtarcker	运行MapReduce的jobTracker节点
		pipes	运行一个pipes作业
		tasktracker	运行一个MapReduce的taskTracker节点
		job 	处理MapReduce作业
		version
		jar
		distcp <srcurl> <desturl>递归复制文件或目录
		archive －archiveName Name <src>*<dest>声称一个hadoop档案
		daemonlog	获取货这是每个daemon的log级别
		classname

Hadoop构造程序
	NameNode
		NameNode位于HDFS的主端，它指导从端DataNode执行底层的I/O任务
		由于运行NameNode消耗大量的内存和I/O资源，为了减轻机器的负载，主流NameNode的服务器同城不会存储数据或者执行MapReduce程度的计算任务
		所以NameNode服务器不会同时是DataNode服务器或者TaskTracker服务器
		问题：如果NameNode节点失效，则整个集群不能正常运行
	DataNode
		NameNode会告诉客户端，数据驻留在哪个部分，然后客户端会直接去访问DataNode
		HDFS数据块儿的读取和写入
			当希望对HDSFS文件读写时，文件被分为多个块儿，有NameNode告知客户端每个数据驻留在哪个DataNode中
			客户端直接与DataNode通信，来处理与数据块儿相对应的本地文件处理与数据块对应的本地文件
			而后，DataNode会与其他DataNode进行通信，复制这些块儿实现荣誉
	Secondary NameNode
		SNN是一个用语检测HDFS集群状态的辅助守护进程，每个集群都有一个SNN，
		它会独占一台服务器，这台服务器不会运行其他的DataNode或TaskTracker守护进程
		SHH于NameNode的不同在于它不接受或记录HDFS的任何世事变化，相反，它与NameNode通信，根据集群配置的时间间隔获取HDFS元数据的快照
	JobTracker
		JobTracker守护进程时应用程序和Hadoop之间的纽带。一旦代码提交到集群上，JobTracker就会确定执行计划。
			决定哪些文件，位不同的人物分配节点以及监控所有任务的运行
			如果人物失败，JobTracker讲自动重启人物，但所分配的节点可能会不同，同时收到与定义的充实次数限制
		每个Hadoop集群只有一个JobTracker守护进程，它通常运行在服务器集群的主节点上
	TaskerTracker
		计算的守护进程也遵循主从架构，TaskTracker管理各个人物在每个从节点上的实行情况
		tasktracker会不断的与JobTracker通信，如果JobTracker在指定的时间内没有收到来自Tasktracker的心跳，它会假定TaskTracker已经崩溃
		进而

常用配置文件
	伪分布式：
		core-site.xml
		mapred-size.xml
		hdfs-site.xml
一些常见操作
	hdfs:
		hadoop fs -cmd
		hadoop fs -ls
		hadoop fs -cat hdfs://localhost:9090/user/chunk/example.txt
		hadoop fs -cat example.txt
		hadoop fs -mkdir /user/chunck
		hadoop fs -put example.txt
		hadoop fs -put example.txt /user/chuck
		hadoop fs -lsr /
		hadoop fs -get example
		hadoop fs -tail example
		hadoop fs -rm example
		hadoop fs -help ls






