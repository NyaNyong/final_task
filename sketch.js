// One ParticleSystem
let emitter;

//{!1} One repeller
let repeller;
let repellers = [];
let att;
let sec = 0;

function setup() {
  createCanvas(400, 400);
  emitter = new Emitter(width / 2, height/2);
  repeller = new Repeller(width / 2, 350);
  att = new Attractor(20, height/2);
}

function draw() {
  background(255);
    
  repeller.setPower(300);
  repeller.move(createVector(mouseX,mouseY));
  
  if (sec === 50){
    att.move(createVector(random(0,400),random(0,400)));
    emitter.move(createVector(random(100,300),random(100,300)));
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

  for (let s of repellers) {
    s.setPower(300);
    emitter.applyRepeller(s);
    s.show();
  }
  
  sec = sec +1;
}

function mouseClicked() {
  let s = new Repeller(mouseX, mouseY);
  repellers.push(s);
}