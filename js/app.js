'use strict';

// Global variables
const gameBoard = document.querySelector('canvas');
let spdMultiplier = 100;
let spdMultiplierRogue = 200;

// Global functions
function charSelect() {
    let startScreen = document.createElement('div');
    startScreen.classList = 'modal';
    startScreen.innerHTML = '<p>Character Select</p>' +
                            '<div class="char-select">' +
                            '<div class="char"><img src="images/char-boy.png" alt="Character Boy"><p>James</p></div>' +
                            '<div class="char"><img src="images/char-cat-girl.png" alt="Character Cat Girl"><p>Ezra</p></div>' +
                            '<div class="char"><img src="images/char-horn-girl.png" alt="Character Horn Girl"><p>Eva</p></div>' +
                            '<div class="char"><img src="images/char-pink-girl.png" alt="Character Pink Girl"><p>Layla</p></div>' +
                            '<div class="char"><img src="images/char-princess-girl.png" alt="Character Princess Girl"><p>Susan</p></div>' +
                            '</div>';
    document.body.appendChild(startScreen);
    document.querySelector('.char-select').addEventListener('click', function(event) {
        player.sprite = event.target.getAttribute('src');
        startScreen.remove();
    });
}

function resetBugs() {
    if (spdMultiplier <= 300) {
        spdMultiplier += 50;
        spdMultiplierRogue += 50;
    }
    allEnemies = [
        new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
        new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
        new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier),
        new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplierRogue, 'images/enemy-bug-rogue.png')
    ];
};

function gamePad (event) {
    const xClick = event.clientX - this.offsetLeft;
    const yClick = event.clientY - this.offsetTop;
    if (xClick >= 37 && xClick <= 89 && yClick >= 467 && yClick <= 491) {
        player.handleInput('up');
    } else if (xClick >= 0 && xClick <= 37 && yClick >= 501 && yClick <= 548) {
        player.handleInput('left');
    } else if (xClick >= 38 && xClick <= 92 && yClick >= 548 && yClick <= 580) {
        player.handleInput('down');
    } else if (xClick >= 94 && xClick <= 120 && yClick >= 487 && yClick <= 543) {
        player.handleInput('right');
    }
};

function generateItems(numItems) {
    let items = [
        'images/Rock.png',
        'images/Star.png',
        'images/gem-green.png',
        'images/gem-orange.png',
        'images/gem-blue.png',
        'images/Heart.png'
    ]
    let itemCoords = [
        [15, 187],
        [116, 187],
        [217, 187],
        [318, 187],
        [419, 187],
        [15, 270],
        [116, 270],
        [217, 270],
        [318, 270],
        [419, 270],
        [15, 104],
        [116, 104],
        [217, 104],
        [318, 104],
        [419, 104]
    ]
    for (let i = 1; i <= 3; i++) {
        let itemInd = randLoc(items);
        let itemCoordsInd = randLoc(itemCoords);
        allItems.push(new Item(itemCoords[itemCoordsInd][0], itemCoords[itemCoordsInd][1], items[itemInd]));
        items.splice(itemInd, 1);
        itemCoords.splice(itemCoordsInd, 1);
    };
};

// Below are our classess

// Enemies our player must avoid
var Enemy = function(x, y, spd, sprite = 'images/enemy-bug.png') {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
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
        lives.value -= 1;

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // calculateLives();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.gameStart = 'no';
};

Player.prototype.update = function() {
    if (this.y === -15) {
        this.x = 201;
        this.y = 400;
        score.value += 500;
        resetBugs();
        allItems = [];
        generateItems();
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    if (lives.value < 0) {
        let resetScreen = document.createElement('div');
        resetScreen.classList = 'modal';
        resetScreen.innerHTML = '<p>Game Over</p>' +
                                '<p class="score">Final Score: ' + score.value + '</p>' +
                                '<button>Play Again?</button>';
        document.body.appendChild(resetScreen);
        lives.value = 3;
        player.x = 201;
        player.y = 400;
        score.value = 0;
        score.display = '0000000' + score.value.toString();
        allItems = [];
        document.querySelector('button').addEventListener('click', () => {
            resetScreen.remove();
            charSelect();
        });
    }
};

Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === 'up' && this.y >= 68) {
        this.y -= 83;
    } else if (keyPressed === 'down' && this.y <= 317) {
        this.y += 83;
    } else if (keyPressed === 'left' && this.x >= 0) {
        this.x -= 101;
    } else if (keyPressed === 'right' && this.x <= 304) {
        this.x += 101;
    }
};

var Item = function(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
};

Item.prototype.update = function() {
    if (this.x - 16 === player.x && this.y - 36 === player.y) {
        let itemUsed = allItems.indexOf(this);
        allItems.splice(itemUsed, 1);
        if (this.image === 'images/Heart.png' && lives.value <= 5) {
            lives.value += 1;
        } else if (this.image === 'images/gem-green.png') {
            score.value += 3000;
        } else if (this.image === 'images/gem-blue.png') {
            score.value += 2000;
        } else if (this.image === 'images/gem-orange.png') {
            score.value += 1000;
        } else if (this.image === 'images/Star.png') {
            score.value += 150;
            allItems = [];
            generateItems();
        } else if (this.image === 'images/Rock.png') {
            if (score.value <= 3000) {
                score.value = 0;
            } else {
                score.value -= 3000;
            } 
        }
    }
};

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y, 61, 103);
};

var Score = function() {
    this.value = 0;
    this.display = '0000000' + this.value.toString();
};

Score.prototype.update = function() {
    if (this.value > 9 && this.value < 99) {
        this.display = '000000' + this.value.toString();
    } else if (this.value > 99 && this.value < 999) {
        this.display = '00000' + this.value.toString();
    } else if (this.value > 999 && this.value < 9999) {
        this.display = '0000' + this.value.toString();
    } else if (this.value > 9999 && this.value < 99999) {
        this.display = '000' + this.value.toString();
    } else if (this.value > 99999 && this.value < 999999) {
        this.display = '00' + this.value.toString();
    } else if (this.value > 999999 && this.value < 9999999) {
        this.display = '0' + this.value.toString();
    } else if (this.value > 9999999) {
        this.display = this.value;
    }
};

Score.prototype.render = function() {
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(this.display, 0,40);
};

var Lives = function() {
    this.value = 3;
    this.pos = 470;
};

Lives.prototype.render = function() {
    let pos = this.pos;
    for (let i = 1; i <= this.value; i++) {
        ctx.drawImage(Resources.get('images/Heart.png'), pos, 0, 30, 50);
        pos = pos - 30;
    }
};

var Gamepad = function() {
    this.upArrow = 'images/up_arrow.png';
    this.downArrow = 'images/down_arrow.png';
    this.rightArrow = 'images/right_arrow.png';
    this.leftArrow = 'images/left_arrow.png';
};

Gamepad.prototype.render = function() {
    ctx.drawImage(Resources.get(this.upArrow), 32, 448);
    ctx.drawImage(Resources.get(this.downArrow), 32, 530);
    ctx.drawImage(Resources.get(this.leftArrow), -10, 490);
    ctx.drawImage(Resources.get(this.rightArrow), 73, 490);
};

// Now instantiate your objectsrandLoc(enemyCols).
// Place all enemy objects in an array called allEnemies
// Now write your own player class
// Place the player object in a variable called player
function randLoc(array) {
    return Math.floor(Math.random() * array.length);
};

const player = new Player(201, 400);
const enemyRows = [68, 151, 234];
const enemyCols = [-800, -600, -500, -400, -300, -200, -100];

let allEnemies = [
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100), 
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100), 
    new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 100),
];

let allItems = [];
let lives = new Lives();
const score = new Score();
const gamepad = new Gamepad();

charSelect();

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

gameBoard.addEventListener('click', gamePad);