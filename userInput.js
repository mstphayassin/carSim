let ui = {
	left: false,
	right: false,
	up: false,
	down: false,
	z: false,
	x: false,
	c: false,
	w: false,
	a: false,
	d: false,
	s: false
}

document.addEventListener('keydown', event => {
	switch (event.keyCode){
	case 37:
		ui.left = true;
		break;
	case 38: 
		ui.up = true;
		break;
	case 39: 
		ui.right = true;
		break;
	case 40:
		ui.down = true;
		break;
	case 90:
		ui.z = true;
		break;
	case 88: 
		ui.x = true;
		break;
	case 67:
		ui.c = true;
		break;
	case 87:
		ui.w = true;
		break;
	case 83:
		ui.s = true;
		break;
	case 65:
		ui.a = true;
		break;
	case 68:
		ui.d = true;
		break;
	}
})

document.addEventListener('keyup', event => {
	switch (event.keyCode){
	case 37:
		ui.left = false;
		break;
	case 38: 
		ui.up = false;
		break;
	case 39: 
		ui.right = false;
		break;
	case 40:
		ui.down = false;
		break;
	case 90:
		ui.z = false;
		break;
	case 88: 
		ui.x = false;
		break;
	case 67:
		ui.c = false;
		break;
	case 87:
		ui.w = false;
		break;
	case 83:
		ui.s = false;
		break;
	case 65:
		ui.a = false
		break;
	case 68:
		ui.d = false
		break;
	case 82:
		setup()
		break;
	}
})