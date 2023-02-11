import http from "http";
import fs from "fs/promises";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  await servePublicStaticFiles(req, res);
});

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const servePublicStaticFiles = async (req, res) => {
  try {
    const file = await fs.readFile("./public" + req.url);

    res.end(file);
  } catch (e) {
    res.statusCode = 404;
    res.end(`${req.url} not found`);
  }
};

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
