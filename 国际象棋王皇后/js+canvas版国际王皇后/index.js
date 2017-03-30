var chess=document.getElementById('chess');
var context=chess.getContext('2d');
context.strokeStyle="#BFBFBF";

var logo=new Image();
logo.src='10.jpg';
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();
}
var drawChessBoard=function(){
// 通过for循环画棋盘
	for(var i=0;i<15;i++){
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
	}
}
var oneStep=function(i,j){
	context.beginPath();
	//利用arc画圆
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	//实现棋子颜色渐变
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
		gradient.addColorStop(0,'#0A0A0A');
		gradient.addColorStop(1,'#636766');
	context.fillStyle=gradient;
	context.fill();
}
//下棋绑定
//初始化一个数组，并且数组元素的值都为0
var chessBoard=[];
function newArray(arr){
	for(var i=0;i<15;i++){
		arr[i]=[];
		for(var j=0;j<15;j++){
			arr[i][j]=0;
		}
	}
}
newArray(chessBoard);
// 确定数组中的某个元素的值，使得该元素对应的位置符合国际象棋，皇后规则
function huangHo(arr,i,j){
	var x=arr.length;
	var y=arr[0].length;
	for(var a=0;a<x;a++){
		for(var b=0;b<y;b++){
			//在落子的斜线方向，将存在的数组元素的值为1，表示这里不可以下棋子了
			if(Math.abs(a-i)==Math.abs(b-j)){
				arr[a][b]=1;
			}
			//将横，纵方向存在的数组元素的值改为1，表示这里不可以下棋子了
			else if(a==i||b==j){
				arr[a][b]=1;
			}
		}
	}
	return arr;
}
//判断此处落子是否合适
function isOk(arr,i,j){
	var x=arr.length;
	var y=arr[0].length;
	//如果放的位置对应的数组值为1，说明此处不适合放棋子
	if(arr[i][j]==1){
		alert('此处落子，你将输掉游戏！');
		return false;
	}else{
		//否则说明此次适合放棋子，进行画棋子
		oneStep(j,i);
		huangHo(arr,i,j);
		return arr;
	}

};
//判断游戏是否胜利
//判断的标准是当数组中所有元素的值都是1的时候，游戏胜利
function isEnd(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr[0].length;j++){
			if(arr[i][j]!=1){
				return false;
			}
		}	
	}
	alert('恭喜你，你赢了！');
	location.reload();
}
chess.onclick=function(e){
	//获取当前位置的横坐标和纵坐标
	var x=e.offsetX;
	var y=e.offsetY;
	//得到对应的二维数组的下标
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	isOk(chessBoard,j,i);
	isEnd(chessBoard);
	console.log(chessBoard);
}
