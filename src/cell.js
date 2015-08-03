var VALUE_AFTER_CLICK = -1;
var RESET_VALUE_MIN = 1;
var RESET_VALUE_MAX = 5;

var font_style = {
	font: 'bold 24px Orbitron',
	fill: '#333333',
	align:"center"
};

function getRandomValue(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function onCellClick(eventDate) {
	var cell = eventDate.target;
	//cell.value = VALUE_AFTER_CLICK;
	cell.value = getRandomValue(RESET_VALUE_MIN, RESET_VALUE_MAX);
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

function Cell() {
	PIXI.Container.call(this);
	//this.value = getRandomValue(RESET_VALUE_MIN, RESET_VALUE_MAX);
	this.value = 51;

	// click event
	this.interactive = true;
	this.on("mousedown", onCellClick);
	this.on("touchstart", onCellClick);

	// initialize
	this.init();
}
Cell.constructor = Cell;
Cell.prototype = Object.create(PIXI.Container.prototype);
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
Cell.prototype.update = function() {
	this.getValueText().text = this.value.toString();
	setTextPosition(this.getBackground(), this.getValueText());
}