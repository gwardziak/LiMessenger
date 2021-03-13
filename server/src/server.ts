import { ApolloServer, PubSub } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
import "reflect-metadata";
import { buildSchema, useContainer } from "type-graphql";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { AttachmentResolver } from "./attachment/AttachmentResolver";
import { ChatroomResolver } from "./chatroom/ChatroomResolver";
import { GraphQLServer } from "./GraphQLServer";
import { MessageResolver } from "./message/MessageResolver";
import { UserResolver } from "./user/UserResolver";
import { authChecker } from "./utils/authChecker";
import { FileServerService } from "./utils/FileServerService";

useContainer(Container);
const pubSub = new PubSub();
Container.set("PUB_SUB", pubSub);

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      MessageResolver,
      UserResolver,
      ChatroomResolver,
      AttachmentResolver,
    ],
    pubSub,
    authChecker,
  });

  const app = express();

  const httpServer = http.createServer(app);

  const fileServerService = Container.get(FileServerService);
  app.get("/attachment/:participantUuid/:imageUuid", async (req, res) => {
    const file = await fileServerService.getOne(
      req.params.participantUuid,
      req.params.imageUuid
    );

    if (!file) {
      return res.status(404).end();
    }

    res.setHeader("Content-Type", file.mimetype);

    if (file.mimetype.includes("image")) {
      res.setHeader("Content-disposition", "filename=" + file.name);
      return res.send(file.attachment);
    }

    res.setHeader("Content-disposition", "attachment; filename=" + file.name);
    return res.send(file.attachment);
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  const graphQlServer = new GraphQLServer();
  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true,
    uploads: false,
    context: (...args) => graphQlServer.buildContext(...args),
    // context: async ({ req, res, connection }) => {
    //   if (connection) return connection.context;

    //   const authUser = await verifyUserToken(req.cookies.token);
    //   return { req, res, authUser };
    // },

    // you can pass the endpoint path for subscriptions
    // otherwise it will be the same as main graphql endpoint
    // subscriptions: "/subscriptions",
    subscriptions: {
      onConnect: (params, ...args) =>
        graphQlServer.onSubscriptionConnect(
          params as GraphQLServer.SubscriptionParams,
          ...args
        ),
      // const authUser = await verifyUserToken(
      //   context.request.headers.cookie?.substring(6)
      // );
      // return { authUser };
      onDisconnect: (...args) =>
        graphQlServer.onSubscriptionDisconnect(...args),
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
