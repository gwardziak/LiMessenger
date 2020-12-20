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
import { createConnection, getRepository } from "typeorm";
import { AttachmentResolver } from "./attachment/AttachmentResolver";
import { ChatroomResolver } from "./chatroom/ChatroomResolver";
import { Attachment } from "./db/entities/Attachment";
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
      ChatroomResolver,
      AttachmentResolver,
    ],
    pubSub,
    authChecker,
  });

  const app = express();
  const httpServer = http.createServer(app);

  app.get(
    "/image/:senderOrRecipientUuid/:imageUuid",
    async function (req, res) {
      console.log(req.params);
      const image = await getRepository(Attachment)
        .createQueryBuilder("file")
        .leftJoinAndSelect("file.participantA", "participantA")
        .leftJoinAndSelect("file.participantB", "participantB")
        .where(
          `(participantA.uuid = :participant AND file.uuid = :image) OR
      (participantB.uuid = :participant AND file.uuid = :image)`,
          {
            participant: req.params.senderOrRecipientUuid,
            image: req.params.imageUuid,
          }
        )
        .getOne();

      res.set("Content-Type", "text");
      res.send(image?.attachment);
    }
  );

  app.get("/4", async function (req, res) {
    const blob: any = await getRepository(Attachment).find();
    console.log(blob);
    res.set("Content-Type", "text");

    res.send(blob[blob.length - 1].attachment);
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  // Create GraphQL server

  const server = new ApolloServer({
    schema,
    playground: true,
    uploads: false,

    context: async ({ req, res, connection }) => {
      if (connection) return connection.context;
      const authUser = await verifyUserToken(req.cookies.token);
      return { req, res, authUser };
    },

    // you can pass the endpoint path for subscriptions
    // otherwise it will be the same as main graphql endpoint
    // subscriptions: "/subscriptions",
    subscriptions: {
      onConnect: async (connectionParams, webSocket, context) => {
        const authUser = await verifyUserToken(
          context.request.headers.cookie?.substring(6)
        );
        return { authUser };
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
