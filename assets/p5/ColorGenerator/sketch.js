var resolution;
var grid;
var blank;
const guiSize = 150;
var colorBox = [];
var colorInfo = [];
var hueVal, satVal, briVal;
var hue, saturation, brightness;
var maxWidth;
var resolutionW;


function setup() {
  if(windowWidth < windowHeight) {
    maxWidth = windowWidth;
    resolutionW = maxWidth-guiSize;
  } else {
    maxWidth = windowHeight;
    resolutionW = maxWidth*0.8-guiSize;
  }
  createCanvas(maxWidth, windowHeight);
  colorMode(HSB);
  rectMode(CENTER);
  createGUI();
  noStroke();
}

function draw() {
  background(0);
  translate(resolution/2, resolution/2 + height*0.1);
  grid = s_grid.value();
  resolution = (resolutionW)/grid;
  blank = resolution * 0.1;

  if(hueVal != s_hue.value()) {
    s_hue_max.value(s_hue.value());
    s_hue_min.value(s_hue.value());
  }
  if(satVal != s_sat.value()) {
    s_sat_max.value(s_sat.value());
    s_sat_min.value(s_sat.value());
  }
  if(briVal != s_bri.value()) {
    s_bri_max.value(s_bri.value());
    s_bri_min.value(s_bri.value());
  }

  hueVal = s_hue.value();
  satVal = s_sat.value();
  briVal = s_bri.value();

  for(var y=0; y<grid; y++) {
    for(var x=0; x<grid; x++) {
      hue = map(x, 0, grid-1, s_hue_min.value(), s_hue_max.value());
      saturation = map(y, 0, grid-1, s_sat_min.value(), s_sat_max.value());
      brigthness = map(y, 0, (grid-1),  s_bri_min.value(),  s_bri_max.value());
      fill(hue, saturation, brigthness, 255);
      rect(x*resolution, y*resolution, resolution-blank, resolution-blank);
    }
  }
}

function inBox(mx, my) {
  my = my-height*0.1;
  var hitBox = false;
  for(var y=0; y<grid; y++) {
    for(var x=0; x<grid; x++) {
      if(x*resolution+blank/2<mx && (x+1)*resolution-blank/2>mx &&
      y*resolution+blank/2<my && (y+1)*resolution-blank/2>my) {
        hitBox = true;
        break;
      }
    }
  }
  return hitBox;
}

function mousePressed() {
  if(inBox(mouseX, mouseY)) {
    var col = get(mouseX, mouseY);

    var r = parseInt(col[0]).toString(16);
    var g = parseInt(col[1]).toString(16);
    var b = parseInt(col[2]).toString(16);

    if(r.length == 1) r = "0"+r;
    if(g.length == 1) g = "0"+g;
    if(b.length == 1) b = "0"+b;


    var hex = "#"+r+g+b;
    var id = colorBox.length;

    colorBox.push(createP(' '))
    colorBox[id].parent("wrapper")
    colorBox[id].style("color","rgb(255,255,255)")
    colorBox[id].style("background",hex)
    colorBox[id].style("width",20+"px")
    colorBox[id].style("height",20+"px")


    colorInfo.push(createP(hex))
    colorInfo[id].parent("wrapper")
    colorInfo[id].style("color","rgb(255,255,255)")
    colorInfo[id].style("background","transparent")


    for(var i=0; i<id+1; i++) {
      colorBox[i].position(0, (id-i)*30)
      colorInfo[i].position(30, (id-i)*30)
    }
  }
}

function reset() {
  var len = colorBox.length;
  if(len > 0) {
    for(var i=0; i<len; i++) {
      colorBox[i].remove();
      colorInfo[i].remove();
    }
    colorBox.splice(0, len);

    colorInfo.splice(0, len);
    console.log(colorBox);
  }
}

function createGUI() {
  var scal = 0.9;
  var pY = windowHeight*scal - guiSize ;
  var sliderY1 = pY + 45;
  var sliderY2 = sliderY1 + 30;
  var sliderY3 = sliderY1 + 60;
  var stepX = (width/4)*scal;
  var sw = stepX*scal;
  var blankLeft = (width/4)*(1-scal);


  var colorInfoWrapper = createDiv("");
  colorInfoWrapper.id("wrapper");
  colorInfoWrapper.position(width-guiSize + 30, height*0.1);
  colorInfoWrapper.style("background", "#000");
  colorInfoWrapper.style("width", (guiSize-30)+"px");
  colorInfoWrapper.style("height", (height*0.8-guiSize)+"px");
  colorInfoWrapper.style("overflow-y", "auto");



  b_reset = createButton("Reset");
  b_reset.mousePressed(reset);
  b_reset.style("width", "100px");
  b_reset.style("height", "30px");
  b_reset.style("background", "#000");
  b_reset.style("color", "#fff");
  b_reset.style("border", "solid 3px #fff");
  b_reset.position(width-b_reset.width, (height*scal))

  s_hue = createSlider(0, 360, 30);
  s_hue.position(blankLeft, sliderY3)
  s_hue.size(sw,AUTO)

  s_hue_min = createSlider(0, 360, 20);
  s_hue_min.position(blankLeft, sliderY1)
  s_hue_min.size(sw,AUTO)

  s_hue_max = createSlider(0, 360, 60);
  s_hue_max.position(blankLeft, sliderY2)
  s_hue_max.size(sw,AUTO)

  l_hue = createP('hue ')
  l_hue.style("color","rgb(255,255,255)")
  l_hue.position(blankLeft, pY)

  s_sat = createSlider(0, 100, 85);
  s_sat.position(blankLeft + stepX, sliderY3)
  s_sat.size(sw,AUTO)

  s_sat_min = createSlider(0, 100, 30);
  s_sat_min.position(blankLeft + stepX, sliderY1)
  s_sat_min.size(sw,AUTO)

  s_sat_max = createSlider(0, 100, 85);
  s_sat_max.position(blankLeft + stepX, sliderY2)
  s_sat_max.size(sw,AUTO)

  l_sat = createP('saturation ')
  l_sat.style("color","rgb(255,255,255)")
  l_sat.position(blankLeft + stepX, pY)

  s_bri = createSlider(0, 100, 95);
  s_bri.position(blankLeft + stepX*2, sliderY3)
  s_bri.size(sw,AUTO)

  s_bri_min = createSlider(0, 100, 95);
  s_bri_min.position(blankLeft + stepX*2, sliderY1)
  s_bri_min.size(sw,AUTO)

  s_bri_max = createSlider(0, 100, 85);
  s_bri_max.position(blankLeft + stepX*2, sliderY2)
  s_bri_max.size(sw,AUTO)

  l_bri = createP('brightness ')
  l_bri.style("color","rgb(255,255,255)")
  l_bri.position(blankLeft + stepX*2, pY)

  s_grid = createSlider(1, 20, 4);
  s_grid.position(blankLeft + stepX*3, sliderY1)
  s_grid.size(sw,AUTO)
  l_grid = createP('grid ')
  l_grid.style("color","rgb(255,255,255)")
  l_grid.position(blankLeft + stepX*3, pY)

	if(windowWidth < 640) {
		allP = selectAll("p");
		for(var i=0; i<allP.length; i++) {
			allP[i].style("font-size", "12px");
          	allP[i].style("text-transform", "capitalize")
		}
	}

  hueVal = s_hue.value();
  satVal = s_sat.value();
  briVal = s_bri.value();
}
