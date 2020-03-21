randomBetween = function(lower, upper) {
    return Math.random()*(upper-lower)+lower;
}

function randomColour() {
    return 'rgb(' + randomBetween(0,255) + ',' + randomBetween(0,255) + ',' + randomBetween(0,255) + ')';
}

class Ball {
    constructor(ctx, color) {
        this.r = 50;
        this.x = randomBetween(this.r, window.innerWidth-this.r);
        this.y = randomBetween(this.r, window.innerHeight-this.r);
        this.vx = randomBetween(1, 10);
        this.vy = randomBetween(1, 10)
        this.ctx = ctx;
        this.color = color;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        this.ctx.fill();        
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

class ContextHandler {
    constructor(ctx) {
        this.ctx = ctx;
        this.balls = [];
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    update() {
        for(let i = 0; i < this.balls.length; ++i) {
            this.balls[i].draw();
            this.balls[i].update();
        }
    }
}

function inititaliseCanvas() {
    const canvas = document.querySelector('.myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas.getContext('2d');
}

function doFrame(contextHandler) {
    contextHandler.update();
}

function mainLoop(contextHandler) {
    context.fillStyle = 'rgba(0,0,0.25)'
}

function main() {
    const context = inititaliseCanvas();

    let balls = [];
    
    contextHandler = new ContextHandler(context);

    contextHandler.addBall(new Ball(context, 'rgb(255,0,0)'));
    contextHandler.addBall(new Ball(context, 'rgb(0,255,0)'));
    contextHandler.addBall(new Ball(context, randomColour()));
    
    

}

main()


