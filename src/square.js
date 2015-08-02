var VALUE_AFTER_CLICK = -1;
var RESET_VALUE_MIN = 1;
var RESET_VALUE_MAX = 5;

function getRandomValue(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function onSquareClick(eventDate) {
	var square = eventDate.target;
	square.value = VALUE_AFTER_CLICK;
	console.log(square.value);
}

function initSquare() {
	this.value = 0;
	this.anchor = new PIXI.Point(0.5, 0.5);
	this.scale = new PIXI.Point(0.1, 0.1);
	this.position = new PIXI.Point(20, 20);

	// click event
	this.interactive = true;
	this.on("mousedown", onSquareClick);
	this.on("touchstart", onSquareClick);
	this.isClick = false;
}

function resetValue() {
	this.value = getRandomValue(RESET_VALUE_MIN, RESET_VALUE_MAX);
}

function Square(texture) {
	PIXI.Sprite.call(this, texture);
}
Square.constructor = Square;
Square.prototype = Object.create(PIXI.Sprite.prototype);
Square.prototype.init = initSquare;
Square.prototype.reset = resetValue;
