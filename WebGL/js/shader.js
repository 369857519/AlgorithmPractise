function loadShaderFromDOM(id){
	var shaderScript=document.getElementById(id);
	//If we don't find an element with the specified id
	// we do an early exti
	if(!shaderScript){
		return;
	}

	var shaderSource="";
	var currentChild=shaderScript.firstChild;
	while(currentChild){
		if(currentChild.nodeType==3){
			shaderSource+=currentChild.textContent;
		}
		currentChild=currentChild.nextSibling;
	}

	var shader;
	if(shaderScript.type=="x-shader/x-vertex"){
		shader=gl.createShader(gl.VERTEX_SHADER);
	}else if(shaderScript.type=="x-shader/x-fragment"){
		shader=gl.createShader(gl.FRAGMENT_SHADER);
	}else{
		return null;
	}

	gl.shaderSource(shader,shaderSource);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
		console.log(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function createGLContext(canvas){
	var names=["webgl","experimental-webgl"];
	var context=null;
	for(var i=0;i<names.length;i++){
		try{
			context=canvas.getContext(names[i]);
		}catch(e){
			if(context){
				break;
			}
		}
	}
	if(context){
		context.viewportWidth=canvas.width;
		context.viewportHeight=canvas.height;
	}else{
		console.log("Failed to create Webgl context!")
	}
	return context;
}

function setupShaders(colorShader){
	vertexShader=loadShaderFromDOM('shader-vs');
	fragmentShader=loadShaderFromDOM('shader-fs');

	shaderProgram=gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram,fragmentShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
		console.log("Failed to setup shaders")
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute=gl.getAttribLocation(shaderProgram,'aVertexPosition');
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	if(colorShader){
		shaderProgram.vertexColorAttribute=gl.getAttribLocation(shaderProgram,'aVertexColor');
		gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	}
}

function bindBuffer(vertices,itemSize,numberOfItems,arrBit){
	var buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
	buffer.itemSize=itemSize;
	buffer.numberOfItems=numberOfItems;
	return buffer;
}

function bindElementArrayBuffer(indices,itemSize,numberOfItems){
	var buffer=gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
	buffer.numberOfItems=numberOfItems;
	buffer.itemSize=itemSize;
	return buffer;
}