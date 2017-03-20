var l;
var c;

function setup() {
   c = createCanvas(windowWidth, windowHeight);
   l = new Liner();
   strokeWeight(0.7);
   smooth();
   background(255);
}

function draw() {
   background(0);
   fill(255, 100);
   textSize(20);
   //  text("Put the mouse cursor on the window.", width-400, 150);
   l.display();
}

function keyTyped() {
   if (key == 's') {
      saveCanvas(c, 'myCanvas', 'jpg');
   }
}


function intersection(ivec1, ivec2, jvec1, jvec2) {
   var m1 = (ivec1.y - ivec2.y) / (ivec1.x - ivec2.x);
   var m2 = (jvec1.y - jvec2.y) / (jvec1.x - jvec2.x);
   var x = (m1 * ivec1.x - m2 * jvec1.x + jvec1.y - ivec1.y) / (m1 - m2);
   var y = (m1 * m2 * (ivec1.x - jvec1.x) + m1 * jvec1.y - m2 * ivec1.y) / (m1 - m2);
   var s = createVector(x, y);
   return s;
}

function Draw_line(vec1, vec2, i) {
   var V = p5.Vector.sub(vec1, vec2);
   V.mult(1);
   push();
   translate(vec2.x, vec2.y);
   line(0, 0, V.x, V.y);
   pop();
}

var Liner = function Liner() {
   this.num = 25;
   this.pointr = 5;
   this.O = createVector();
   this.X = createVector(width * 0.8, 0);
   this.Y = createVector(width / 2, -height / 2);
   this.X1 = createVector();
   this.Y1 = createVector();
   this.L = createVector();
   this.Xn = [];
   this.Yn = [];
   this.Cn = [];
   this.mx = 0;
   this.my = 0;
   this.m = 0;
};

Liner.prototype.display = function() {

   this.mx = map(mouseX, 0, width, 0, 1);
   this.my = map(mouseY, 0, height, 0, 1);
   this.X1 = p5.Vector.mult(this.X, this.mx);
   this.Y1 = p5.Vector.mult(this.Y, this.my);
   this.L = intersection(this.X1, this.Y1, this.Y, this.X);

   this.Xn[0] = this.X1;
   this.Yn[0] = this.Y1;
   for (var i = 0; i < this.num - 1; i++) {
      this.Cn[i] = intersection(this.Y1, this.X, this.Y, this.Xn[i]);
      this.Yn[i + 1] = intersection(this.O, this.Y, this.L, this.Cn[i]);
      this.Xn[i + 1] = intersection(this.O, this.X, this.L, this.Cn[i]);
   }

   this.m = intersection(this.Cn[0], this.O, this.X, this.Y);

   translate(width / 10, height / 1.2);
   ellipse(this.O.x, this.O.y, this.pointr, this.pointr);
   ellipse(this.X.x, this.X.y, this.pointr, this.pointr);
   ellipse(this.Y.x, this.Y.y, this.pointr, this.pointr);
   ellipse(this.L.x, this.L.y, this.pointr, this.pointr);
   ellipse(this.m.x, this.m.y, this.pointr, this.pointr);

   textSize(20);
   fill(250, 100, 10);
      noStroke();
   text("O", this.O.x - 10, this.O.y - 7);
   text("X", this.X.x + 10, this.X.y);
   text("Y", this.Y.x, this.Y.y - 10);
   fill(255, 60, 120);
      noStroke();
   text("X1", this.X1.x, this.X1.y);
   text("Y1", this.Y1.x + 4, this.Y1.y);
   fill(255);
   textSize(15);
   noStroke();
   text("L", this.L.x, this.L.y - 10);
   text("M", this.m.x, this.m.y - 10);

   stroke(255, 50, 0);
   Draw_line(this.X, this.O, 0);
   Draw_line(this.Y, this.O, 0);
   line(this.L.x, this.L.y, this.X.x, this.X.y);
   stroke(0, 100, 0);
   Draw_line(this.O, this.m, 0);


   for (var i = 0; i < this.num - 1; i++) {
      var a = i + 2;
      fill(255 - i * (255 / this.num), 255 - (i + 1) * (255 / this.num));
      textSize((255 - i * (255 / this.num)) / 15);
         noStroke();
      text("X" + a, this.Xn[i + 1].x, this.Xn[i + 1].y);
      text("Y" + a, this.Yn[i + 1].x + 4, this.Yn[i + 1].y);
      text("P" + (i + 1), this.Cn[i].x, this.Cn[i].y);
      stroke(i * (255 / this.num), 100, 0);

      Draw_line(this.Xn[i], this.Y, i);
      Draw_line(this.Yn[i], this.X, i);
      Draw_line(this.Xn[i], this.m, i);
      Draw_line(this.Yn[i], this.m, i);
      Draw_line(this.Xn[i], this.L, i);
   }
};