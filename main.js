class Colour {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    getString() {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    }
}

class Ball {
    constructor(ctx, colour) {
        this.r = randomBetween(3, 50);
        this.winX = window.innerWidth;
        this.winY = window.innerHeight;
        this.x = randomBetween(this.r, this.winX-this.r);
        this.y = randomBetween(this.r, this.winY-this.r);
        this.vx = randomBetween(1, 10);
        this.vy = randomBetween(1, 10)
        this.ctx = ctx;
        this.colour = colour;
    }

    draw() {
        this.ctx.fillStyle = this.colour.getString();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        this.ctx.fill();        
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    checkBoundaryCollision() {
        if(this.x >= this.winX - this.r) {
            this.vx *= -1;
        }

        if(this.x <= 0 + this.r) {
            this.vx *= -1
        }

        if(this.y >= this.winY - this.r) {
            this.vy *= -1;
        }

        if(this.y <= 0 + this.r) {
            this.vy *= -1;
        }
    }
}

class ContextHandler {
    constructor(ctx) {
        this.ctx = ctx;
        this.balls = [];
        this.backgroundColour = new Colour(0,0,0,1);
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    update() {
        for(let i = 0; i < this.balls.length; ++i) {
            this.balls[i].draw();
            this.balls[i].update();
            this.balls[i].checkBoundaryCollision();
        }
    }

    clear() {
        this.ctx.fillStyle = this.backgroundColour.getString();
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}

function randomColour() {
    return new Colour(randomBetween(0,255), randomBetween(0,255), randomBetween(0,255), 1);
}

function randomBetween(lower, upper) {
    return Math.random()*(upper-lower)+lower;
}

function inititaliseCanvas() {
    const canvas = document.querySelector('.myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas.getContext('2d');
}

function main() {
    const context = inititaliseCanvas();

    let balls = [];
    contextHandler = new ContextHandler(context);
    let numberOfBalls = 5;
    for(let i = 0;i < numberOfBalls; ++i) {
        contextHandler.addBall(new Ball(context, randomColour()));
    }

    contextHandler.update();

    function mainLoop() {
        contextHandler.clear();
        contextHandler.update();

        requestAnimationFrame(mainLoop)
    }

    requestAnimationFrame(mainLoop);
}

main()