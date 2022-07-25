import { createServer } from "http";
import { middleware } from "./server/middleware.js";

const server = createServer(middleware);

server.listen(8000, () => 
 console.log("http://localhost:8000/"))