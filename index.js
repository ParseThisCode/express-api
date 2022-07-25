import { createServer } from "http";
import { middleware } from "./server/middleware.js";

const server = createServer(middleware);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
 console.log(`http://localhost:${PORT}/`))
