import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type AppVariables = {
  userId: string;
};

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: AppVariables;
}>();

blogRoute.use("/*", async (c, next) => {
  const token = c.req.header("authorization") || "";

  try {
    const res = await verify(token, c.env.JWT_SECRET);

    if (res && typeof res.id === "string") {
      c.set("userId", res.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {
    c.status(403);
    console.log("Authorization header:", c.req.header("authorization"));

    return c.json({ error: "unauthorized", e });
  }
});

blogRoute.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const author = c.get("userId");
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: author,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRoute.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRoute.get("/get/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogid = await c.req.param("id");

    const blog = await prisma.post.findFirst({
      where: {
        id: blogid,
      },
      select: {
        title: true,
        content: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while getting blog",
    });
  }
});

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    blogs: posts,
  });
});
