const express=require("express");
const url = require("url");
const _ = require("lodash");

// про функции
/*
  Есть два вида функций (в js)
  стрелочные
    const some_function = async () => {
      ...
    }

  и через слово function
    function test_function() {
      ...
    }

  разница между ними в том что у стрелочной не будет this.

  для просты используй всегда стрелоную, this в функциях - это бред

  про this потом еще

  каждая функция может возврашать какие-то данные

  const f = () => { return "koko"; }
  console.log((f()) -> "koko"

  если return нет то вернется undefined.
 */


const app = express();

  app.post("/", function(request,response) { // <- функция
    console.log("server on");

    let urlRequest = url.parse(request.url, true);
    const a = (urlRequest.query);
    console.log(a);

    /*
      base - переменная неопределена
      вторым параметром посылается разряд, 10 -тичная, 2-ичная. 16-ричная и тд
      в данном случае его посылать не обязательно
      + можно использовать нативный js метод parseInt();
      но это тоже самое по факту
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
