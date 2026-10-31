// Alias
// Đặt tên mới cho các kiểu nguyên thủy
type CarYear = number;
type CarType = string;
type CarModel = string;

// Sử dụng các type trên để định nghĩa một type Object
type Car = {
  year: CarYear;
  type: CarType;
  model: CarModel;
};

const carYear: CarYear = 2001;
const carType: CarType = "Toyota";
const carModel: CarModel = "Corolla";

const car: Car = {
  year: carYear,
  type: carType,
  model: carModel
};
//Union & Insection
// Intersection (&): Gộp các type lại với nhau
type Animal = { name: string };
type Bear = Animal & { honey: boolean }; // Bear sẽ có cả name và honey

const bear: Bear = { name: "Winnie", honey: true };

// Union (|): Biến chỉ được nhận một trong các giá trị định sẵn
type Status = "success" | "error";
let response: Status = "success";

//Interface
/*interface Rectangle {
  height: number;
  width: number;
}

const rectangle: Rectangle = {
  height: 20,
  width: 10
};
//Extending Interface
interface Rectangle {
  height: number;
  width: number;
}

// ColoredRectangle kế thừa lại height, width từ Rectangle và thêm thuộc tính color
interface ColoredRectangle extends Rectangle {
  color: string;
}

const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red"
};*/

//Declaration Merging
interface Animal2 { 
  name: string; 
}

interface Animal2 { 
  age: number; 
}

// Lúc này Animal có cả 'name' và 'age'
const dog: Animal2 = { 
  name: "Fido", 
  age: 5 
};