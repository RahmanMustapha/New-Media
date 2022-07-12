let mic;
let cat;
let fill_color;

function setup() {
    createCanvas(1920, 1080);
    background(255);
    fill_color = 255;
    cat = createVideo(['/static/cat2_NMAAD.mov']);
    cat.hide(); // by default video shows up in separate dom
    // Create an Audio input
    mic = new p5.AudioIn();
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();    
}
var places = new Map()

function mousePressed() {
    userStartAudio()
}

function mouseDragged() {
    let vol = mic.getLevel();
    if (Math.random() < 0.2) {
        fill(128, 1);
        rect(0, 0, width, height);
    }
    let w = 30;
    //let pi = 180;
    //console.log(abs(sin((vol)*w)));
    r = abs(sin((vol)*w))*255;
    g = abs(cos((vol)*w))*255;
    b = abs(cos((vol)*w))*255;
    //console.log(r,g,b);
    d = Math.sqrt((pmouseX - mouseX) * (pmouseX - mouseX) + (pmouseY - mouseY) * (pmouseY - mouseY))    
    //strokeWeight(5)
    stroke(color(r, g, b, 255 / (1 + d)))
    strokeWeight(5+(5*sin(frameCount)))
    line(pmouseX, pmouseY, mouseX, mouseY)
    //X(`line(${pmouseX}, ${pmouseY}, ${mouseX}, ${mouseY})`)
    X(`stroke(color(${r},${g},${b},255/(1+${d})));line(${pmouseX}, ${pmouseY}, ${mouseX}, ${mouseY})`)
    X(`places.set('${socket.id}', [${pmouseX}, ${pmouseY}])`)
    for (var o of places) {
        drawTo = o[1]
        r = Math.random()
        line(mouseX, mouseY, (drawTo[0] - mouseX) * r + mouseX, (drawTo[1] - mouseY) * r + mouseY)
    }
    pmouseX = mouseX
    pmouseY = mouseY
}

function draw() {
  //create grid
  //mouse in region 1
  if ((mouseX < 640) && (mouseY < 360)) {
    image(cat, 1280, 720); //draw in region 9
    stroke(255);
    cat.play();
    filter(GRAY);
    rectfill(1);
    rectfill(5);
    stroke(0);
    ellipse(mouseX, mouseY, 33, 33);
  }
  //mouse in region 9
  if ((mouseX > 1280) && (mouseY > 720)) {
    image(cat, 0, 0); //draw in region 1
    stroke(255);
    cat.play();
    filter(GRAY);
    rectfill(5);
    rectfill(9);
    stroke(0);
    ellipse(mouseX, mouseY, 33, 33);
  }
  //mouse in region 3 or 7
  if (((mouseX > 1280) && (mouseY < 360)) || ((mouseX < 640) && (mouseY > 720))) {
    image(cat, 640, 360); //draw in region 5
    stroke(255);
    cat.play();
    filter(GRAY);
    rectfill(1);
    rectfill(9);
    stroke(0);
    ellipse(mouseX, mouseY, 33, 33);
  }
  if ((mouseX < 1280) && (mouseX > 640) && (mouseY < 720) && (mouseY > 360)) {
    stroke(255);
    rectfill(5);
  }
  /*else {
    cat.pause();
  }*/
  stroke((255-(frameCount%120)), (100+(frameCount*600)), 100-frameCount*20);
  strokeWeight(5+(5*sin(frameCount)))
  //if (mouseIsPressed === true) {
  //line(mouseX, mouseY, pmouseX, pmouseY);}
  //X(`line(${pmouseX}, ${pmouseY}, ${mouseX}, ${mouseY})`)
}

function rectfill(x) {
  if (x == 1) {
    rect(0, 0, 640, 360);
    stroke(255);
    fill(fill_color);
  }
  if (x == 9) {
    rect(1280, 720, 640, 360);
    stroke(255);
    fill(fill_color);
  }
  if (x == 5) {
    rect(640, 360, 640, 360);
    stroke(255);
    fill(fill_color);
  }
}
