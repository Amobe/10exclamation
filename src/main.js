var stage = new PIXI.Stage(0x66FF99);

var renderer = PIXI.autoDetectRenderer(800, 600, {
	backgroundColor: 0x666666
});

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

var container = new PIXI.Container();
stage.addChild(container);

for (var j = 0; j < 5; ++j) {
	for (var i = 0; i < 5; ++i) {
		var texture = PIXI.Texture.fromImage("image/square.jpg");
		var square = new PIXI.Sprite(texture);

		square.anchor = new PIXI.Point(0.5, 0.5);
		square.scale = new PIXI.Point(0.1, 0.1);
		square.position = new PIXI.Point(40*i, 40*j);

		// click event
		square.interactive = true;
		square.on("mousedown", onClick);
		square.on("touchstart", onClick);
		square.isClick = false;

		//container.addChild(square);
	}
}

container.position.x = 400;
container.position.y = 300;

function init() {
	// Square Object test
	var texture1 = PIXI.Texture.fromImage("image/square.jpg");
	var square1 = new Square(texture1);
	square1.init();
	stage.addChild(square1);
	var texture2 = PIXI.Texture.fromImage("image/square2.jpg");
	var square2 = new Square(texture2);
	square2.init();
	square2.position.x += 40;
	stage.addChild(square2);
	console.log(stage.children);

	// Matrix Object test
	var matrix = new Matrix();
	matrix.init()
	matrix.position = new PIXI.Point(100, 100);
	stage.addChild(matrix);

	var cell = new Cell();
	cell.position = new PIXI.Point(100, 300);
	stage.addChild(cell);
}

function animate() {
	requestAnimationFrame(animate);
	// for (var i = 0; i < container.children.length; ++i) {
	// 	var square = container.children[i];
	// 	if (square.isClick)
	// 		square.rotation += 0.1;
	// }

	renderer.render(stage);
}

function onClick(eventData) {
	eventData.target.isClick = !eventData.target.isClick;
}