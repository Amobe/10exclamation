var cell_0 = new cell_model();
console.log(cell_0);
console.log(cell_0.get_self() === cell_0);
console.log(cell_0.get_self() == cell_0);
// cell_0.create();
cell_0.show();
cell_0.set_value(20);
cell_0.show();

var cell_1 = new cell_model();
cell_1.show();
cell_1.set_value(30);
cell_1.show();

console.log(cell_0 === cell_1);
console.log(cell_0 == cell_1);