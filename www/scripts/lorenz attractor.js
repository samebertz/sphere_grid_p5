var color, init, omega, beta, rho, dt;

function setup() {
  createCanvas(511,511);
  background(72);
  colorMode(HSB);
  color = 0;
  omega = 10;
  beta = 8/3;
  rho = 28;
  init = [-10,-10,-10];
  dt = .001;
}

function draw() {
	color = (color+.1) % 359;
  stroke(color, 200, 200);
  var dx = dt*(omega*(init[1]-init[0]));
  var dy = dt*(init[0]*(rho-init[2])-init[1]);
  var dz = dt*(init[0]*init[1]-beta*init[2]);
  var next = [init[0]+dx, init[1]+dy, init[2]+dz];
  push();
	translate(width/4,height/4);
  line(init[0],init[1],next[0],next[1]);
  pop();
  push();
	translate(3*width/4,height/4);
  line(init[1],init[2],next[1],next[2]);
  pop();
  push();
	translate(width/4,3*height/4);
  line(init[0],init[2],next[0],next[2]);
  pop();
  push();
  var pi = project(init[0],init[1],init[2]);
  var pn = project(next[0],next[1],next[2]);
	translate(3*width/4,3*height/4);
  line(pi.x,pi.y,pn.x,pn.y);
  pop();
  init = next;
}

function project(x, y, z) {
	var a = {x:x,y:y,z:z};
  var c = {x:0,y:0,z:50};
  var th = {x:PI/2,y:0,z:0};
  var e = {x:0,y:0,z:1};

  var d = {x: cos(th.y)*(sin(th.z)*(a.y-c.y)+cos(th.z)*a.x-c.x),
			 y: sin(th.x)*(cos(th.y)*(a.z-c.z)+sin(th.y)*(sin(th.z)*(a.y-c.y)+cos(th.z)*(a.x-c.x))) +
       		cos(th.x)*(cos(th.z)*(a.y-c.y)-sin(th.z)*(a.x-c.x)),
       z: cos(th.x)*(cos(th.y)*(a.z-c.z)+sin(th.y)*(sin(th.z)*(a.y-c.y)+cos(th.z)*(a.x-c.x))) -
       		sin(th.x)*(cos(th.z)*(a.y-c.y)-sin(th.z)*(a.x-c.x))};

  var b = {x:d.x/d.z,y:d.y/d.z};
  return b;
}

function keyPressed() {
	if(key == ' ') {
  	noLoop();
  }
}
