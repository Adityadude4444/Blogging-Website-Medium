import { z } from "zod";
export const signupinput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signininput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const blogcreation = z.object({
  title: z.string(),
  content: z.string(),
});

export const blogupdation = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});
export type Blogupdation = z.infer<typeof blogupdation>;
export type Signininput = z.infer<typeof signupinput>;
export type Signupinput = z.infer<typeof signupinput>;
export type Blogcreation = z.infer<typeof blogcreation>;
