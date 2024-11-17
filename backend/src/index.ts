import { Hono } from "hono";
import { userRoute } from "./Routes/userroute";
import { blogRoute } from "./Routes/blogroute";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
