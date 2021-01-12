import React from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client } from "urql";
import { StoreContext } from "..";
import { AttachmentsStore } from "./AttachmentsStore";
import { ChatStore } from "./ChatStore";
import { UserStore } from "./UserStore";

export class RootStore {
  public readonly userStore: UserStore;
  public readonly chatStore: ChatStore;
  public readonly attachmentsStore: AttachmentsStore;

  constructor(
    public readonly urqlClient: Client,
    public readonly subscriptionClient: SubscriptionClient
  ) {
    this.userStore = new UserStore(this);
    this.chatStore = new ChatStore(this);
    this.attachmentsStore = new AttachmentsStore(this);
  }
}

export const useRootStore = () => React.useContext(StoreContext);
