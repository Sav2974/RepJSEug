class Shape {
  perimeter() {
    throw new Error("implement this method");
  }
  square() {
    throw new Error("implement this method");
  }
}

class Kvadrat extends Shape {
  constructor (storona) {
    super();
    this.storona = storona;
  }
  perimeter() {
    let perimeter = this.storona * 4;
    return perimeter;
  }
  square() {
    let square = this.storona * this.storona;
    return square;
  }
}

const k = new Kvadrat(10);
console.log(k.perimeter());
console.log(k.square());
