var myMatrix = ( function () {
	var MATRIX_SIZE = 5;
	var MATRIX_ROW_MIN = 0;
	var MATRIX_ROW_MAX = MATRIX_SIZE - 1;
	var MATRIX_COL_MIN = 0;
	var MATRIX_COL_MAX = MATRIX_SIZE - 1;

	var row = 5;
	var col = 5;
	var matrix = [
		1, 1, 1,
		2, 2, 2,
		3, 3, 3,
		4, 4, 4,
		5,
		6, 6, 6,
		7, 7, 7,
		8, 8, 8,
		9, 9, 9];
	var cell_list;

	function init () {
		shuffle();
		_cell_list_factory();
		_neighbor_register();
	}

	function _cell_list_factory () {
		cell_list = new Array();

		for (var i = 0; i < matrix.length; ++i) {
			var cell = new cell_model();
			cell.set_value(matrix[i]);
			cell_list[i] = cell;
		}
	}

	function shuffle () {
		var currentIndex = matrix.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = matrix[currentIndex];
			matrix[currentIndex] = matrix[randomIndex];
			matrix[randomIndex] = temporaryValue;
		}
	}

	function show () {
		console.log(cell_list);
		for (var i = 0; i < row * col; i += col){
			console.log(cell_list[i].get_value(),
						cell_list[i+1].get_value(),
						cell_list[i+2].get_value(),
						cell_list[i+3].get_value(),
						cell_list[i+4].get_value());
		}
	}

	function _index2pos(index) {
		var x = Math.floor((index) % MATRIX_SIZE);
		var y = Math.floor((index) / MATRIX_SIZE);
		var pos = {
			x: x,
			y: y
		};
		return pos;
	}

	function _pos2index(pos) {
		var index = pos.y * MATRIX_SIZE + pos.x;
		return index;
	}

	function _neighbor_register() {
		for (var index = 0; index < Math.pow(MATRIX_SIZE, 2); ++index) {
			var pos = _index2pos(index);

			var startX = (pos.x - 1 < MATRIX_ROW_MIN) ? pos.x: pos.x - 1;
			var endX   = (pos.x + 1 > MATRIX_ROW_MAX) ? pos.x: pos.x + 1;
			var startY = (pos.y - 1 < MATRIX_COL_MIN) ? pos.y: pos.y - 1;
			var endY   = (pos.y + 1 > MATRIX_COL_MAX) ? pos.y: pos.y + 1;

			// search the neighbors for cell in
			for (var rowNumber = startX; rowNumber <= endX; ++rowNumber) {
				for (var colNumber = startY; colNumber <= endY; ++colNumber) {
					if (rowNumber == pos.x && colNumber == pos.y)
						continue;

					var neighborPos = {
						x: rowNumber,
						y: colNumber
					};

					var neighborIndex = _pos2index(neighborPos);
					cell_list[index].add_neighbor(cell_list[neighborIndex]);
				}
			}
		}
	}

	function _update_neighbors(index) {
		var currentCell = cell_list[index];
		var neighbors = currentCell.get_neighbors();
		for (var i = 0; i < neighbors.length; ++i) {
			var neighbor = neighbors[i];
			neighbor.add_value(currentCell.get_value());
		}
	}

	function click(i, j) {
		var index = i * col + j;

		// update neighbnor
		_update_neighbors(index);

		// TODO
		// check the 10 exclamation

		matrix[index] = -1;
	}

	function get_matrix () {
		return matrix;
	}

	function get_cell_list () {
		return cell_list;
	}

	return{
		init: init,
		show: show,
		click: click,
		get_matrix: get_matrix,
		get_cell_list: get_cell_list
	}
})()

var matrix;
var cells = [];

var CELL_X_GAP_SIZE = 5;
var CELL_Y_GAP_SIZE = 8;
var DEFAULT_MATRIX_LEVEL = 5;
var VALUE_LIST = [
	1, 1, 1,
	2, 2, 2,
	3, 3, 3,
	4, 4, 4,
	5,
	6, 6, 6,
	7, 7, 7,
	8, 8, 8,
	9, 9, 9];

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function getFullWidthGap() {
	return CELL_X_GAP_SIZE + CELL_WIDTH + CELL_SHADOW_HEIGHT;
}

function getFullHeightGap() {
	return CELL_Y_GAP_SIZE + CELL_HEIGHT + CELL_SHADOW_HEIGHT;
}

function click_callback(row, col) {
	console.log(row, col);
	myMatrix.click(row, col);
	myMatrix.show();

	var new_matrix = myMatrix.get_matrix();
	for (var i = 0; i < new_matrix.length; i++) {
		cells[i].setValue(new_matrix[i]);
	};

}

function initMatrix() {
	myMatrix.init();
	myMatrix.show();

	var matrix_model = myMatrix.get_matrix();

	this.matrix = VALUE_LIST.slice(0);

	for (var i = 0; i < this.level; ++i) {
		for (var j = 0; j < this.level; ++j) {
			var index = (i * this.level) + j;
			var cell = new Cell(matrix_model[index], i, j, click_callback);
			cell.position = new PIXI.Point(getFullWidthGap() * j, getFullHeightGap() * i);
			cells.push(cell);
			this.addChild(cell);
		}
	}
}

function resetMatrix() {

}

function Matrix() {
	PIXI.Container.call(this);
	this.level = DEFAULT_MATRIX_LEVEL;
}
Matrix.constructor = Matrix;
Matrix.prototype = Object.create(PIXI.Container.prototype);
Matrix.prototype.init = initMatrix;
Matrix.prototype.reset = resetMatrix;