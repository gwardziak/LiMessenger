import React from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client } from "urql";
import { StoreContext } from "..";
import { AttachmentsStore } from "./AttachmentsStore";
import { ChatStore } from "./ChatStore";
import { ThemeStore } from "./ThemeStore";
import { UserStore } from "./UserStore";

export class RootStore {
  public readonly userStore: UserStore;
  public readonly chatStore: ChatStore;
  public readonly attachmentsStore: AttachmentsStore;
  public readonly themeStore: ThemeStore;

  constructor(
    public readonly urqlClient: Client,
    public readonly subscriptionClient: SubscriptionClient
  ) {
    this.userStore = new UserStore(this);
    this.chatStore = new ChatStore(this);
    this.attachmentsStore = new AttachmentsStore(this);
    this.themeStore = new ThemeStore(this);
  }
}

export const useRootStore = () => React.useContext(StoreContext);
