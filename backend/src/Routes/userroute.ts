import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupinput } from "@aditya_4444/medium-zod1";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsed = signupinput.safeParse(body);

  if (!parsed.success) {
    c.status(411);
    return c.json({
      message: "Invalid input",
      error: parsed.error.issues,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.username }, // `username` is the email
    });

    if (existingUser) {
      c.status(409); // Conflict
      return c.json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name || null,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.error("Error during signup:", e);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
