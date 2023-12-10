require("dotenv").config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./schemas/index");

const express = require("express");
const cors = require("cors");

const { pool } = require("./connection/connectDB");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello Long");
});

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`API running at: ${url}`);
});

app.listen(port, hostname, async () => {
  try {
    await (await pool.connect()).release();
    console.log(`Server running at http://${hostname}:${port}/`);
  } catch (error) {
    console.log(error);
  }
});
