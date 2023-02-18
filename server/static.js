import fs from "fs/promises";

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
export const servePublicStaticFiles = async (req, res) => {
  const path = req.url === "/" ? "/index.html" : req.url;

  try {
    const file = await fs.readFile("./client" + path);
    res.end(file);
  } catch (e) {
    res.statusCode = 404;
    res.end(`${path} not found`);
  }
};
