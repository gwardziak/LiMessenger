import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { ConnectionContext } from "subscriptions-transport-ws";
import { User } from "./db/entities/User";
import { UserService } from "./user/UserService";
import { createLoaders } from "./utils/createLoaders";

import WebSocket = require("ws");

export namespace GraphQLServer {
  export type Context = {
    user: User | null;
    assosiateWithUser: (user: User | null) => void;
    loaders: ReturnType<typeof createLoaders>;
  };

  export type BuildContextFrom =
    | ExpressContext
    | {
        connection: {
          context: OnConnectResult;
        };
        payload: any;
      };

  export type SubscriptionParams = Record<
    string,
    string | number | boolean | Record<string, string | undefined> | undefined
  >;

  export type OnConnectResult = {
    params: SubscriptionParams;
    websocket: WebSocket;
    connectionContext: ConnectionContext;
  };
}

export class GraphQLServer {
  private connectedWebSockets: Set<WebSocket> = new Set();
  private wsToUser = new WeakMap<WebSocket, User>();

  constructor(private readonly userService: UserService) {}

  public async onSubscriptionConnect(
    params: GraphQLServer.SubscriptionParams,
    websocket: WebSocket,
    connectionContext: ConnectionContext
  ): Promise<GraphQLServer.OnConnectResult> {
    console.log(`New client has connected!`);

    this.connectedWebSockets.add(websocket);

    return { params, websocket, connectionContext };
  }

  public async onSubscriptionDisconnect(
    websocket: WebSocket,
    context: ConnectionContext
  ) {
    console.log(`Client has disconnected!`);
    this.connectedWebSockets.delete(websocket);
  }

  public async buildContext(
    ctx: GraphQLServer.BuildContextFrom
  ): Promise<GraphQLServer.Context> {
    let authToken: string | null = null;
    let websocketInstance: WebSocket | null = null;

    if ("req" in ctx && "res" in ctx) {
      // http
      const params = ctx.req.headers;
      authToken = params["auth-token"] as string | null;
    } else if (
      "connection" in ctx &&
      ctx.connection &&
      "context" in ctx.connection
    ) {
      // ws
      const { params, websocket } = ctx.connection.context;

      authToken =
        typeof params["auth-token"] === "string"
          ? params["auth-token"]
          : typeof params["headers"] === "object"
          ? params["headers"]["auth-token"] ?? null
          : null;

      websocketInstance = websocket;
    } else {
      // ???
    }

    let user: User | null = null;

    if (websocketInstance) {
      if (this.wsToUser.has(websocketInstance)) {
        // This should be relatively safe since on auth token change we disassosiate ws with user instance...
        user = this.wsToUser.get(websocketInstance)!;

        if (!authToken) {
          authToken = this.wsToUser.get(websocketInstance)!.authToken;
        }
      }
    }

    if (typeof authToken === "string" && !user) {
      try {
        user = await this.userService.verifyUserToken(authToken);
      } catch (ex) {}
    }

    if (websocketInstance) {
      //If we're inside of websocket lets maybe try to recover user?
      if (!user) {
        user = this.wsToUser.get(websocketInstance) ?? null;
      }

      if (user) {
        this.wsToUser.set(websocketInstance, user);
      } else {
        this.wsToUser.delete(websocketInstance);
      }
    }

    const loaders = createLoaders();
    return {
      user,
      loaders,
      assosiateWithUser: (user) => {
        if (websocketInstance) {
          if (user) {
            this.wsToUser.set(websocketInstance, user);
          } else {
            this.wsToUser.delete(websocketInstance);
          }
        }
      },
    };
  }
}
