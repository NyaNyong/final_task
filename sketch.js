// One ParticleSystem
let emitter;

//{!1} One repeller
let repeller;
let repellers = [];
let att;

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
    s.show();
  }
}

function mouseClicked() {
  let s = new Repeller(mouseX, mouseY);
  repellers.push(s);
}