import http from "http";
import app from "./app.js";

const port = process.env.PORT || 4000;

const server = http.createServer(app);

try {
  server.listen(port);
  console.log(`Started Lisenting on: http://localhost:${port}`);
} catch (err) {
  console.log(err);
}
