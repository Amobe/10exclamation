var cell = new cell_model();

// should all be true

// test initial value
console.log(cell.get_value() === 0);

// test set
var new_value = 1;
cell.set_value(new_value);
console.log(cell.get_value() === new_value);


// test neighbors
var neighbors = cell.get_neighbors();
console.log(neighbors.length === 0);

// test add neighbor
cell.add_neighbor(1);
neighbors = cell.get_neighbors();
console.log(neighbors.length === 1);
console.log(neighbors[0] === 1);

cell.add_neighbor(5);
neighbors = cell.get_neighbors();
console.log(neighbors.length === 2);
console.log(neighbors[0] === 1);
console.log(neighbors[1] === 5);