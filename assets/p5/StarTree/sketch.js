var treeNum = 4;
var rootNum = 30;
var sum = treeNum + rootNum;
var tree = [];
var turn = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseSeed(655);
  for (var i=0; i<sum; i++) {
    if (i<rootNum) tree.push(new Tree(true));
    else tree.push(new Tree(false));
  }
  for (var i=0; i<sum; i++) {
    tree[i].initBranch();
  }
  shuffleNumber();
}

function draw() {
  background(50);
  for (var i=0; i<sum; i++) {
    tree[turn[i]].run();
  }
}

function shuffleNumber() {
  var temp;
  for (var i=0; i<sum; i++) {turn.push(i);}

  for (var i=turn.length-1; i>=0; i--) {
    var m = int(random(0, i+1));
    temp = turn[i];
    turn[i] = turn[m];
    turn[m] = temp;
  }
}

function mousePressed() {
  loop();
  noiseSeed(655);
  for (var i=0; i<sum; i++) {
    tree[i].initBranch();
  }
  loop(); //I do not know why second loop() is necessary for loop.
}

function keyPressed() {
  if (key =='s') saveFrame("####tree.png");
}


var Branch = function(_origin, _angle, _maxLen, _weight, _id) {
  this.origin = _origin;
  this.angle = _angle;
  this.maxLen = _maxLen;
  this.len = 0;
  this.weight = _weight;
  this.isGenerated = false;
  this.id = _id;
  this.brightness = 1.4;
  this.upColor = 50;
  this.col =color(205*noise(this.id/100.0)*this.brightness+this.upColor, 255*noise(this.id/100.0)*this.brightness+this.upColor, 255*noise(this.id/100.0)*this.brightness+this.upColor);
};

Branch.prototype.generate = function(id){
  var nextOrigin = createVector(0, -this.maxLen);
  nextOrigin.rotate(this.angle);
  nextOrigin.add(this.origin);
  var rGauss = randomGaussian();
  var range = 0.2;
  var mean = 0.6;
  var nextmaxLen = this.maxLen*(mean + rGauss*range) ;
  var nextAngle = this.angle + random(-PI/3, PI/3);
  var nextWeight = this.weight*random(0.5, 0.8);
  return new Branch(nextOrigin, nextAngle, nextmaxLen, nextWeight, id);
};

Branch.prototype.update = function() {
  if (this.len < this.maxLen) {
    this.len += this.maxLen;
  } else {
    this.len = this.maxLen;
  }
};

Branch.prototype.display = function() {
  push();
  translate(this.origin.x, this.origin.y);
  rotate(this.angle);
  strokeWeight(this.weight);
  stroke(this.col);
  line(0, 0, 0, -this.len);
  fill("#0DE0FA");
  ellipse(0, -this.len, this.len*0.1, this.len*0.1);
  pop();
};

Branch.prototype.isDone = function() {
  if (this.len == this.maxLen) return true;
  else return false;
};

var Root = function(_origin, _angle, _maxLen, _weight, _id) {
  this.origin = _origin;
  this.angle = _angle;
  this.maxLen = _maxLen;
  this.len = 0;
  this.weight = _weight;
  this.isGenerated = false;
  this.id = _id;
  this.brightness = 1.3;
  this.upColor = 50;
  this.col =color(205*noise(this.id/100.0)*this.brightness+this.upColor, 255*noise(this.id/100.0)*this.brightness+this.upColor, 255*noise(this.id/100.0)*this.brightness+this.upColor);
};

Root.prototype.generate = function(id){
  var nextOrigin = createVector(0, this.maxLen);
  nextOrigin.rotate(this.angle);
  nextOrigin.add(this.origin);
  var rGauss = randomGaussian();
  var range = 0.3;
  var mean = 0.6;
  var nextmaxLen = this.maxLen*(mean + rGauss*range) ;
  var nextAngle = this.angle + random(-PI/5, PI/5);
  var nextWeight = this.weight*random(0.4, 0.7);
  return new Root(nextOrigin, nextAngle, nextmaxLen, nextWeight, id);
};

Root.prototype.update = function() {
  if (this.len < this.maxLen) {
    this.len += this.maxLen;
  } else {
    this.len = this.maxLen;
  }
};

Root.prototype.display = function() {
  push();
  translate(this.origin.x, this.origin.y);
  rotate(this.angle);
  strokeWeight(this.weight);
  stroke(this.col);
  line(0, 0, 0, this.len);
  pop();
};

Root.prototype.isDone = function() {
  if (this.len == this.maxLen) return true;
  else return false;
};

var Tree = function(_isRoot) {
  this.branches = [];
  this.branchId = 0;
  this.origin;
  this.isRoot = _isRoot;
  this.x, this.y;
  this.initBranch();
  this.history = 0;
  this.lastLen = 0;
  this.len = 0;
};

Tree.prototype.initBranch = function() {
  this.branches = [];
  this.history = 0;
  this.lastLen = 0;
  this.len = 0;
  if (!this.isRoot) {
    this.x = width/2 + random(-13, 13);
    this.y = height*0.95;
  } else {
    this.x = width/2;
    this.y = height*0.95 + random(-20,20) + 0;
  }
  this.origin = createVector(this.x, this.y);
  this.branchId = 0;
  if (!this.isRoot) {
    this.branches.push(new Branch(this.origin, random(-PI/50, PI/50), random(80, 150), random(5, 30), this.branchId));
  } else {
    this.branches.push(new Root(this.origin, random(-PI/3, PI/3), random(0, 60), random(10, 1), this.branchId));
  }
}

Tree.prototype.updateBranch = function() {
  for (var i=0; i<this.branches.length; i++) {
    if (this.branches[i].isDone() && !this.branches[i].isGenerated) {
      this.branches[i].isGenerated = true;
      for (var j=0; j<int(random(2, 5)); j++) {
        if (!this.isRoot  && this.branches[i].maxLen>10 && this.branches.length < 1800) {
          this.branches.push(this.branches[i].generate(this.branchId));
          this.branchId ++;
        } else {
          if (this.branches.length < 20  && this.branches[i].maxLen>10) {
            this.branches.push(this.branches[i].generate(this.branchId));
            this.branchId ++;
          }
        }
      }
    }
  }
}


Tree.prototype.run = function() {
  this.len = this.branches.length;
  if(this.len == this.lastLen) this.history++;
  else this.history = 0;
  if(this.history > 10) {
    noLoop();
  }
  this.updateBranch();
  for (var i=0; i<this.branches.length; i++) {
    this.branches[i].update();
    this.branches[i].display();
  }
  this.lastLen = this.len;
}
