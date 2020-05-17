const express=require("express");
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
    return {success:true,result:(toBoolean(a) || toBoolean(b))}
  }
  if (command === "and") {
    return{success:true,result:(toBoolean(a) && toBoolean(b))}
  }
}

/*
  action values: "plus"
 */

const parseAsString = (parameters,action) => {

  console.log(parameters)
  const a = parameters.value1;
  const b = parameters.value2;
  console.log (a,b);

  // what if input parameters are not string?

  if (action === "strSum") {
    return { success:true, result:(a.concat(b)) }
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
  app.post("/or", (request,response) => {
    console.log("or");
    let urlRequest = url.parse(request.url, true);
    let result = parseAsBoolean(urlRequest.query, "or");
    if (result.success) {
      response.end(result.result.toString())
      return
    }

    response.status(/*http status, 400*/).send("unsuppoerted args");
    // http statuses
    // 200 - ok
    // 400 - bad request
    // 403-  forbidden
    // 500 = internal server error
    // hang, we have to response in any places
})

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
    return
  }

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
