
var DEFAULT_MATRIX_LEVEL = 5;

function initMatrix() {
	console.log(this)

	for (var i = 0; i < this.level; ++i) {
		for (var j = 0; j < this.level; ++j) {
			var texture = PIXI.Texture.fromImage("image/square.jpg");
			var square = new Square(texture);
			square.init();
			square.position = new PIXI.Point(40 * j, 40 * i);
			this.addChild(square);
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