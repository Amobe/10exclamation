

function onSquareClick(eventDate) {
	var square = eventDate.target;
	square.value += 1;
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

function Square(texture) {
	PIXI.Sprite.call(this, texture);
}
Square.constructor = Square;
Square.prototype = Object.create(PIXI.Sprite.prototype);
Square.prototype.init = initSquare;
