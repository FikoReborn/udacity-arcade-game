// Global variables
const gameBoard = document.querySelector('canvas');
let lives = 3;
let realScore = 0;
let score = '00000' + realScore.toString();
let gameNum = 1;
let spdMultiplier = 100;
let spdMultiplierRogue = 300;

// Global functions
function findScore() {
    realScore += 10 * gameNum;
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

function resetBugs() {
    if (gameNum <= 4) {
        spdMultiplier += 100;
        spdMultiplierRogue += 100;
    }
    if (gameNum < 20) {
        allEnemies = [
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier),
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplierRogue, 'images/enemy-bug-rogue.png')
        ];
    } else if (gameNum < 50) {
        allEnemies = [
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier, 'images/enemy-bug-rogue.png'),
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplierRogue),
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 700, 'images/enemy-bug-rogue.png')
        ];
    } else {
        allEnemies = [
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier), 
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplier),
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], spdMultiplierRogue, 'images/enemy-bug-rogue.png'),
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 700, 'images/enemy-bug-rogue.png'),
            new Enemy(enemyCols[randLoc(enemyCols)], enemyRows[randLoc(enemyRows)], 700, 'images/enemy-bug-rogue.png')
        ];
    }
}

function calculateLives() {
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
}

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
}

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
}

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
        lives -= 1;

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(score, 0,40);
    calculateLives();
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
        resetBugs();
        allItems = [];
        generateItems();
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get('images/up_arrow.png'), 32, 448);
    ctx.drawImage(Resources.get('images/down_arrow.png'), 32, 530);
    ctx.drawImage(Resources.get('images/left_arrow.png'), -10, 490);
    ctx.drawImage(Resources.get('images/right_arrow.png'), 73, 490);
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
}

var Item = function(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
}

Item.prototype.update = function() {
    if (this.x - 16 === player.x && this.y - 36 === player.y) {
        let itemUsed = allItems.indexOf(this);
        allItems.splice(itemUsed, 1);
    }
}

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y, 61, 103);
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

let allItems = [];

//TODO: Add gems/hearts

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