// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Reset the initial values for enemy instances
    // (See reset method for detail intialization)
    this.reset();
}

// Reset initial values of the enemy's position and speed.
// This is called when an enemy instance is created, the enemy
// moves over the right-most edge, and when the game is reset
Enemy.prototype.reset = function() {
    // x-y coordinates: to keep track current position of the enemies
    // x is initialized so that it is just behind the left-most edge
    // of the canvas;
    this.x = -101;
    // and y is randomly chosen of one rows 1, 2 and 3
    this.y = Math.round(1 + 2 * Math.random()) * 83 - 20;
    // The movement speed (along x-axis) of the enemies
    // (random about 2-5 cells per time unit)
    this.speed = (2 + 3 * Math.random()) * 83;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Move along x-axis according to the enemy's speed
    this.x += this.speed * dt;
    
    // Check whether the enemy moves across the right-most edge
    // of the canvas
    if (this.x > 505) {
        // then reset its state
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    
    // Reset the initial values for the player
    // (See reset method for detail intialization)
    this.reset();    this.reset();
}

Player.prototype.reset = function() {
    // Keep track of position of the player as row/column pair.
    // row is from 0 (top) to 5 (bottom), and 
    // column is from 0 (left) to 4 (right)
    this.row = 5; // in the last row, and
    this.col = 2; // in the middle of the grid
    
    // Alive status of the player. The player is not alive
    // when it is hit by one of the enemies (gameover), 
    // or it moves across the first row (this case the player wins)
    this.alive = true;
}

// Player position is not updated here, it is updated when user
// pressed one of arrow keys to move the player around.
// This method is to check collision of the player and the enemies
// to update player's alive status.
Player.prototype.update = function() {
    
    if (this.row == 0) {
        // Reached the water, win the game
        this.alive = false;
        return;
    }
    
    // Detect collision with enemies
    // Convert row/col position into 2D coordinates
    var x = this.col * 101;
    var y = this.row * 83 - 40;
    
    // Test if the player is collided with one of the enemies
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        
        // distance between the player and an enemy
        var dx = Math.abs(enemy.x - x);
        var dy = Math.abs(enemy.y - y);

        // Collision when the distance between the player and
        // an enemy is within half size of a grid cell
        if (dx < 101/2 && dy < 83/2) {
            // Game over
            this.alive = false;
            return;
        }
    }
}

// Draw the player at its current position
Player.prototype.render = function() {
    // Convert row/col position into 2D coordinates
    var x = this.col * 101;
    var y = this.row * 83 - 40;
    ctx.drawImage(Resources.get(this.sprite), x, y);
}

// Handle user pressing one of arrow keys to move the player
// This method also validates the current player's position
// to make sure it does not move beyond the grid.
Player.prototype.handleInput = function(key) {
    if (!this.alive) {
        return;
    }
    
    if (key == 'left') {
        // Move one cell to the left
        if (this.col > 0) {
            this.col--;
        }
        
    } else if (key == 'up') {
        // Move one cell to the top
        if (this.row > 0) {
            this.row--;
        }
        
    } else if (key == 'right') {
        // Move one cell to the right
        if (this.col < 4) {
            this.col++;
        }
        
    } else if (key == 'down') {
        // Move one cell to the bottom
        if (this.row < 5) {
            this.row++;
        }
    }
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create a number of enemies.
// If an enemy moves across the right-most edge the canvas, 
// it is reset to the left-most edge (this makes the effect
// that there are unlimited number of enemy instances)
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

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
