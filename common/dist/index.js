"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogupdation = exports.blogcreation = exports.signininput = exports.signupinput = void 0;
const zod_1 = require("zod");
exports.signupinput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
exports.signininput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.blogcreation = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.blogupdation = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string(),
});
