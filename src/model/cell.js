var cell_model = ( function () {
	var value;
	var neighbors = [];

	//Random a value
	value = 0;

	function get_value () {
		return value;
	}

	function set_value (new_value) {
		value = new_value;
	}

	function add_value (value_to_be_add) {
		value += value_to_be_add;
	}

	function add_neighbor (neighbor) {
		neighbors.push(neighbor);
	}

	function get_neighbors () {
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
		get_value: get_value,
		set_value: set_value,
		add_value: add_value,
		get_neighbors: get_neighbors,
		add_neighbor: add_neighbor,
		// for debug
		show: show,
	}
})