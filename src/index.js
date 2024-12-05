require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { generateToken, authenticate } = require("./auth");

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authenticate(req);
    return { user };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.post("/login", express.json(), (req, res) => {
    const { role } = req.body;
    if (!["admin", "employee"].includes(role)) {
      return res.status(400).send("Invalid role");
    }
    const token = generateToken(role);
    res.json({ token });
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}/graphql`)
  );
});


