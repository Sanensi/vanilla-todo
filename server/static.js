import fs from "fs/promises";
import p from "path";

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 */
export const servePublicStaticFiles = async (req, res) => {
  const path = req.url === "/" ? "/index.html" : req.url;

  try {
    const file = await fs.readFile("./client" + path);
    res.setHeader("content-type", resolveContentType(path));
    res.end(file);
  } catch (e) {
    res.statusCode = 404;
    res.end(`${path} not found`);
  }
};

const resolveContentType = (path) => {
  const extension = p.extname(path);
  return {
    ".html": "text/html",
    ".js": "text/javascript",
  }[extension];
};
