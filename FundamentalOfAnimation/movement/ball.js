function Ball(radius,color){
	var radius=40,color="#ffffff";
	this.x=0;
	this.y=0;
	this.radius=radius;
	this.rotation=0;
	this.scaleX=1;
	this.scaleY=1;
	this.color=color;
	this.lineWidth=0;
}

function rgba(hex,opacity){
	var hex=hex.charAt(0)=='#'?hex.substring(1,7):'';
	var r=parseInt(hex.substring(0,2),16);
	var g=parseInt(hex.substring(2,4),16);
	var b=parseInt(hex.substring(4,6),16);
	var a=opacity;
	var returnVal='rgba('+r+','+g+','+b+','+a+')';
	return returnVal;
}

Ball.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX,this.scaleY);
	context.lineWidth=this.lineWidth;
	context.fillStyle=rgba(this.color,this.opacity);
	context.beginPath();
	context.arc(0,0,this.radius,0,(Math.PI*2),true);
	context.closePath();
	context.fill();
	if(this.lineWidth>0){
		context.stroke();
	}
	context.restore();
}