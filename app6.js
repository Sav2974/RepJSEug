const express=require("express");
const url = require("url");
const _ = require("lodash");

const app = express();

  app.post("/", function(request,response) {
    console.log("server on");

    let urlRequest = url.parse(request.url, true);
    const a = (urlRequest.query);
    console.log(a);

    //test

    const parsed = _.parseInt(a, base);

    if (_.isNumber(parsed) === true) {

      response.end("yes")
    }
    response.end("no");
    });

app.listen(3000);
