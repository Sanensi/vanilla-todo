/**
 * @typedef {import("./handler").Handler} Handler
 * @typedef {import("http").IncomingMessage} IncomingMessage
 */

const todos = ["hello", "world"];

/**
 * @type {Handler}
 */
export const GET_API_TODO = {
  predicate: (req) => req.url === "/api/todo" && req.method === "GET",
  handler: async (req, res) => {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(todos));
  },
};

/**
 * @type {Handler}
 */
export const POST_API_TODO = {
  predicate: (req) => req.url === "/api/todo" && req.method === "POST",
  handler: async (req, res) => {
    const todo = await parseBody(req);
    todos.push(todo);

    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(todos));
  },
};

/**
 * @param {IncomingMessage} req
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(chunks.join("")));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}
