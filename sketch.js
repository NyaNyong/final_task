// One ParticleSystem
let emitter;

//{!1} One repeller
let repeller;
let repellers = [];
let att;
let sec = 0;

let powerslider;
let repelamountslider;

let gui;
let params = {
  repelleramount : 0,
  repelleramountMin : 0,
  repelleramountMax : 5,
}




function setup() {
  createCanvas(400, 400);
  emitter = new Emitter(width / 2, height/2);
  repeller = new Repeller(width / 2, 350);
  att = new Attractor(20, height/2);
  powerslider = createSlider(200, 400, 200);
  powerslider.position(20,20);
  repelamountslider = createSlider(0,10,0,1);
  repelamountslider.position(20, 500);
  
  gui = createGui('test slider');
  gui.addObject(params);
  gui.setPosition(310,10);
}

function draw() {
  background(255);
  
  
  
  let repelpower = powerslider.value();
    
  repeller.setPower(repelpower);
  repeller.move(createVector(mouseX,mouseY));
  
  if (sec === 50){
    att.move(createVector(random(0,400),random(0,400)));
    sec = 0;
  }
  
  
  emitter.addParticle();
  emitter.addParticle();
  emitter.addParticle();
  
  
  let gravity = createVector(0, 0.1);
  emitter.applyForce(gravity);

  emitter.applyRepeller(repeller);
  emitter.applyAttractor(att);
  emitter.run();

  repeller.show();
  att.show();

  for (let i=0; i < params.repelleramount; i++){
    let interval = width / params.repelleramount;
    let s = new Repeller((interval/2)+(interval*i),350);
    repellers.push(s);
  }
  
  for (let s of repellers) {
    s.setPower(repelpower);
    emitter.applyRepeller(s);
    s.show();
    repellers = [];
  }
  
  sec = sec +1;
}

// function keyPressed() {
//   if (keyCode === 32) {
//     let s = new Repeller(mouseX, mouseY);
//     repellers.push(s);
//   }
// }