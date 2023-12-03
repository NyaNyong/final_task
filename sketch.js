// One ParticleSystem
let emitter;

//{!1} One repeller
let repeller;
let repellers = [];
let att;
let sec = 0;

let gui;
let params = {
  repelleramount : 0,
  repelleramountMin : 0,
  repelleramountMax : 12,
  repelpower : 200,
  repelpowerMin : 0,
  repelpowerMax : 400,
  particleamount : 3,
  particleamountMin : 0,
  particleamountMax : 10,
  attX : 150,
  attXMin : 0,
  attXMax : 400,
  attY : 150,
  attYMin : 0,
  attYMax : 400,
  attpower : 200,
  attpowerMin : 0,
  attpowerMax : 400,
  
}




function setup() {
  createCanvas(400, 400);
  emitter = new Emitter(width / 2, height/2);
  repeller = new Repeller(width / 2, 350);
  att = new Attractor(20, height/2);
  
  gui = createGui('task console');
  gui.addObject(params);
  gui.setPosition(310,10);
}

function draw() {
  background(255);
  
  for (let j=0; j < params.particleamount; j++){
    emitter.addParticle();
  }
  
  let gravity = createVector(0, 0.1);

  emitter.applyForce(gravity);
  emitter.applyAttractor(att);
  emitter.run();
  
  if (params.repelleramount > 0) {
    emitter.applyRepeller(repeller);
  }

  att.move(createVector(params.attX, params.attY));
  att.show();
  att.setPower(params.attpower);

  for (let i=0; i < params.repelleramount; i++){
    let interval = width / params.repelleramount;
    let s = new Repeller((interval/2)+(interval*i),350);
    repellers.push(s);
  }
  
  for (let s of repellers) {
    s.setPower(params.repelpower);
    emitter.applyRepeller(s);
    s.show();
    repellers = [];
  }
}
