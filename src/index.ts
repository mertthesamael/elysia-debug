import { Elysia } from "elysia";
import { push } from "./modules/signal";

const app = new Elysia()
.use(push)
.get("/", () => "Hello Elysia")
.get("/verify-domain", () => {
  return "U good"
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
