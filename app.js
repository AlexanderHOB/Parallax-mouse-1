//OBTENER LAS PROPIEDADES DE LOS ELEMENTOS CANVAS
const $canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log(ctx);
//Arreglo de un arreglo de circulos o elementos
var array_list_circles = [];
//Numero de elementos que usaremos

var n_circles=25;
var n_lists = 5;

//Posicion del mouse y su movimiento
var x,y,mx,my;

//Redireccionamiento del canvas
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

//Definicion del clase circulo

class circle{
	//Parametros iniciales de los circulos
	constructor(posx,posy,radius,color){
		this.posx=posx;
		this.posy=posy;
		this.radius=radius;
		this.color = color;
	}
	//Pintado de circulo
	draw(ctx){
		ctx.fillStyle=this.color;
		ctx.beginPath();
		ctx.arc(this.posx,this.posy,this.radius,0,2*Math.PI);
		ctx.fill();
	}
	//Movimiento del circulo
	move(desx,desy){
		this.posx = this.posx + desx;
        this.posy = this.posy + desy;
    }
}
    //CREACION DE LOS CIRCULOS
    for(let i =0;i< n_lists;i++) {
    	var array_circles=[];
    	for(var j=0;j<n_circles;j++){
    		//inicializacin de los circulos en una posicion radio y color aletorio
			 array_circles.push(new circle(rnd(0, canvas.width), rnd(0, canvas.height), rnd(5,45), rnd_color_rgba()));
    	}
    	array_list_circles.push(array_circles);
    	array_circles=null;
    }
    //ESCUCHAMOS EL EVENTO MOVIMIENTO DEL MOUSE
    canvas.addEventListener('mousemove',handleMouseEvent,false);

    function handleMouseEvent(event){
    	//Obtenemos el tamaño del canvas y su pocision relativa respecto a la ventana
    	var rect = canvas.getBoundingClientRect();
    	//Obtenemos la poscion del mouse en el canvas
	    x = event.clientX - rect.left;
	    y = event.clientY - rect.top;
	    // Obtenemos el valor del desplazamiento que realiza el mouse 
	    mx = event.movementX;
	    my = event.movementY;
	    //ejecutamos el pintado de los elementos en canvas
	    draw();
    }
    //Function que retorna un valor aleatorio entre dos numeros
    function rnd(a,b){
    	return Math.floor(Math.random()*(b-a)+(a));
    }
    //Funcion que retona un color rgba aleatorio
	function rnd_color_rgba(){
	    return "rgba("+ rnd(0, 255) +", "+ rnd(0, 255) +", "+ rnd(0, 255) +", "+ ((Math.random() * (0.3 - 0.7) + 0.7).toFixed(4)) +")";
	}
	//Funcion que pinta los valores de la posicion  y el movimiento del mouse
	function draw_position(ctx){
		ctx.font = "10px Arial";
	    ctx.fillText("POSITION AND MOVEMENT",10,10);
	    ctx.fillText("x : " + x,10,20);
	    ctx.fillText("y : " + y,10,30);
	    ctx.fillText("mx : " + mx,10,50);
	    ctx.fillText("my : " + my,10,60);
	}
	// Funcion que pinta los elemento en el canvas
	function draw_circles(ctx){
	    for (var i = 0; i < n_lists; i++) {
	        for(var j = 0; j < n_circles; j++){
	            array_list_circles[i][j].draw(ctx);
	        }
	    }
	}
	//Function para el movimiento en distintos planos
	function move_circles(ctx){
		//Velocidad de movimiento mientras mas alta es mas lenta
		var speed = n_lists
		for (let i = 0; i<n_lists;i++) {
			for ( let j = 0; j<n_circles;j++){
				if(j%2==0){
					array_list_circles[i][j].move(mx/speed,(my/speed));
				}else{
					array_list_circles[i][j].move(mx*-1/speed,(my*-1/speed));
				}
			}
			speed--;
		}
	}
	// funtion de pintado
	function draw(){
		//Borrado del canvas
		ctx.clearRect(0,0,canvas.width, canvas.height);
		//Pintado de los circulos
    	draw_circles(ctx);
	    //Moviento en Parallax
    	move_circles();
    	//Pintar el puntero
	    ctx.fillStyle = "black";
	    ctx.beginPath();
	    ctx.arc(x,y,5,0, Math.PI * 2);
	    ctx.fill();
	    //Dibujar los valores del evento del mouse
    	draw_position(ctx);       
	}