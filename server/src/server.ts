import { ApolloServer, PubSub } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema, useContainer } from "type-graphql";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { ChatroomResolver } from "./chatroom/ChatroomResolver";
import { FriendshipResolver } from "./friendship/FriendshipResolver";
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
    resolvers: [
      MessageResolver,
      UserResolver,
      FriendshipResolver,
      ChatroomResolver,
    ],
    pubSub,
    authChecker,
  });

  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true,

    context: async ({ req, res, connection }) => {
      if (connection) return connection.context;
      //console.log(req.cookies);
      const authUser = await verifyUserToken(req.cookies.token);

      //console.log("authUser", authUser);
      return { req, res, authUser };
    },

    // you can pass the endpoint path for subscriptions
    // otherwise it will be the same as main graphql endpoint
    // subscriptions: "/subscriptions",
    subscriptions: {
      onConnect: (connectionParams, webSocket, ctx) => {
        console.log(connectionParams, "connectionParams");
        // console.log(webSocket, "ws");
        //console.log(ctx, "CTX");
        console.log(ctx.request.headers.cookie, "COOKIE");
        console.log("Connected to ws");
      },

      onDisconnect: (websocket, context) => {
        console.log("User dced.");
      },
    },
  });

  app.use(cookieParser());
  server.installSubscriptionHandlers(httpServer);
  server.applyMiddleware({ app, path: "/", cors: false });

  httpServer.listen(process.env.PORT || 4000);

  console.log(
    `Running a GraphQL API server at http://localhost:${
      process.env.PORT || 4000
    }`
  );
};
main().catch((err) => console.error(err));
