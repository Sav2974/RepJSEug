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

const parseAsString = (parameters,action) => {

console.log(parameters)
const a = parameters.value1;
const b = parameters.value2;
console.log (a,b);

if (action === "strSum") {
  return {success:true, result:(a.concat(b))}
}
return {success:false}
}

  const parseAsNumber = (parameters,action) => {

  console.log(parameters)
  const a = parameters.value1;
  const b = parameters.value2;
  console.log (a,b);
  const parsed1 = _.parseInt(a);
  const parsed2 = _.parseInt(b);

  if (typeof parsed1 !== "number" || typeof parsed2 !== "number") {
    return {success:false};
  }
  if (action === "plus") {
    return {success:true, result:parsed1+parsed2}
  }
  if (action === "minus") {
    return {success:true, result:parsed1-parsed2}
  }

  return {success:false}
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

})

  app.post("/and", (request,response) => {
    console.log("and");
    let urlRequest = url.parse(request.url, true);
    let result = parseAsBoolean(urlRequest.query, "and");
    if (result.success) {
      response.end(result.result.toString())
      return
}

})

app.post("/stringsum", (request,response) => {
  console.log("stringsum");
  let urlRequest = url.parse(request.url, true);
  let result = parseAsString(urlRequest.query, "strSum");
  if (result.success) {
    response.end(result.result.toString())
    return
}

})

  app.post("/minus", (request,response) => {
    console.log("minus");
    let urlRequest = url.parse(request.url, true);
  //  console.log(urlRequest);
    let result = parseAsNumber(urlRequest.query, "minus");
//    console.log(result);
    if (result.success) {
      response.end(result.result.toString())
      return;
    } else {
      result = parseAsBoolean(urlRequest.query)
    }
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

    });

app.listen(3000);
