'use strict';

// Global variables
const gameContainer = document.querySelector('.gameboard');
const gameBoard = document.querySelector('canvas');
const musicToggleContainer = document.querySelector('.music-toggle');

// Setup Sounds for Game
const bgm = new Audio('sounds/bgm.mp3');
bgm.loop = true;
const effects = new Howl({
    src: ['sounds/effects.ogg', 'sounds/effects.m4a', 'sounds/effects.mp3', 'sounds/effects.ac3'],
    'sprite': {
        'bug-damage': [
            0,
            188.2312925170068
        ],
        'gem': [
            2000,
            307.3469387755101
        ],
        'star': [
            4000,
            1012.6757369614517
        ],
        'rock': [
            7000,
            1000
        ],
        'heart': [
            9000,
            495.19274376417144
        ],
        'gameover': [
            11000,
            2703.7188208616776
        ],
        'victory': [
            15000,
            1100.0000000000014
        ]
    }
});

// Global functions

function randInd(array) {
    // Get random index of specified array
    return Math.floor(Math.random() * array.length);
};

function toggleMusic(event) {
    // Toggle music on or off when function is triggered
    // Also, switch classes for the div for a different visual display
    // Finally, change text of div to show if music is ON or OFF
    if (musicToggleContainer.classList[1] === 'on') {
        musicToggleContainer.classList.remove('on');
        musicToggleContainer.classList.add('off');
        bgm.pause();
    } else {
        musicToggleContainer.classList.remove('off');
        musicToggleContainer.classList.add('on');
        // Only play music right now if the character selec￼t and game over screens
        // are not showing￼
        if (document.querySelector('.char-select') === null && document.querySelector('.game-over') === null) {
            bgm.play();
        }
    }
}

function charSelect () {
    // Create character select screen and append to canvas container
    const startScreen = document.createElement('div');
    startScreen.classList = 'modal';
    startScreen.innerHTML = '<p class="char-text">Character Select</p>' +
                                '<div class="char-select">' +
                                    '<div class="char">' +
                                        '<img src="images/char-boy.png" alt="Character Boy" class="char-image">' +
                                        '<p class="char-text">James</p>' +
                                '</div>' +
                                '<div class="char">' +
                                    '<img src="images/char-cat-girl.png" alt="Character Cat Girl" class="char-image">' +
                                    '<p class="char-text">Ezra</p>' +
                                '</div>' +
                                '<div class="char">' +
                                    '<img src="images/char-horn-girl.png" alt="Character Horn Girl" class="char-image">' +
                                    '<p class="char-text">Eva</p>' +
                                '</div>' +
                                '<div class="char">' +
                                    '<img src="images/char-pink-girl.png" alt="Character Pink Girl" class="char-image">' +
                                    '<p class="char-text">Layla</p>' +
                                '</div>' +
                                '<div class="char">' +
                                    '<img src="images/char-princess-girl.png" alt="Character Princess Girl" class="char-image">' +
                                    '<p class="char-text">Susan</p>' +
                                '</div>' +
                            '</div>';
    const charSelect = document.querySelector('.char-select');
    gameContainer.appendChild(startScreen);
    document.querySelector('.char-select').addEventListener('click', function (event) {
        // If character image is selected, get the target's src value,
        // otherwise, if the div is selected, get the first child element's 
        // src value. If anything else is clicked, do nothing.
        if (event.target.classList[0] === 'char') {
            player.sprite = event.target.firstElementChild.getAttribute('src');
            startScreen.remove();
            // Only play background music after character select screen
            // if music toggle is in the "on" position
            if (musicToggleContainer.classList[1] === 'on') {
                bgm.play();
            }
        } else if (event.target.classList[0] === 'char-image') {
            player.sprite = event.target.getAttribute('src');
            startScreen.remove();
            // Only play background music after character select screen
            // if music toggle is in the "on" position
            if (musicToggleContainer.classList[1] === 'on') {
                bgm.play();
            }
        }
    });
};

function gameOver () {
    // Game Over screen
    if (lives.value < 0) {
        // Create and display Game Over screen if there are no lives left
        // Play game over sound and stop music if it's playing
        bgm.pause();
        bgm.currentTime = 0;
        effects.play('gameover');
        const resetScreen = document.createElement('div');
        resetScreen.classList = 'modal';
        resetScreen.innerHTML = '<div class="game-over">' +
                                    '<div class="go-section">' +
                                        '<p>Game Over</p>' +
                                    '</div>' +
                                    '<div class="go-section">' +
                                        '<p class="score">Final Score: ' + score.value + '</p>' +
                                    '</div>' +
                                    '<div class="go-section">' +
                                        '<button class="play-again-button">Play Again?</button>' +
                                    '</div>' +
                                '</div>';
        gameContainer.appendChild(resetScreen);
        // Reset all variables to their default values
        lives.value = 3;
        player.x = 201;
        player.y = 400;
        score.value = 0;
        score.display = '0000000' + score.value.toString();
        allItems = [];
        allEnemies = [
            new Enemy(300, 400),
            new Enemy(300, 400),
            new Enemy(300, 400),
            new Enemy(400, 500, 'images/enemy-bug-rogue.png')
        ]
        document.querySelector('button').addEventListener('click', () => {
            // Remove Game Over screen and show the Character Select screen
            resetScreen.remove();
            charSelect();
        });
    };
};

function generateItems () {
    allItems = [];
    let items = [
        'images/Rock.png',
        'images/Star.png',
        'images/gem-green.png',
        'images/gem-orange.png',
        'images/gem-blue.png',
        'images/Heart.png'
    ];
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
    ];
    // Randomly place items around "battlefield" cells (where the bugs are)
    // Remove coordinates and item from respective variables after each iteration
    // This ensures that we don't see the same items in the same locations and 
    // each item is unique
    for (let i = 1; i <= 3; i++) {
        let itemInd = randInd(items);
        let itemCoordsInd = randInd(itemCoords);
        allItems.push(new Item(itemCoords[itemCoordsInd][0], itemCoords[itemCoordsInd][1], items[itemInd]));
        items.splice(itemInd, 1);
        itemCoords.splice(itemCoordsInd, 1);
    };
};

// Below are our classess

// Enemies our player must avoid
var Enemy = function (spd, maxSpd, sprite = 'images/enemy-bug.png') {
    // Set params to a variable
    this.spd = spd;
    this.maxSpd = maxSpd;
    this.sprite = sprite;

    // Other variables for enemy object
    // const enemyRows = [68, 151, 234];
    // const enemyCols = [-800, -600, -500, -400, -300, -200, -100];
    this.yArray = [68, 151, 234];
    this.x = Math.floor(Math.random() * 4) * 100 - 1000;
    this.y = this.yArray[randInd(this.yArray)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.spd * dt;
    if (this.x > 600) {
        // Return enemy to a position to left of canvas after
        // leaving to right of canvas
        this.x = Math.floor(Math.random() * 4) * 100 - 1000;
        this.y = this.yArray[randInd(this.yArray)];
    }
    // Collision detection when enemy collides with player
    if (this.y === player.y && this.x >= player.x - 61 && this.x <= player.x + 30) {
        // After enemy hits player, play damage sound sprite and
        // return player to starting position. Reduce hearts/lives by 1.
        effects.play('bug-damage');
        player.x = 201;
        player.y = 400;
        lives.value -= 1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.increaseSpd = function () {
    // Enemy reset called by engine
    this.spd += 10;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.gameStart = 'no';
};

Player.prototype.update = function () {
    // Update player position
    if (this.y === -15) {
        // When player reaches water, return player to starting position
        // increase score, reset bugs and items, play victory sound sprite
        effects.play('victory');
        this.x = 201;
        this.y = 400;
        score.value += 500;
    }

};

Player.prototype.render = function () {
    // Draw player on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPressed) {
    // Move character if the appropriate key is pressed
    // unless character is about to move off the canvas
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

Player.prototype.mobileInput = function(event) {
    // These are touch controls for mobile/touch devices
    // but can also be used on a PC with the mouse
    const getCanvasOffset = gameBoard.getBoundingClientRect();
    const xClick = event.offsetX;
    const yClick = event.offsetY - getCanvasOffset.top;
    if (yClick <= player.y) {
        player.handleInput('up');
    } else if (xClick <= player.x) {
        player.handleInput('left');
    } else if (xClick >= player.x + 101) {
        player.handleInput('right');
    } else if (yClick >= player.y + 72) {
        player.handleInput('down');
    }
};

var Item = function (x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
};

Item.prototype.update = function () {
    // Collision detection for items vs player position
    if (this.x - 16 === player.x && this.y - 36 === player.y) {
        let itemUsed = allItems.indexOf(this);
        allItems.splice(itemUsed, 1);
        // Apply bonuses depending on item used and play appropriate sound sprite
        if (this.image === 'images/Heart.png' && lives.value < 5) {
            effects.play('heart');
            lives.value += 1;
        } else if (this.image === 'images/gem-green.png') {
            effects.play('gem');
            score.value += 3000;
        } else if (this.image === 'images/gem-blue.png') {
            effects.play('gem');
            score.value += 2000;
        } else if (this.image === 'images/gem-orange.png') {
            effects.play('gem');
            score.value += 1000;
        } else if (this.image === 'images/Star.png') {
            effects.play('star');
            score.value += 150;
            generateItems();
        } else if (this.image === 'images/Rock.png') {
            effects.play('rock');
            // Make sure score does not fall below 0 in case user has less than 3000 points
            if (score.value <= 3000) {
                score.value = 0;
            } else {
                score.value -= 3000;
            }
        }
    }
};

Item.prototype.render = function () {
    // Draw items on screen
    ctx.drawImage(Resources.get(this.image), this.x, this.y, 61, 103);
};

var Score = function () {
    this.value = 0;
    this.display = '0000000' + this.value.toString();
};

Score.prototype.update = function () {
    //Prefix score with 0's until 8 digits are shown in total
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

Score.prototype.render = function () {
    // Render score on top left of screen
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(this.display, 0, 40);
};

var Lives = function () {
    this.value = 3;
    this.pos = 470;
};

Lives.prototype.render = function () {
    let pos = this.pos;
    // Draw hearts on top right of screen until current lives is reached
    for (let i = 1; i <= this.value; i++) {
        ctx.drawImage(Resources.get('images/Heart.png'), pos, 0, 30, 50);
        pos = pos - 30;
    }
};

// Create objects and placeholder variables for objects
const player = new Player(201, 400);

let allEnemies = [
    new Enemy(300, 400),
    new Enemy(300, 400),
    new Enemy(300, 400),
    new Enemy(400, 500, 'images/enemy-bug-rogue.png')
];

let allItems = [];
let lives = new Lives();
const score = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Run click/touch controls on canvas
gameBoard.addEventListener('click', player.mobileInput);

// Run music toggler on music toggle div
musicToggleContainer.addEventListener('click', toggleMusic);