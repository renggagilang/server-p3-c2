const express = require("express");
const redis = require("./config/redisConnection");
const Axios = require("axios");
const app = express();
const port = process.env.PORT || 4000;
const POST_SERVICE_URL = "http://localhost:4002";
const USER_SERVICE_URL = "http://localhost:4001";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "aman",
  });
});

app.get("/posts", async (req, res) => {
  try {
    const postCache = await redis.get("posts");
    if (postCache) {
      console.log("masuk cache");
      const posts = JSON.parse(postCache);
      res.status(200).json(posts);
    } else {
      console.log("masuk else");
      const { data } = await Axios.get(POST_SERVICE_URL + "/posts");
      await redis.set("posts", JSON.stringify(data));
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { data } = await Axios.get(
      POST_SERVICE_URL + "/posts/" + req.params.id
    );
    const userId = data.UserMongoId;
    const { data: user } = await Axios.get(
      USER_SERVICE_URL + "/users/" + userId
    );
    data.User = user;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("posts/:id", async (req, res) => {
  try {
    const { data } = await Axios.delete(
      POST_SERVICE_URL + "/posts/" + req.params.id
    );
    await redis.del("posts");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, slug, content, imgUrl, CategoryId, AuthorId } = req.body;
    const { response } = await Axios.post(POST_SERVICE_URL + "/posts", {
      title,
      slug,
      content,
      imgUrl,
      CategoryId,
      AuthorId,
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
