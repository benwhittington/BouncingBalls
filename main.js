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
    constructor(x, y) {
        this.winX = window.innerWidth;
        this.winY = window.innerHeight;
        this.r = randomBetween(3, 30);
        this.vx = randomBetween(-10, 10);
        this.vy = randomBetween(-10, 10)
        this.colour = randomColour();

        if(x === undefined || y === undefined) {
            this.x = randomBetween(this.r, this.winX-this.r);
            this.y = randomBetween(this.r, this.winY-this.r);
        } else {            
            this.x = x;
            this.y = y;
        }
    }
}

class ContextHandler {
    constructor(ctx) {
        this.ctx = ctx;
        this.balls = [];
        this.backgroundColour = new Colour(0,0,0,1);
        this.frac = 0.001
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    update() {
        let avgSpeed = 0;
        this.clear();

        for(let i = 0; i < this.balls.length; ++i) {
            console.log(this.balls.length);
            this.draw(this.balls[i]);
            this.updateBall(this.balls[i]);
            this.checkBoundaryCollision(this.balls[i]);
            this.reduceSpeed(this.balls[i]);

            avgSpeed += Math.sqrt(Math.pow(this.balls[i].vx, 2) + Math.pow(this.balls[i].vy, 2));
        }
        avgSpeed /= this.balls.length;
        if(avgSpeed < 0.1 || avgSpeed > 15) { this.frac *= -1 }
    }

    draw(ball) {
        this.ctx.fillStyle = ball.colour.getString();
        this.ctx.beginPath();
        this.ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2,true);
        this.ctx.fill();   
    }

    updateBall(ball) {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }

    checkBoundaryCollision(ball) {
        if(ball.x >= ball.winX - ball.r) {
            ball.vx *= -1;
        }

        if(ball.x <= 0 + ball.r) {
            ball.vx *= -1
        }

        if(ball.y >= ball.winY - ball.r) {
            ball.vy *= -1;
        }

        if(ball.y <= 0 + ball.r) {
            ball.vy *= -1;
        }
    }

    reduceSpeed(ball) {
        ball.vx *= 1 - this.frac;
        ball.vy *= 1 - this.frac;
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

function getContextHandler() {
    const context = inititaliseCanvas();

    let balls = [];
    contextHandler = new ContextHandler(context);
    let numberOfBalls = 30;

    for(let i = 0;i < numberOfBalls; ++i) {
        contextHandler.addBall(new Ball());
    }

    return contextHandler;
}

function addBallEvent(e) {
    contextHandler.addBall(new Ball(e.clientX, e.clientY));
}

function mainLoop() {
    contextHandler.update();
    
    requestAnimationFrame(mainLoop);
}

document.addEventListener("click", addBallEvent);
contextHandler = getContextHandler();
requestAnimationFrame(mainLoop);