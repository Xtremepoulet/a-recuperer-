const canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');


canvas.width = innerWidth;
canvas.height = innerHeight;








//position x et y de notre souris 
const mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}



class Ball{
	constructor(x, y, vx,vy, radius, color){
		this.x = x; 
		this.y = y;
		this.radius = radius;
		this.vx = vx;
		this.vy = vy;
		this.color = color;
	}


	update(){
		this.draw();

		this.x += this.vx;
		this.y += this.vy;

		if (balls_collision(circle.x, circle.y,this.x, this.y) > circle.radius - this.radius){
			this.vy = -this.vy;
			this.vx = -this.vx;
		}
	}



	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
	}

}




class Circle_delimitation{
	constructor(x,y,radius){
		this.x = x; 
		this.y = y;
		this.radius = radius;
	}


	update(){
		this.draw();
	}


	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		
	}
}






const colors = [

	'red',
	'blue',
	'yellow',
	'green',
	'pink'

]








let balls; 
let circle; 
//initialise nos composents 
const init = () => {

	balls = [];
	circle = new Circle_delimitation(mouse.x, mouse.y, 250);


	for (let i = 0; i < 250; i++){

		let x =  random_number(mouse.x - circle.radius + 100 , mouse.x + circle.radius - 100);
		let y = random_number(mouse.y - circle.radius + 100 , mouse.y + circle.radius - 100);
		
		let vx = random_number(-7,7);
		let vy = random_number(-7,7);
		let radius = random_number(1, 7);

		let k = random_number(0,5);
		let color = random_color(colors);

		



		balls.push(new Ball(x,y,vx, vy, radius, color));
	}



}




const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width, canvas.height);

	balls.forEach(ball => {
		ball.update();
	})
	circle.update();
}






const balls_collision = (x1,y1,x2,y2) => {
	let distanceX = x2 - x1;
	let distanceY = y2 - y1;

	return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}





//function to generate random number between 2 values (min may be equal)
const random_number = (min, max) => {
	  return Math.random() * (max - min) + min;

}


const random_color = (colors) => {
	let i = Math.floor(Math.random() * (5 - 0) + 0);
	return colors[i];
}




addEventListener('click', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	init();


})







init();
animate();