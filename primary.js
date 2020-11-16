
let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext('2d')

let player = {
	x: 400,
	y: 300,
	width: 30,
	length: 40,
	direction: 0,
	turnSpd: Math.PI,
	wheelDir: 0,
	wheelTurnSpd: 2,
	maxSpeed: 250,
	curSpeed: 0,
	accel: 100,
	windCoef: 0.4,
	brakeAccel: 90,
	move: function(dt){
		this.curSpeed -= this.windCoef*this.curSpeed*dt
		if (ui.w && !ui.s) {
			if (this.curSpeed < this.maxSpeed) {
				this.curSpeed += this.accel*dt
			}
		}
		if (ui.s && !ui.w && this.curSpeed > 0) {
			this.curSpeed -= this.brakeAccel*dt
		}
		if (this.curSpeed > this.maxSpeed) {
			this.curSpeed = this.maxSpeed
		}
		if (this.curSpeed <= 0 && ui.s) {
			this.curSpeed -= this.accel*dt
			if (this.curSpeed < -this.maxSpeed/2) {
				this.curSpeed = -this.maxSpeed/2
			}
		}

		if (ui.a && !ui.d) {
			this.wheelDir -= this.wheelTurnSpd * dt
			if (this.wheelDir < -1) {
				this.wheelDir = -1
			}
		} else if (ui.d && !ui.a) {
			this.wheelDir += this.wheelTurnSpd * dt
			if (this.wheelDir > 1) {
				this.wheelDir = 1
			}
		} else {
			if (this.wheelDir > 0) {
				this.wheelDir -= this.wheelTurnSpd * 2 * dt
			} else if (this.wheelDir < 0) {
				this.wheelDir += this.wheelTurnSpd * 2 * dt
			}
			if (Math.abs(this.wheelDir) < this.wheelTurnSpd * 2 * dt) {
				this.wheelDir = 0
			}
		}

		if (Math.abs(this.curSpeed) < this.accel/2*dt){
			this.curSpeed = 0
		}

		if (Math.abs(this.curSpeed) > 0) {
			this.direction += this.wheelDir * this.turnSpd * (0.5 + 0.5 * Math.abs(this.curSpeed/this.maxSpeed)) * dt
		}
		if (this.direction > Math.PI) {
			this.direction -= 2 * Math.PI
		} else if (this.direction < -Math.PI) {
			this.direction += 2 * Math.PI
		}
		this.x += this.curSpeed * Math.cos(this.direction) * dt
		this.y += this.curSpeed * Math.sin(this.direction) * dt
		
		trailParticles.push( {x: this.x + Math.sin(this.direction)*this.width/2, y: this.y - Math.cos(this.direction)*this.width/2, color: '#ff0000'} )	
		trailParticles.push( {x: this.x - Math.sin(this.direction)*this.width/2, y: this.y + Math.cos(this.direction)*this.width/2, color: '#ff0000'} )
		trailParticles.push( {x: this.x + Math.sin(this.direction)*this.width/2 + Math.cos(this.direction)*this.length, y: this.y - Math.cos(this.direction)*this.width/2 + Math.sin(this.direction)*this.length, color: '#0000ff'} )	
		trailParticles.push( {x: this.x - Math.sin(this.direction)*this.width/2 + Math.cos(this.direction)*this.length, y: this.y + Math.cos(this.direction)*this.width/2 + Math.sin(this.direction)*this.length, color: '#0000ff'} )
	},
	draw(){
		ctx.fillStyle = '#000000'
		ctx.translate(this.x,this.y)
		ctx.rotate(this.direction)
		ctx.fillRect(0,-this.width/2,this.length,this.width)
		ctx.rotate(-this.direction)
		ctx.translate(-this.x,-this.y)
	}
}

const setup = () => {
	player.x = 400
	player.y = 300
	player.curSpeed = 0
	player.direction = 0
	trailParticles = []
}

let trailParticles = []

let now = Date.now()
let lastTime = Date.now()
let dt

const update = () => {
	now = Date.now()
	dt = (now - lastTime)/1000.0
	lastTime = now

	player.move(dt)
	
	if (trailParticles.length > 200){
		trailParticles.shift()
		trailParticles.shift()
		trailParticles.shift()
		trailParticles.shift()
	}
	
	ctx.clearRect(0,0,canvas.width,canvas.height) // erase everything
	ctx.fillStyle = '#ffffff'; // set background color
	ctx.fillRect(0,0,canvas.width,canvas.height); // fill background
	
	for (let i = 0; i < trailParticles.length; i++) {
		ctx.fillStyle = trailParticles[i].color
		ctx.fillRect(trailParticles[i].x, trailParticles[i].y, 1, 1)
	}
	player.draw()
	window.requestAnimationFrame(update); // tell the browser to call this function again asap (this begins another frame)
}

setup();
update();