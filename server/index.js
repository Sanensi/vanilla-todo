import http from "http";
import { GET_API_TODO, POST_API_TODO } from "./api.js";
import { createHandlers } from "./handler.js";
import { servePublicStaticFiles } from "./static.js";

const PORT = 8080;

const server = http.createServer(
  createHandlers([
    GET_API_TODO,
    POST_API_TODO,
    { predicate: () => true, handler: servePublicStaticFiles },
  ])
);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
