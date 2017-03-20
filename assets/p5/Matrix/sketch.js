var system;
var c = "QWERTYUIOPASDFGHJKLZXCVBNMabcdefghijklmnopqrstuvwxyz0123456789!#$%&'()0=~|{}*_?><+`";

function setup() {
   createCanvas(windowWidth, windowHeight);
   system = new ParticleSystem();
}

function draw() {
   fill(255, 10);
   rect(-1, -1, width + 1, height + 1)
   system.addParticle();
  //  system.applyForce(createVector(0, 0.1));
   system.seek(createVector(mouseX, mouseY));
   system.run();
}

var Particle = function() {
   this.maxforce = 0.1;
   this.maxspeed = 6;
   this.location = createVector(int(random(width)), 0);
   this.velocity = createVector(0, this.maxspeed);
   this.acceleration = createVector(0, 0);
   this.cha = '';
   this.fontsize = random(5, 15);
   this.step = this.fontsize;
   this.count = 0;
   this.col = "#7BC46A";
};

Particle.prototype.applyForce = function(f) {
   this.acceleration.add(f);
};


Particle.prototype.update = function() {
   this.velocity.add(this.acceleration);
   this.location.add(this.velocity);
   this.acceleration.mult(0);
   this.cha = c[int(random(0, c.length))];
};

Particle.prototype.seek = function(loc) {
   var desired = p5.Vector.sub(loc, this.location);
   desired.normalize();
   desired.mult(this.maxspeed);
   var steer = p5.Vector.sub(desired, this.velocity);
   steer.limit(this.maxforce);
   this.applyForce(steer);
};

Particle.prototype.display = function() {
   fill(this.col);
   textSize(this.fontsize);
   // textAlign(CENTER,CETENR);
   if (this.count > this.fontsize * 0.6) {
      text(this.cha, this.location.x, this.location.y);
      this.count = 0;
   } else {
      this.count += this.maxspeed;
   }
};

Particle.prototype.isDead = function() {
   if (this.location.y > height) return true;
   else return false;
};


var ParticleSystem = function() {
   this.particles = [];
   this.origin = createVector();
};

ParticleSystem.prototype.addParticle = function() {
   if(frameCount % 5 == 0) {
   this.particles.push(new Particle());
   }
};

ParticleSystem.prototype.seek = function(loc) {
   for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.seek(loc);
   }
};

ParticleSystem.prototype.run = function() {
   for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.update();
      p.display();
      if (p.isDead()) {
         this.particles.splice(i, 1);
      }
   }
};
