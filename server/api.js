/**
 * @typedef {import("./handler").Handler} Handler
 */

/**
 * @type {Handler}
 */
export const GET_API_TODO = {
  predicate: (req) => req.url === "/api/todo" && req.method === "GET",
  handler: (req, res) => {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(["hello", "world"]));
  },
};

/**
 * @type {Handler}
 */
export const POST_API_TODO = {
  predicate: (req) => req.url === "/api/todo" && req.method === "POST",
  handler: (req, res) => {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(
      JSON.stringify(["hello", "world", "this is not quite what you expected"])
    );
  },
};
