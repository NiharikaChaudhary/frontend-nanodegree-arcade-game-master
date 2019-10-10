// global Variables as they are used in whole peogram
var maxSpd = 500,
    minSpd = 200;
var scoreCount = 0;

var Enemy = function(p, q) {
    // Variables applied to each of the instances
    this.sprite = 'images/enemy-bug.png';
    this.p = p;
    this.q = q;
    this.speed = this.get_Speed();

};
Enemy.prototype.get_Speed = function() {
    var spd = Math.floor(Math.random() * (maxSpd - minSpd + 1) + minSpd);
    return spd;

};
// Updated the enemy's position,which is a required method for game
// Parameter: dt,which is a time delta between ticks
Enemy.prototype.update = function(dt) {

    // the function which will ensure the game runs at the same speed for all computers.
    if (this.p < 500)
        this.p = this.p + this.speed * dt;
    else {
        this.p = -100;
        this.speed = this.get_Speed();
    }
};

//the enemy on the screen which is required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.p, this.q);
};
var Player = function(p, q) {
    this.sprite = 'images/char-boy.png';
    this.p = p;
    this.q = q;

};
Player.prototype.update = function() {
    var lenEnemies = allEnemies.length;
    var i;
    for (i = 0; i < lenEnemies; i++) {
        if ((this.q == allEnemies[i].q) && (this.p < allEnemies[i].p + 101) && (this.p + 101 > allEnemies[i].p)) {
            this.reset();
        }

    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.p, this.q);
};

Player.prototype.reset = function() {
    this.p = 200;
    this.q = 400;
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        if (this.p > 0) {
            this.p = this.p - 100;
        }

    } else if (key == 'right') {
        if (this.p < 400) {
            this.p = this.p + 100;
        }
    } else if (key == 'up') {
        if (this.q > 40) {
            this.q = this.q - 90;
        } else {
            //if water is hit player goes back to initial position
            // and increment score by 1
            scoreCount = scoreCount + 1;
            $('#scoreCount').text(scoreCount);
            this.reset();
        }
    } else if (key == 'down') {
        if (this.q < 400) {
            this.q = this.q + 90;
        }
    }
};

var allEnemies = [
    new Enemy(0, 40),
    new Enemy(0, 130),
    new Enemy(0, 220),
];
var player = new Player(200, 400);
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});