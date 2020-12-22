const express = require("express");

const server = express();

server.get("/test", (request, response) => {

  response.send("Hello World")

})

server.listen(3000, () => {
  console.log('listening on port 3000')
})