const express = require("express");

//userController
const uc = require("./controller/userController.js");

const db = {
  users: {
    id: 0,
    data: []
  },
  profiles: {
    id: 0,
    data: []
  },
  posts: {
    id: 0,
    data: []
  },
  comments: {
    id: 0,
    data: []
  }
};

const app = express();

app.set("db", db);

//middleware
app.use(express.json());

app.post("/sign-up", uc.add);
app.patch("/patch/:id", uc.patch);
app.post("/posts", uc.post);
app.post("/comments", uc.comment);
app.get("/profile", uc.fetch);
app.get("/user/:userId/posts", uc.allpost);
app.get("/posts/:postId", uc.viewpost);
app.get("/debug", (req, res) => {
  res.status(200).json(req.app.get("db"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening (ô_ô) to ${PORT}`);
});
