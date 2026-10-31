/*Car Properties:
car.name = Fiat
car.model = 500
car.weight = 850kg
car.color = white 

Car Methods:
car.start()
car.drive()
car.brake()
car.stop()*/
//create a object
//ex1
const car = {
    type: "Fiat",
    model: "500",
    color: "white"
};
//ex2
const car2 = {};
car2.type = "fiat2";
car2.color = "black";
car2.model = "676";

//delete property
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
};

delete person.age;

//Check if a Property Exists
const person2 = {
  firstName: "John",
  lastName : "Doe",
  age      :  50
};

let result = ("firstName" in person);
//Nested Objects
myObj = {
  name:"John",
  age:30,
  myCars: {
    car1:"Ford",
    car2:"BMW",
    car3:"Fiat"
  }
}
myObj.myCars.car2; //access nested objects
//display object
let text = person.name + "," + person.age + "," + person.city; //ex1
let text2 = ""; //ex2
for (let x in person) {
  text2 += person[x] + " ";
};

// Create an Array
const myArray = Object.values(person);

// Stringify the Array
let text3 = myArray.toString();
// Stringify Object
let text4 = JSON.stringify(person);

//Object constructor
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
  this.nationality = "English"; //default value
}
const myFather = new Person("John", "Doe", 50, "blue");
const myMother = new Person("Sally", "Rally", 48, "green");
const mySister = new Person("Anna", "Rally", 18, "green");

const mySelf = new Person("Johnny", "Rally", 22, "green");
//adding property to object
myFather.nationality = "English";
//Adding a Property to a Constructor(add it to the constructor function prototype)
Person.prototype.nationality = "English";
//Adding a Method to a Constructor
Person.changeName = function (name) {
  this.lastName = name;
}

myMother.changeName("Doe");

new Object()   // A new Object object
new Array()    // A new Array object
new Map()      // A new Map object
new Set()      // A new Set object
new Date()     // A new Date object
new RegExp()   // A new RegExp object
new Function() // A new Function object
/* Use object literals {} instead of new Object().

Use array literals [] instead of new Array().

Use pattern literals /()/ instead of new RegExp().

Use function expressions () {} instead of new Function().*/
//example
"";           // primitive string
0;            // primitive number
false;        // primitive boolean

{};           // object object
[];           // array object
/()/          // regexp object
function function2 () {} // function