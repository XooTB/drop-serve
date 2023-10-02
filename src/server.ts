import http from "http";
import app from "./app.ts";

const port = process.env.PORT || 4000;

const server = http.createServer(app);

try {
  server.listen(port);
  console.log("Express listening on: 4000");
} catch (err) {
  console.log(err);
}
