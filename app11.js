const _ = require ('lodash');

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

class Krug extends Shape {
  constructor (radius) {
    super();
    this.radius = radius;
  }
  perimeter() {
    let perimeter = this.radius * 2 * 3.14;
    return perimeter;
  }
  square() {
    let square = this.radius * this.radius * 3.14;
    return square;
  }
}

class Pryamoug extends Shape {
  constructor (storona1, storona2) {
    super();
    this.storona1 = storona1;
    this.storona2 = storona2;
  }
  perimeter() {
    let perimeter = (_.parseInt(this.storona1)+_.parseInt(this.storona2)) * 2;
    return perimeter;
  }
  square() {
    let square = this.storona1 * this.storona2;
    return square;
  }
}

// console.log(process.argv[4], process.argv[5]);

if (process.argv[2] === "kv") {
  const kv = new Kvadrat(process.argv[4]);
  console.log(kv.perimeter());
  console.log(kv.square());
}
else if (process.argv[2] === "kr") {
  const kr = new Krug(process.argv[4]);
  console.log(kr.perimeter());
  console.log(kr.square());
}
else if (process.argv[2] === "pr") {
  const pr = new Pryamoug(process.argv[4], process.argv[5]);
  console.log(pr.perimeter());
  console.log(pr.square());
}
else {
  console.log("unsupported args");
}
