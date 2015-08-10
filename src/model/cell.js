var cell_model = ( function () {
	var value;
	var neighbors = [];

	//Random a value
	value = 0;

	// init neighbors
	// two ways
	// 1. input index and calculate
	// 2. input the neighbors array
	neighbors.push(0);
	neighbors.push(1);
	neighbors.push(2);
	console.log(this);

	function set_value (new_value) {
		value = new_value;
	}

	function get_neighbors_array () {
		return neighbors;
	}

	function show () {
		console.log('cell show');
		console.log(value);
		neighbors.forEach( function (neighbor) {
			console.log(neighbor);
		});
	}

	return{
		set_value: set_value,
		get_neighbors_array: get_neighbors_array,
		// for debug
		show: show,
	}
})