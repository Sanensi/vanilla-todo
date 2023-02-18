import http from "http";
import { servePublicStaticFiles } from "./static.js";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/todo" && req.method === "GET") {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(["hello", "world"]));
  } else if (req.url === "/api/todo" && req.method === "POST") {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(
      JSON.stringify(["hello", "world", "this is not quite what you expected"])
    );
  } else {
    await servePublicStaticFiles(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
