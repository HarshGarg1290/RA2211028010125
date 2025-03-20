const express = require("express");
const usersRoutes = require("./src/routes/user");
const postsRoutes = require("./src/routes/posts");

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

module.exports = app;
