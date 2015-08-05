// FPS init
var meter = new FPSMeter({theme: 'dark'});

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
	// Matrix Object test
	var matrix = new Matrix();
	matrix.init()
	matrix.position = new PIXI.Point(100, 100);
	stage.addChild(matrix);
}

function animate() {
	requestAnimationFrame(animate);
	// for (var i = 0; i < container.children.length; ++i) {
	// 	var square = container.children[i];
	// 	if (square.isClick)
	// 		square.rotation += 0.1;
	// }

	renderer.render(stage);
	meter.tickStart();
	meter.tick();
}

function onClick(eventData) {
	eventData.target.isClick = !eventData.target.isClick;
}