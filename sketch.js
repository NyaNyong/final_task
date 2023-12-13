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
  repelleramountMax : 16,
  repelpower : 0,
  repelpowerMin : -50,
  repelpowerMax : 10,
  particleamount : 3,
  particleamountMin : 0,
  particleamountMax : 10,
  attpower : 0,
  attpowerMin : 0,
  attpowerMax : 400,
  time : 30,
  timeMin : 1,
  timeMax : 100,
  gravity : 10,
  gravityMin : 0,
  gravityMax : 10,
  Mydesire : ['균형잡힌', '지름신', '절제력', '수동']
}




function setup() {
  createCanvas(400, 400);
  emitter = new Emitter(width / 2, height/2, 255);
  repeller = new Repeller(width / 2, 350);
  att = new Attractor(20, height/2);
  
  gui = createGui('task console');
  gui.addObject(params);
  gui.setPosition(310,10);

  
}

function draw() {
  background(255);

  if(params.Mydesire == '균형잡힌') {
    params.repelleramount = 3;
    params.repelpower = 0;
    params.attpower = 200;
    params.time = 30;
    params.gravity = 10;
  } else if(params.Mydesire == '지름신') {
    params.repelleramount = 0;
    params.repelpower = -50;
    params.attpower = 400;
    params.time = 50;
    params.gravity = 3;
  } else if(params.Mydesire == '절제력') {
    params.repelleramount = 5;
    params.repelpower = 10;
    params.attpower = 0;
    params.time = 50;
    params.gravity = 10;
  } else if(params.Mydesire == '수동') {

  }
  
  for (let j=0; j < params.particleamount; j++){
    emitter.addParticle();
  }
  
  let gravity = createVector(0, params.gravity/100);

  emitter.applyForce(gravity);
  emitter.run();
  
  if(sec > params.time) {
    emitter.applyAttractor(att);
  
    if (params.repelleramount > 0) {
      emitter.applyRepeller(repeller);
    }
  }

  // att.move(createVector(params.attX, params.attY));
  att.move(createVector(mouseX,mouseY));
  att.show();
  att.setPower(params.attpower+200);

  for (let i=0; i < params.repelleramount; i++){
    let interval = width / params.repelleramount;
    let s = new Repeller((interval/2)+(interval*i),350);
    repellers.push(s);
  }
  
  for (let s of repellers) {
    if (sec > params.time) {
      s.setPower(params.repelpower+200);
    }
    emitter.applyRepeller(s);
    s.show();
    repellers = [];
  }

  if(sec > params.time*2) {
    sec = 0;
  }
  sec = sec+1;

  
}
