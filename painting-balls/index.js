const backgroundColor = [128,128,128];
const sounds = Array.from({ length: 6 });
const lineColor = [0, 255, 0]; 
const lineWidth = 3; 
const activeLineColor = [255, 0, 0]; 
const activeLineWidth = 6; 

const ball1 = {
    x: 115,
    y: 15,
    r: 30,
    fillColor: [255, 255, 0],
    strokeColor: [20, 200, 0],
    speed: 1.5,
    outlineWidth: 6,
    rightSound: sounds[0],
    leftSound: sounds[1],
    soundLength: 2000,
}

const ball2 = {
    x: 300,
    y: 130,
    r: 50,
    fillColor: [255, 0, 0],
    strokeColor: [255, 255, 0],
    speed: 1,
    outlineWidth: 6,
    rightSound: sounds[2],
    leftSound: sounds[3],
    soundLength: 2000,
}

const ball3 = {
    x: 300,
    y: 330,
    r: 70,
    fillColor: [255, 0, 255],
    strokeColor: [2, 0, 255],
    speed: 0.5,
    outlineWidth: 6,
    rightSound: sounds[4],
    leftSound: sounds[5],
    soundLength: 2000,
}

const balls = [ball1, ball2, ball3] 

const line1 ={
    x1: 100,
    y1: 0,
    x2: 100,
    y2: 800,
    color: lineColor,
    width: lineWidth,

}

const line2 ={
    x1: 500,
    y1: 0,
    x2: 500,
    y2: 800,
    color: lineColor,
    width: lineWidth,
}


const move = (ball) => {
    ball.x += ball.speed;
}

const drawCircle = ({x, y, r, fillColor, strokeColor}) =>{
    stroke(strokeColor);
    fill(fillColor);
    ellipse(x, y, r);
}

function drawLine({x1, y1, x2, y2, color, width}){
    stroke(color);
    strokeWeight(width);
    line(x1, y1, x2, y2);
}

function updateBall(ball){
    if(ball.x + ball.r/2 > line2.x1){
        ball.speed *= -1;
        activateLine(line2);
        ball.rightSound.play();
        if (ball.y < 800) {ball.y += 50; } 
        
        
    } else if (ball.x - ball.r/2 < line1.x1){
        ball.speed *= -1;
        
        activateLine(line1);
        ball.leftSound.play();
    
    }
    ball.x += ball.speed; 
}

function activateLine(line) {
    line.color = activeLineColor;
    line.width = activeLineWidth;
    setTimeout(() => resetLines(line), 500);
}

function resetLines(line) {
    line.color = lineColor;
    line.width = lineWidth;
}


function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    })

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
    console.log(sounds);
    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];
}


function setup(){
    createCanvas(800, 700);
    background(128,128,128);

}


function draw(){
    //background(backgroundColor);
    balls.forEach((ball) => {
    drawCircle(ball);
    updateBall(ball);
    }) 
    drawLine(line1);
    drawLine(line2);
}

