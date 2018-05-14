
let lives = 3;
let realScore = 9;
let score = '00000' + realScore.toString();
let gameNum = 1;
let spdMultiplier = gameNum * 0.8 * 100;
let spdMultiplierRogue = gameNum * 0.8 * 300;

function findScore() {
    realScore += 10;
    if (realScore > 9 && realScore < 99) {
        score = '0000' + realScore.toString();
    } else if (realScore > 99 && realScore < 999) {
        score = '000' + realScore.toString();
    } else if (realScore > 999 && realScore < 9999) {
        score = '00' + realScore.toString();
    } else if (realScore > 9999 && realScore < 99999) {
        score = '0' + realScore.toString();
    } else if (realScore > 99999) {
        score = realScore;
    }
}
// Enemies our player must avoid
var Enemy = function(x, y, spd) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.spd = spd;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.spd * dt;
    if (this.x > 600) {
        this.x = enemyCols[randLoc(enemyCols)];
        this.y = enemyRows[randLoc(enemyRows)];
    }
    if (this.y === player.y && this.x >= player.x - 61 && this.x <= player.x + 30) {
        player.x = 201;
        player.y = 400;
        lives -= 1;

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(score, 0,40);
    if (lives === 3) {
        ctx.drawImage(Resources.get('images/Heart.png'), 470, 0, 30, 50);
        ctx.drawImage(Resources.get('images/Heart.png'), 440, 0, 30, 50);
        ctx.drawImage(Resources.get('images/Heart.png'), 410, 0, 30, 50);
    } else if (lives === 2) {
        ctx.drawImage(Resources.get('images/Heart.png'), 470, 0, 30, 50);
        ctx.drawImage(Resources.get('images/Heart.png'), 440, 0, 30, 50);
    } else if (lives === 1) {
        ctx.drawImage(Resources.get('images/Heart.png'), 470, 0, 30, 50);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    if (this.y === -15) {
        this.x = 201;
        this.y = 400;
        gameNum += 1;
        findScore();
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === 'up' && this.y >= 68) {
        this.y -= 83;
    } else if (keyPressed === 'down' && this.y <= 317) {comotify
        this.y += 83;
    } else if (keyPressed === 'left' && this.x >= 0) {
        this.x -= 101;
    } else if (keyPressed === 'right' && this.x <= 304) {
        this.x += 101;
    }
}
// Now instantiate your objectsrandLoc(enemyCols).
// Place all enemy objects in an array called allEnemies
// Now write your own player class
// Place the player object in a variable called player
function randLoc(array) {
    return Math.floor(Math.random() * array.length);
}

const player = new Player(201, 400);
const enemyRows = [68, 151, 234];
const enemyCols = [-800, -600, -500, -400, -300, -200, -100];

let allEnemies = [
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100), 
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100), 
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100),
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100)
];

//TODO: Add gems/hearts

//TODO: Add hearts at to of screen to keep track of lives remaining

//TODO: Add score function, keep track of score on top left of screen
    // Score should go up each time player reaches water
    // Score multiplier should go up each time player reaches water
    // Enemy speed should go up each time player reaches water
    // 4th enemy is a "rogue" and will not appear until a few "games" in, and
    // his speed is much faster than the others.

    
    

randLoc(enemyCols)
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});