import http from "http";
import fs from "fs/promises";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/todo" && req.method === "GET") {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify([]));
  } else {
    await servePublicStaticFiles(req, res);
  }
});

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const servePublicStaticFiles = async (req, res) => {
  const path = req.url === "/" ? "/index.html" : req.url;

  try {
    const file = await fs.readFile("./public" + path);
    res.end(file);
  } catch (e) {
    res.statusCode = 404;
    res.end(`${path} not found`);
  }
};

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
