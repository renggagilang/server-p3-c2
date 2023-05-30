const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require("axios");
const redis = require("./config/redisConnection.js");

const typeDefs = `
  type User {
    _id: String
    id: Int
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: ID
    title: String
    slug: String
    content: String
    imgUrl: String
    CategoryId: Int
    AuthorId: Int
    UserMongoId: String
    createdAt: String
    updatedAt: String
    Tags: [Tag]
    Category: Category
    user: User
  }

  type Tag {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
    post(id: ID): Post
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      const postsCache = await redis.get("posts");
      if (postsCache) {
        return JSON.parse(postsCache);
      }

      const response = await axios.get("http://localhost:4002/posts");
      const posts = response.data;
      await redis.set("posts", JSON.stringify(posts));
      return posts;
    },

    post: async (_, { id }) => {
      try {
        const postsCache = await redis.get(`user:${id}`);
        if (postsCache) {
          const postData = (
            await axios.get(`http://localhost:4002/posts/${id}`)
          ).data;
          const userData = JSON.parse(postsCache);
          postData.user = userData;
          return postData;
        }

        const postData = (await axios.get(`http://localhost:4002/posts/${id}`))
          .data;
        const userMongoId = postData.UserMongoId;
        const { data: userData } = await axios.get(
          `http://localhost:4001/users/${userMongoId}`
        );
        await redis.set(`user:${id}`, JSON.stringify(userData));
        postData.user = userData;
        return postData;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
