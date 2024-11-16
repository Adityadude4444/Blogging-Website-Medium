import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", (c) => {
  return c.text("we are in signup");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("we are in signin");
});
app.put("/api/v1/blog", (c) => {
  return c.text("replace");
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog");
});

export default app;
