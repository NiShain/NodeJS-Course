class Person {
    private name : string;
    public constructor(name: string){
        this.name = name;
    } 

    public getName(): string{
        return this.name;
    }
}
const person = new Person("Ikora");
console.log(person.getName());
//console.log(person.name); // private nên không truy cập được

//Interfaces
interface Shape {
    getArea: () => number;
}

class Rectangle implements Shape{
    public constructor(protected readonly width: number, protected readonly height : number){}
    public getArea() : number{
        return this.width*this.height;
    }
    public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}
const hcn = new Rectangle(3 ,6)
var dt : number = hcn.getArea();
console.log(dt);

//ExtendsV[GKB HNVM]\
// , Overrde
class Square extends Rectangle{
    public constructor ( width : number){
        super(width, width);
    }
    public override toString(): string {
    return `Square[width=${this.width}]`;
  }
}
