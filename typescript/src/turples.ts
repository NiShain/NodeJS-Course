// create a turples
let turples : [number, boolean, string];
turples = [67, true, "gay"];
turples.push("Something less");
console.log(turples) + "/br";
//readonly turples
let ReadonlyTurples: readonly [number, boolean, string] = [69, false, "Gay Readonly"];
//ReadonlyTurples.push("Can i push into a readonly turples?");

//Named turple
let graph : [number, number]; //-> chỉ biết là trong graph có 2 biến number
let graph2: [x : number, y : number]; //->tương ứng là trong graph số đầu cho x, số thứ hai cho y
//Destructuring Tuples (Phân rã Tuple)
let graph3: [number, number] = [55.1, 55.2];
const [x,y] = graph3;