const express=require("express");
const url = require("url");
const _ = require("lodash");

const app = express();

  app.post("/", function(request,response) {
    console.log("server on");

    let urlRequest = url.parse(request.url, true);
    const a = (urlRequest.query);
    console.log(a);

//    try {
    var b = toString(a)
    const parsed = _.parseInt(b, 10);

    if (_.isNumber(parsed) === true) {
      response.end("yes")
      return;
    }
    response.end("no");
    
//    } catch (e) {
//   response.end("error" + " " + e.name + " " + e.message);
//   return;  }
    });

app.listen(3000);
