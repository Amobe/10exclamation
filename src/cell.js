var VALUE_AFTER_CLICK        = -1;
var RESET_VALUE_MIN          = 1;
var RESET_VALUE_MAX          = 5;
var DEFAULT_VALUE            = 0;
var CELL_VALUE_MAX           = 51;
var CELL_WIDTH               = 50;
var CELL_HEIGHT              = 50;
var CELL_ROUND               = 3;
var CELL_SHADOW_HEIGHT       = 6;
var CELL_SHADOW_HOVER_HEIGHT = 2;

var font_style = {
	font: 'bold 24px Orbitron',
	fill: '#333333',
	align:"center"
};

function onCellClick(eventData) {
	var cell = eventData.target;
	if (cell.value == VALUE_AFTER_CLICK)
		return;

	// setting the value of cell
	cell.setValue(VALUE_AFTER_CLICK);

	var background = cell.getBackground();
	var text = cell.getValueText();
	// remove background
	background.clear();
	// add a new backgroun with click style
	setBackgroundStyleClick(background);
	// reset the position for text
	setTextPositionClick(background, text);
}

function onCellMouseUp(eventData) {
	var cell = eventData.target;
	if (cell.value != VALUE_AFTER_CLICK)
		onCellHover(eventData);
	else
		onCellHoverOut(eventData);
}

function onCellHover(eventData) {
	var cell = eventData.target;
	if (cell.value == VALUE_AFTER_CLICK)
		return;

	var background = cell.getBackground();
	var text = cell.getValueText();
	background.clear();
	setBackgroundStyleHover(background);
	setTextPositionHover(background, text);
}

function onCellHoverOut(eventData) {
	var cell = eventData.target;
	var background = cell.getBackground();
	var text = cell.getValueText();
	background.clear();
	setBackgroundStyleDefault(background);
	setTextPositionDefault(background, text);
}

function setBackgroundStyleDefault(background) {
	background.beginFill(0x333333, 1);
	background.drawRoundedRect(0, CELL_SHADOW_HEIGHT, CELL_WIDTH, CELL_HEIGHT, CELL_ROUND);
	background.endFill();
	background.beginFill(0xFFFDF8, 1);
	background.drawRoundedRect(0, 0, CELL_WIDTH, CELL_HEIGHT, CELL_ROUND);
	background.endFill();
}

function setBackgroundStyleHover(background) {
	background.beginFill(0x333333, 1);
	background.drawRoundedRect(0, CELL_SHADOW_HEIGHT, CELL_WIDTH, CELL_HEIGHT, CELL_ROUND);
	background.endFill();
	background.beginFill(0xFFFDF8, 1);
	background.drawRoundedRect(0, CELL_SHADOW_HOVER_HEIGHT, CELL_WIDTH, CELL_HEIGHT, CELL_ROUND);
	background.endFill();
}

function setBackgroundStyleClick(background) {
	background.beginFill(0x333333, 1);
	background.drawRoundedRect(0, CELL_SHADOW_HEIGHT, CELL_WIDTH, CELL_HEIGHT, CELL_ROUND);
	background.endFill();
	background.beginFill(0xFFFDF8, 1);
	background.drawRoundedRect(0, CELL_SHADOW_HEIGHT, CELL_WIDTH, CELL_HEIGHT, CELL_ROUND);
	background.endFill();
}

function getBackground() {
	var background = new PIXI.Graphics();
	setBackgroundStyleDefault(background);
	return background;
}

function getValueText(value) {
	var text = new PIXI.Text(value.toString(), font_style);
	text.position = new PIXI.Point(0, 0);
	return text;
}

function setTextPositionDefault(background, text) {
	text.position.x = (background.width - text.width) / 2;
	text.position.y = (background.height - text.height - CELL_SHADOW_HEIGHT) / 2;
}

function setTextPositionHover(background, text) {
	text.position.x = (background.width - text.width) / 2;
	text.position.y = (background.height - text.height + CELL_SHADOW_HOVER_HEIGHT) / 2;
}

function setTextPositionClick(background, text) {
	text.position.x = (background.width - text.width) / 2;
	text.position.y = (background.height - text.height) / 2 + CELL_SHADOW_HEIGHT;
}

function Cell(value) {
	PIXI.Container.call(this);
	this.neighbors = new Array();

	if (!value)
		this.value = DEFAULT_VALUE;
	else
		this.value = value;

	// click event
	this.interactive = true;

	this.on("mouseover", onCellHover);
	this.on("mouseout", onCellHoverOut);
	this.on("mousedown", onCellClick);
	this.on("mouseup", onCellMouseUp);
	this.on("touchstart", onCellClick);

	// initialize
	this.init();
}

Cell.prototype = Object.create(PIXI.Container.prototype);
Cell.prototype.constructor = Cell;
Cell.prototype.init = function() {
	var background = getBackground();
	var text = getValueText(this.value);

	setTextPositionDefault(background, text);

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

Cell.prototype.setValue = function(value) {
	this.value = value;
	// modify the text for view
	this.getValueText().text = value.toString();
}

Cell.prototype.update = function(setTextPositionfunc) {
	if (setTextPositionfunc)
		setTextPositionfunc(this.getBackground(), this.getValueText());
	else
		setTextPositionDefault(this.getBackground(), this.getValueText());
}