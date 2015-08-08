var myMatrix = ( function () {
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
		console.log(matrix);
		for (var i = 0; i < row * col; i += col){
			console.log(matrix[i], matrix[i+1], matrix[i+2], matrix[i+3], matrix[i+4]);
		}
	}

	function _update_neighbors(index) {
		var neighbnor_index = [];
		// first row
		if(index < col){
			// left up corner
			if(index == 0){
				neighbnor_index.push(index+1, index+5, index+6);
			}
			// right up corner
			else if (index == (col -1)){
				neighbnor_index.push(index-1, index+4, index+5);
			}
			// first row not corner
			else{
				neighbnor_index.push(index-1, index+1, index+4, index+5, index+6);
			}
		}
		// last row
		else if(index >= (row * col - col)){
			// left down corner
			if(index == row * col -col){
				neighbnor_index.push(index-5, index-4, index+1);
			}
			// right down corner
			else if (index == row * col -1){
				neighbnor_index.push(index-6, index-5, index-1);
			}
			// last row not corner
			else{
				neighbnor_index.push(index-6, index-5, index-4, index-1, index+1);
			}
		}
		// not first nor last row
		else{
			// first col
			if(index % col == 0){
				neighbnor_index.push(index-5, index-4, index+1, index+5, index+6);
			}
			// last col
			else if((index + 1) % col == 0){
				neighbnor_index.push(index-6, index-5, index-1, index+4, index+5);
			}
			// center 9 neighbors
			else{
				neighbnor_index.push(index-6, index-5, index-4, index-1, index+1, index+4, index+5, index+6);
			}
		}

		neighbnor_index.forEach(function (i) {
			matrix[i] += matrix[index];
		});
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

	return{
		show: show,
		shuffle: shuffle,
		click: click,
		get_matrix: get_matrix
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
	myMatrix.shuffle();
	myMatrix.show();

	var matrix_model = myMatrix.get_matrix();


	this.matrix = VALUE_LIST.slice(0);
	// var new_value_list = VALUE_LIST.slice(0);
	// shuffle(this.matrix);

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