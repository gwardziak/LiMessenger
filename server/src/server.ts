import { ApolloServer, PubSub } from "apollo-server";
import "dotenv/config";
import "reflect-metadata";
import { buildSchema, useContainer } from "type-graphql";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { MessageResolver } from "./message/MessageResolver";

useContainer(Container);
const pubSub = new PubSub();
Container.set("PUB_SUB", pubSub);

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MessageResolver],
    pubSub,
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true,
    // you can pass the endpoint path for subscriptions
    // otherwise it will be the same as main graphql endpoint
    // subscriptions: "/subscriptions",
  });

  server.listen(process.env.PORT || 4000);

  console.log(
    `Running a GraphQL API server at http://localhost:${
      process.env.PORT || 4000
    }`
  );
};
main().catch((err) => console.error(err));

/*
import Express from "express";
import { MessageResolver } from './message/MessageResolver';

const app = Express();
*/
