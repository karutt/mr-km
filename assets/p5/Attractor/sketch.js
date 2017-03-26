var G;
var stop = true;
var movers = [];
var mover_num;
test = 1;

function setup() {
   createCanvas(windowWidth, windowHeight);
   background(255);
   createGUI();
   for (var i = 0; i < mover_num; i++) {
      movers.push(new Mover(i));
   }
   noiseSeed(1000);
}

function draw() {

   fill(255, 0);
   rect(0, 0, width, height);

   for (var i = 0; i < movers.length; i++) {
      for (var j = 0; j < movers.length; j++) {
         if (i != j) {
            var force = movers[j].attract(movers[i]);
            movers[i].applyForce(force);
         }
      }
      movers[i].update();
      movers[i].display();
   }

}

function reset() {
      mover_num = s_num.value();
   movers = [];
   for (var i = 0; i < mover_num; i++) {
      movers.push(new Mover(i));
   }

   background(255);
   if (!stop) {
      stop = false;
      st();
   }
}

function st() {
   if (stop) {
      noLoop();
      b_stop.html("Start");
      b_stop.style("background", "#eee")
      stop = false;
   } else {
      loop();
      stop = true;
      b_stop.html("Stop");
      b_stop.style("background", "#fff")

   }
}

function createGUI() {
   var scal = 0.9;
   var stepX = (width / 4) * scal;
   var stepY = 30;
   var sliderWidth = stepX * scal;


   s_velocity = createSlider(0, 500, 0);
   s_velocity.position(stepX * 1, height * scal);
   s_velocity.size(sliderWidth, 30);
   p_v_exp = createP("Velocity");
   p_v_exp.style("font-size", "14px");
   p_v_exp.position(stepX * 1 - 60, height * scal - 10);

   s_gravity = createSlider(0, 2000, 220);
   s_gravity.position(stepX * 1, height * scal - stepY);
   s_gravity.size(sliderWidth, 30);
   p_g_exp = createP("Gravity");
   p_g_exp.style("font-size", "14px");
   p_g_exp.position(stepX * 1 - 60, height * scal - 10 - stepY);

   s_num = createSlider(1, 400, 200);
   s_num.position(stepX * 1, height * scal - stepY*2);
   s_num.size(sliderWidth, 30);
   p_n_exp = createP("Resolution");
   p_n_exp.style("font-size", "14px");
   p_n_exp.position(stepX * 1 - 70, height * scal - 10 - stepY*2);
   mover_num = s_num.value();

   b_stop = createButton("Stop");
   b_stop.mousePressed(st);
   b_stop.style("background", "255")
      .style("padding", "10px 10px")
      .style("border", "solid 2px #333")
      .style("background", "#fff");
   b_stop.position(width - stepX * 1 - b_stop.width, height * scal - stepY / 2.0);

   b_reset = createButton("Reset");
   b_reset.mousePressed(reset);
   b_reset.style("background", "255")
      .style("padding", "10px 10px")
      .style("border", "solid 2px #333")
      .style("background", "#fff");
   b_reset.position(width - stepX * 1 - b_reset.width + b_stop.width + 10, height * scal - stepY / 2.0);

}

var Mover = function(_id) {
   var step = 360.0 / mover_num;
   this.id = _id * step;
   var r = 10;
   this.location = createVector(cos(radians(this.id)) * r + width / 2, sin(radians(this.id)) * r + height / 2);
   this.velocity = createVector(sin(radians(this.id)) * cos(radians(this.id)) * 1, 1 * sin(radians(this.id) + s_velocity.value() / 1000.0));
   this.acceleration = createVector(0, 0);
   this.maxspeed = 4;

   this.diameter = 1.4;
   this.mass = this.diameter / 2;


   this.r = 2 + this.id / 10000;
   this.g = 30 + this.id / 10000;
   this.b = 100 + this.id / 10000;
};

Mover.prototype.applyForce = function(force) {
   var f = p5.Vector.div(force, this.mass);
   this.acceleration.add(f);
}

Mover.prototype.attract = function(m) {
   var force = p5.Vector.sub(this.location, m.location);
   var distance = force.mag();
   distance = constrain(distance, 60, 600);
   force.normalize();
   var strength = (s_gravity.value() / 1000.0 * this.mass * m.mass) / (distance * distance);
   force.mult(strength);
   return force;
}

Mover.prototype.update = function() {
   this.velocity.add(this.acceleration);
   this.location.add(this.velocity);
   this.acceleration.limit(this.maxspeed);
   this.acceleration.mult(0);
}

Mover.prototype.display = function() {
   noStroke();
   fill(190 * noise(this.r), 15 * noise(this.g), 25 * noise(this.b), 30);
   ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
   this.r += 0.01;
   this.g += 0.01;
   this.b += 0.01;
}
