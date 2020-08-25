import { ApolloServer, PubSub } from "apollo-server-express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema, useContainer } from "type-graphql";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { MessageResolver } from "./message/MessageResolver";
import { UserResolver } from "./user/UserResolver";
import { authChecker } from "./utils/authChecker";
import { verifyUserToken } from "./utils/verifyUserToken";

useContainer(Container);
const pubSub = new PubSub();
Container.set("PUB_SUB", pubSub);

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MessageResolver, UserResolver],
    pubSub,
    authChecker,
  });

  const app = express();
  const httpServer = http.createServer(app);

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true,

    context: async ({ req, res, connection }) => {
      if (connection) return connection.context;
      const authUser = await verifyUserToken(req.cookies.token);

      return { req, res, authUser };
    },

    // you can pass the endpoint path for subscriptions
    // otherwise it will be the same as main graphql endpoint
    // subscriptions: "/subscriptions",
    subscriptions: {
      onConnect: (connectionParams, webSocket, ctx) => {
        console.log("Connected to ws");
      },
    },
  });

  app.use(cookieParser());
  server.installSubscriptionHandlers(httpServer);
  server.applyMiddleware({ app, path: "/" });

  httpServer.listen(process.env.PORT || 4000);

  console.log(
    `Running a GraphQL API server at http://localhost:${
      process.env.PORT || 4000
    }`
  );
};
main().catch((err) => console.error(err));
