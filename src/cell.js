var VALUE_AFTER_CLICK = -1;
var RESET_VALUE_MIN = 1;
var RESET_VALUE_MAX = 5;
var DEFAULT_VALUE = 0;
var CELL_VALUE_MAX = 51;

var font_style = {
	font: 'bold 24px Orbitron',
	fill: '#333333',
	align:"center"
};

function getRandomValue(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function onCellClick(eventData) {
	var cell = eventData.target;
	cell.value = VALUE_AFTER_CLICK;
	cell.update();
}

function getBackground() {
	var background = new PIXI.Graphics();
	//background.lineStyle(2, 0xFF00FF, 1);
	background.beginFill(0xFFFDF8, 0.25);
	background.drawRoundedRect(0, 0, 50, 50, 3);
	background.endFill();
	return background;
}

function getValueText(value) {
	var text = new PIXI.Text(value.toString(), font_style);
	text.position = new PIXI.Point(0, 0);
	return text;
}

function setTextPosition(background, text) {
	text.position.x = (background.width - text.width) / 2;
	text.position.y = (background.height - text.height) / 2;
}

function Cell(value) {
	PIXI.Container.call(this);
	//this.value = getRandomValue(RESET_VALUE_MIN, RESET_VALUE_MAX);
	this.neighbors = new Array();

	if (!value)
		this.value = DEFAULT_VALUE;
	else
		this.value = value;

	// click event
	this.interactive = true;
	this.on("mousedown", onCellClick);
	this.on("touchstart", onCellClick);

	// initialize
	this.init();
}

Cell.prototype = Object.create(PIXI.Container.prototype);
Cell.prototype.constructor = Cell;
Cell.prototype.init = function() {
	var background = getBackground();
	var text = getValueText(this.value);

	setTextPosition(background, text);

	this.addChild(background);
	this.addChild(text);
}
Cell.prototype.getBackground = function() {
	return this.children[0];
}
Cell.prototype.getValueText = function() {
	return this.children[1];
}
// Neighbor Handler
Cell.prototype.addNeighbor = function(neighbor) {
	if (neighbor instanceof Cell)
		this.neighbors.push(neighbor);
	else
		console.log('Only allow to add the Cell object.');
}
Cell.prototype.clearNeighbor = function() {
	this.neighbors.length = 0;
}

// Value Handler
function checkValue(value) {
	if (this.value + value > CELL_VALUE_MAX) {
		console.log("Value out of range!!!!!");
		return false;
	}
	return true;
}

Cell.prototype.addValue = function(value) {
	if (checkValue(value).bind()) {
		this.value += value;
		cell.update();
	}
}

Cell.prototype.update = function() {
	this.getValueText().text = this.value.toString();
	setTextPosition(this.getBackground(), this.getValueText());
}
