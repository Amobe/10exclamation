
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

function initMatrix() {
	var new_value_list = VALUE_LIST.slice(0);
	shuffle(new_value_list);

	for (var i = 0; i < this.level; ++i) {
		for (var j = 0; j < this.level; ++j) {
			var index = (i * this.level) + j;
			var cell = new Cell(new_value_list[index]);
			cell.position = new PIXI.Point(55 * j, 55 * i);
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