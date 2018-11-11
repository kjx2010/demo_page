var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var a = canvas.getContext('2d');

//resize_canvasa
if (window.matchMedia("(min-width: 768px)").matches) {
    addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
   })
}

//random int
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//random color
function randomSelectColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

var colors = [
    '#191919',
    '#000c66',
    '#00073d',
    '#500000',
    '#4c0000',
];

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    //rotation speed
    this.velocity = 0.010;
    //determining the position of stars
    if (window.innerWidth > window.innerHeight) {
        starPosition = window.innerWidth
    } else {
        starPosition = window.innerHeight
    }
    this.distanceFromCenter = randomIntFromRange(1, starPosition / 1.9);

    this.update = () => {
        var lastPoints = {
            x: this.x,
            y: this.y
        };

        //move points
        this.radians += this.velocity;

        //circular motion
        this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw(lastPoints);
    };

    this.draw = lastPoints => {
        a.beginPath();
        a.strokeStyle = this.color;
        a.lineWidth = this.radius;
        a.moveTo(lastPoints.x, lastPoints.y);
        a.lineTo(this.x, this.y);
        a.stroke();
        a.closePath();
    };
}

var particles;

function init() {
    particles = [];
    var radius = (Math.random() * 3) + 1;

    for (var i = 0; i < 50; i++) {
        particles.push(new Particle(canvas.width / 15, canvas.height / 2, radius, randomSelectColor(colors)));
    }
}

function animate() {
    requestAnimationFrame(animate);
    //smudges
    a.fillStyle = 'rgba(35, 36, 38, 0.028)';
    a.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    })
}

init();
animate();
//clear first smudges
a.clearRect(0, 0, canvas.width, canvas.height);