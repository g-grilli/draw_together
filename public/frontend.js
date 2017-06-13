var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var mouse_down = false;
var past;
var current;
var server = io();
var color = 'blue';
var lineWidth = 1.0;
server.on('connect', function(socket) {
  console.log('connected');
});

function changeBlack() {
	color = 'black';
};
function changeBlue() {
	color = 'blue';
};
function changeRed() {
	color = 'red';
};
function changeYellow() {
	color = 'yellow';
};
function changeGreen() {
	color = 'green';
};

function changeEraser() {
	color = 'white';
	lineWidth = 20.0;
};

function changeThin() {
	lineWidth = 1.0;
};
function changeMedium() {
	lineWidth = 5.0;
};
function changeThick() {
	lineWidth = 10.0;
};

server.on('line-broadcast', function (msg) {
  draw(msg.past, msg.current, msg.color, msg.width);
});

function draw (past, current, color, lineWidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(past[0], past[1]);
  ctx.quadraticCurveTo(
    past[0], past[1],
    current[0], current[1]
  );
  
  ctx.stroke();
  ctx.closePath();
}

ctx.beginPath();

canvas.addEventListener('mouseup', function (event) {
  mouse_down = false;
  past = null;
  console.log('UP', event.offsetX, event.offsetY);
});


canvas.addEventListener('mousedown', function (event) {
  mouse_down = true;
  console.log('DOWN', event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', function (event) {
  mouse_down = false;
  past = null;
  console.log('UP', event.offsetX, event.offsetY);
});


canvas.addEventListener('mousemove', function (event) {
  if (mouse_down) {
    current = [event.offsetX, event.offsetY];
    console.log('MOVE', event.offsetX, event.offsetY);
    if (past) {
      server.emit('draw-line', {past: past, current: current, color: color, width: lineWidth});
      //draw(past, current);
    }
    
    past = [event.offsetX, event.offsetY];
  }
});
