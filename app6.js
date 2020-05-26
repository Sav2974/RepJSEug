const express = require("express");
const url = require("url");
const _ = require("lodash");

const toBoolean = (text) => {
  if (text === "true") {
    return true
  }
  return false
}

const isBoolean = (param) => {
  return param === "true" || param === "false"
}

const parseAsBoolean = (parameters,command) => {
  console.log(parameters)
  const a = parameters.value1;
  const b = parameters.value2;

  if (!isBoolean(a) || !isBoolean(b)) {
    return {success:false}
  }
  if (command === "or") {
    return { success:true, result: (toBoolean(a) || toBoolean(b)) }
  }
  if (command === "and") {
    return { success:true, result: (toBoolean(a) && toBoolean(b)) }
  }
  //if (command === "plus") {
  //  return { success:true, result: (toBoolean(a) + toBoolean(b))}
  //}
  /* if (command === "plus") {
    return { success: true, result: (to)}
  } */
}

/*
  action values: "plus"
 */

const parseAsString = (parameters,action) => {

  console.log(parameters)
  const a = parameters.value1;
  const b = parameters.value2;
  //console.log (a,b);
  const parsed1 = _.toString(a);
  const parsed2 = _.toString(b);
  // what if input parameters are not string?
  if (typeof parsed1 !== "string" || typeof parsed2 !== "string") {
    return { success:false }
  }
  if (action === "strSum") {
    return { success:true, result:(parsed1.concat(parsed2)) }
  }
}



  const FuncName1 = (keyVal, type) => {
  //const FuncName1 = (key, value, type) => {
    const a = keyVal.value1;
    const b = keyVal.value2;
    console.log(JSON.stringify(keyVal, null,2))
    console.log(Object.keys(keyVal))
    console.log(Object.values(keyVal));
        if (type === "integer") {
          if (a !== "null" && b !== "null") {
            const parsed1 = _.parseInt(a);
            const parsed2 = _.parseInt(b);
            if (_.isNaN(parsed1) !== true && _.isNaN(parsed2) !== true) {
              return { success:true, result:parsed1-parsed2 }
          }
          return { success:false }
        }}
        if (type === "string") {
          //
          // value1 , value2
          // 1. достать объект по индекс
          // 2. обработать объект входных данных через for(const key of object <-входной объект)
          // for (const key of obj)  {
          //  console.log(key);
          // console.log(obj[key])
          // }
          //
          //for (let i = 0; i < 2; i++) {

          //const parsed1 = Object.keys(keyVal);
          //const parsed2 = Object.values(keyVal);
          //console.log(parsed1, parsed2);

    /*      --------------------------------------
          |  value1        |           false   |
          |  value2        |           true   |
          |  type          |           string   |
          --------------------------------------
*/
          //console.log(parsed1);
          //console.log(parsed2);
          let parsed1, parsed2;
          //for (const i of _.keys(keyVal)) {// > for (const i of keyVal)
          for (const i in keyVal) {
            if ( i === "value1" ) {
              //console.log(i);
              //console.log(keyVal[i]);
              parsed1 = keyVal[i];

            }
            if ( i === "value2") {
              parsed2 = keyVal[i]
            }

          }
          //console.log(parsed1, parsed2);
          return { success:true, result:(parsed1+parsed2) }
        }



        if (type === "boolean") {
        //console.log(isBoolean(a), isBoolean(b));
          if (!isBoolean(a) || !isBoolean(b)) {
            return { success:false }
          }
          const a1 = null;
          const a2 = "olo";
          return a1 && a2;
            return { success:true, result:toBoolean(a) && toBoolean(b) }
        }
        if (type === "object") {
          // const v = "some_another"
          // const obj = { [v]: "ggg" }
          // obj.some_antoher <- "ggg"
          // 2. const obj = { "v"]: "ggg" }
          // obj.v <- "ggg"
          return { success:true, result: { [a]:b } }
        }
      return { success:false }
    }



/*
  1. должна быть функция FuncName1
  2. она принимает на вход параметры и экщен
  3. на выход она отдает следующий объект: { success: boolean, value: int / string / boolean }
*/

/*
  `1. Добавить функцию которая на вход принимает два объекта
      а. имя проверти (key)
      б. значение (value)
      в. желаемый выходной тип (type)

   2. Функция должна возвращать
      а. Объет, в случае если type - object, который равен  { key: value }, в нашем случае: key - success, value - true / false
      б. Стрингу, в случае если type - string, которая равна key + value
      в. Булеан, в случае если type - boolean, который равен toBoolean(key) && toBoolean(value)

      в остальных случая функция должна выкидывать исключения, что она такой выходной тип не поддерживает
      Так же функция должна проверять входные параметры, key и value, на то что они не null.
 */

const parseAsNumber = (parameters,action) => {
  console.log(parameters)
  const a = parameters.value1;
  const b = parameters.value2;
  console.log (a,b);
  const parsed1 = _.parseInt(a);
  const parsed2 = _.parseInt(b);

  if (typeof parsed1 !== "number" || typeof parsed2 !== "number") {
    return { success: false }; // result objectl
  }
  if (action === "plus") {
    return { success: true, value: parsed1+parsed2 }
  }
  if (action === "minus") {
    return { success: true, value: parsed1-parsed2 }
  }

  return { success:false }
}

const app = express();
app.use(express.urlencoded());
app.use(express.json());

  app.post("/or", (request,response) => {
    console.log("or");
    let urlRequest = url.parse(request.url, true);
    let result = parseAsBoolean(urlRequest.query, "or");
    if (result.success) {
      response.end(result.result.toString())
      return
    }

    // response.status(/*http status, 400*/).send("unsuppoerted args");
    // http statuses
    // 200 - ok
    // 400 - bad request
    // 403-  forbidden
    // 500 = internal server error
    // hang, we have to response in any places
})
  app.post("/type", (request,response) => {
    console.log("type");
    let urlRequest = url.parse(request.url, true);
    const c = urlRequest.query.type;
    if (c === "integer") {
      let result = FuncName1(urlRequest.query, "integer")
      if (result.success) {
        response.end (result.result.toString());
        console.log(result.result.toString());
        return
      }
    }
    if ( c === "string") {
      let result = FuncName1(urlRequest.query, "string")
      if (result.success) {
        response.end (result.result.toString());
        return
      }
    }
    if ( c === "boolean" ) {
      let result = FuncName1(urlRequest.query, "boolean")
      if (result.success) {
        response.end (result.result.toString());
        console.log(result.result.toString());
        return
      }
    }
    if ( c === "object") {
      let result = FuncName1(urlRequest.query, "object")
      if (result.success) {
        // {}.toString() -> [object Object]

        response.end (JSON.stringify(result.result));
        console.log(JSON.stringify(result.result));
        return
      }
    }
    response.status(404).send("unsupported args");
    return;

  })

  app.post("/sort", (request,response) => {
    //console.log(request);
    let urlRequest = url.parse(request.url, true)

    let parsed1 = request.body[0], parsed2
    //console.log(parsed1)

    for (let i in request.body) {
      //console.log(request.body[i])
      if (parsed1 <= (request.body[i])) {
        parsed1 = (request.body[i])

      }

    }
    console.log(parsed1)
    response.end(_.toString(parsed1))
    //console.log(request.body);
    //console.log(typeof request.body);
  })

  app.post("/sortKV", (request,response) => {
    //console.log(request);
    let urlRequest = url.parse(request.url, true)

    const numbers = request.body
    //console.log(parsed1)
    let howmany = 0;
    for (let i = 0; i < request.body.length; i++) {
      let shouldcontinue = false;

      for (let j = 0; j < request.body.length-i-1; j++) {
        //console.log(request.body[i])
        if (request.body[j] > request.body[j+1]) {
          let srt = request.body[j+1];
          request.body[j+1] = request.body[j];
          request.body[j] = srt;
          shouldcontinue = true;
          ++howmany;
        }

      }
      if ( shouldcontinue === false ) {
        break;
      }

    //console.log(request.body);
    //console.log(typeof request.body);
      }
      console.log(howmany);
      response.end(JSON.stringify(request.body))
  })


  const arrayToList = (arr) => {

    let head = { value:arr[0], next:null }
    let tail = head
  //  console.log(head);
    for (let i = 1; i < arr.length; i++) {
      let mObj = arr[i];

      let obj = { value:mObj, next: null }
      tail.next = obj;
      tail = obj;
    //  console.log(JSON.stringify(head,null,2))

    }
    return head;
  }
//сгенерировать дерево с 3мя уровнями вложенности
//каждый элемент включал в себя 2 следующих (list1,list2)
/*
list: [ element1 ] -> [ element 2] -> [ element 3] -> [ element 4]

tree          element1 <- { value:10 , next1: element2, next2: element3 }
                |
              __  __
            |       \
        element2   element3 <- { value: 4, next1: null, next2: null}
          /   <- { value: 4, next1: element4, next2: null }
     __
    /
  element4 <- { value: 7, next1: nullm next2: null}
*/

class a{
  //public per;

  constructor(){
    console.log("constructor");
    this.per = 0;

  }
func1(){
  this.per = 1;
  console.log("func");
}
}

class b extends a{
  constructor(){
    super()
    console.log("constructor b");
  }
  func1(){
    console.log("func b");
    super.func1();
  }
}

app.post("/class", (request,response) => {
const _b = new b();
console.log(_b.per);

_b.func1();
console.log(_b.per);
})

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
    const generateTree = ()  => {

      let head = { value:getRandomArbitrary(0, 10), next1: null, next2: null };
      let tail = head;
      let tail1 = head;

      let perem = { func: () =>
        { }}
      console.log(head);
      for (let i = 1; i < 3; i++) {
        let obj = { value: i, next1: null, next2: null };
        tail.next1 = obj;

        tail = obj;

    //    for (let j = 1; j <= 1; j++) {
    //      let obj1 = { value:getRandomArbitrary(0,10), next1: null, next2: null };
          tail1.next2 = obj;
    //      tail1 = obj1;
    //    }
        console.log(JSON.stringify(head, null, 2));
      }
    }
    //  response.end(JSON.stringify(head));



  app.post("/gentree", (request,response) => {

    console.log(request.body);
    let result = generateTree();
    //console.log(JSON.stringify(request.body));
    response.end("ok");
  })


  const printList = (list) => {

    while (list.next !== null) {
      console.log(list.value);
      list = list.next;
    }
    console.log(list.value)
  }

  const arrayToDeque = (array) => {
    let head = { prev:null, value:request.body[0], next:null }
    let tail = head
    console.log(head);
    for (let i = 1; i < request.body.length; i++) {
      let mObj = request.body[i];

      let obj = { prev: tail, value:mObj, next: null }
      tail.next = obj;

      tail = obj;
      console.log(JSON.stringify(head,null,2))

    }
    response.end(JSON.stringify(head))
  }

  app.post("/sortObj", (request,response) => {
    //console.log(request);
    let urlRequest = url.parse(request.url, true)

  //  for (let j = 0; j < request.body.length; j++) {
      //val = request.body[j];
      let result = arrayToList(request.body);
      let print = printList(result);
//      response.end(JSON.stringify(head))
  })


/*    for (let i = 0; i < request.body.length; i++) {
      let shouldcontinue = false;

      for (let j = 0; j < request.body.length-i-1; j++) {
        //console.log(request.body[i])
        if (request.body[j] > request.body[j+1]) {
          let srt = request.body[j+1];
          request.body[j+1] = request.body[j];
          request.body[j] = srt;
          shouldcontinue = true;
          ++howmany;
        }

      }
      if ( shouldcontinue === false ) {
        break;
      }

    //console.log(request.body);
    //console.log(typeof request.body);
      }
      console.log(howmany);
      response.end(JSON.stringify(request.body))
  })

*/

  app.post("/and", (request,response) => {
    console.log("and");
    let urlRequest = url.parse(request.url, true);
    let result = parseAsBoolean(urlRequest.query, "and");
    if (result.success) {
      response.end(result.result.toString())
      return
    }

    // the same, server will hang
})

app.post("/stringsum", (request,response) => {
  console.log("stringsum");

  // we have to add this code to /plus path
  let urlRequest = url.parse(request.url, true);
  let result = parseAsString(urlRequest.query, "strSum");
  if (result.success) {
    response.end(result.result.toString())
    console.log(response.status)
    return
  }
    response.status
  // the same, server will hang
})

  app.post("/minus", (request,response) => {
    console.log("minus");
    let urlRequest = url.parse(request.url, true);
    let result = parseAsNumber(urlRequest.query, "minus");
    if (result.success) {
      response.end(result.result.toString())
      return;
    } else {
      result = parseAsBoolean(urlRequest.query)
    }

    // at any places where the server could not perform operation we have to answer with error.
    // server hang
  })


  app.post("/plus", (request,response) => {
    console.log("plus");


    let urlRequest = url.parse(request.url, true);

    let result = parseAsNumber(urlRequest.query, "plus");
    if (result.success) {
      response.end(result.result.toString())
      return;
    } else {
      result = parseAsBoolean(urlRequest.query)
    }

    // the same
  });

app.listen(3000);
