class Param{

  constructor(stroka){
    this.stroka = stroka;
  }

zadomNap(){
  let strokaLength = this.stroka.length;
  let newStr = [];
  for (let i=strokaLength-1; i >= 0; i--) {
    let j = strokaLength-i-1;
    newStr[j] = this.stroka.charAt(i);
  }
      newStr = newStr.join("");
      return newStr;
}

zadomNap2(){
  var newStr = '', i;
    for (i = this.stroka.length - 1; i >= 0; i--) {
        newStr += this.stroka.charAt(i);
    }
    return newStr;
}

}

  let param = new Param(process.argv[4]);
  param.zadomNap();
  console.log(param.zadomNap());

  // console.log(param.zadomNap(this.newStr));
  // console.log(param.newStr1)
  // console.log(param.newStr);
  // console.log(param);
  //param.func1();
  //console.log(param.per);
  // console.log(process.argv[4]);

/*1) реализовать класс с 3мя методами который в конструкторе строит строчку
1й метод: строчка задом-наперед
2й: строчка дублируется 3 раза
3й: первый символ стал заглавным (апперкейс) (решить в 1 строчку не самому!)

2) нужно создать иерархию классов, которые будут описывать квадрат, прямоугольник, круг
class Shape {
  perimeter() {
    throw new Error("implement this method");
  }
  square() {
    throw new Error("implement this method");
  }
}
у этих классов есть метод площадь и периметр.
реализация наследования

Узнать 3 парадигмы программирования ООП:
полиморфизм --- ?
инкапсуляция --- ?
наследование
*/
