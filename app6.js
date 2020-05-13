const express=require("express");
const url = require("url");
const _ = require("lodash");

const app = express();

  app.post("/", function(request,response) {
    console.log("server on");

    let urlRequest = url.parse(request.url, true);
    const a = (urlRequest.query);
    console.log(a);

    /*
      base - переменная неопределена
      вторым параметром посылается разряд, 10 -тичная, 2-ичная. 16-ричная и тд
     */
    const parsed = _.parseInt(a, base);

    if (_.isNumber(parsed) === true) {

      response.end("yes")
      // тут код пойдет выполняться дальше.
    }

    // сюда вот, и ответ будет послан дважды, ответ нельзя посылать дважды
    // завершить выполнение можно следующими образами
    // return <- выйдет из функции
    // break <- выйдет из switch / case (это попозже)
    // continue <- выйдет из for без прерывания цикла (это тоже попозже)
    //
    // тебе росле после кажлого end нужно завершая выполнение функции
    response.end("no");
    });

app.listen(3000);
