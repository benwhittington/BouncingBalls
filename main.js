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
}

main = function() {
    const canvas = document.querySelector('.myCanvas');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    // ctx.translate(width/2, height/2);

    let balls = [];
    balls.push(new Ball(ctx, 'rgb(255,0,0)'));
    balls.push(new Ball(ctx, 'rgb(0,255,0)'));
    balls.push(new Ball(ctx, randomColour()));

    for(let i = 0;i < balls.length; ++i) {
        balls[i].draw();
    }
}

main()


