const { app, server } = require("./src/app");
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("app listen on: http://localhost:" + port);
});
