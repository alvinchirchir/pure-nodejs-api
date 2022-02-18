const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

const server = http.createServer(function (req, res) {
  //Get url and parse it
  const parseUrl = url.parse(req.url, true);
  //Get path name
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //Get HTTP method
  const method = req.method.toLowerCase();

  //Get query params
  const queryStringObject = parseUrl.query;

  //Get headers as an object
  const headers = req.headers;

  //Get payload
  const decoder = new StringDecoder("utf-8");
  const buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    const choosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;
        const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };
    //Route request to handler

    choosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = typeof payload == "object" ? payload : {};
      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);

      res.end(payloadString);
      console.log(
        "Request received with this payload:",
        statusCode,
        payloadString
      );
    });
  });
});

//Start the server
server.listen(config.port, function () {
  console.log("Server is listening on Port "+config.port+"");
});

//Define handlers
const handlers = {};

//Sample handler
handlers.sample = function (data, callback) {
  //Callback Http status code and payload object
  callback(200, { name: "sample handler" });
};

//Not found
handlers.notFound = function (data, callback) {
  callback(400);
};


//Routers
const router = {
  sample: handlers.sample,
};
