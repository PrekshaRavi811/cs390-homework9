import express from "express";

import {BlogModel} from "../schema/blog.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});

const PASSWORD= process.env.PASSWORD;

router.post("/create-post", async (req, res) => {
  // body should be JSON
  const body = req.body;
  if (body.password !== PASSWORD) {
    return res.send({error: "incorrect password"}, 403);
  }
  // create blog model with the request body
  const blog = new BlogModel({content: body.content, title: body.title});
  // remember to await .save();
  // save to mongodb
  await blog.save();
  // get an object representation and send it back to the client
  return res.send(blog.toObject());
});

router.post("/delete", async (req, res) => {
  const body = req.body;
  await BlogModel.deleteOne({title: body.title});
  const blogs = await BlogModel.find({});
  return res.send(blogs.map((blog) => blog.toObject()));
});

export default router;
