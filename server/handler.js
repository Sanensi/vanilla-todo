/**
 * @typedef {import("http").IncomingMessage} IncomingMessage
 * @typedef {import("http").ServerResponse} ServerResponse
 */

/**
 * @typedef Handler
 * @property {(req: IncomingMessage) => boolean} predicate
 * @property {(req: IncomingMessage , res: ServerResponse) => Promise<void>} handler
 */

/**
 * @param {Handler[]} handlers
 * @returns {(req: IncomingMessage , res: ServerResponse) => Promise<void>}
 */
export const createHandlers = (handlers) => async (req, res) => {
  for (const { predicate, handler } of handlers) {
    if (predicate(req)) {
      try {
        return await handler(req, res);
      } catch (e) {
        res.statusCode = 500;
        res.end(e.stack ?? e);
      }
    }
  }

  res.statusCode = 404;
  res.end(`${req.url} not found`);
};
