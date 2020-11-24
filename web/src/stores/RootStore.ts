import React from "react";
import { Client } from "urql";
import { StoreContext } from "..";
import { MessageStore } from "./MessageStore";
import { UserStore } from "./UserStore";

export class RootStore {
  public readonly userStore: UserStore;
  public readonly messageStore: MessageStore;

  constructor(public readonly urqlClient: Client) {
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
  }
}

export const useRootStore = () => React.useContext(StoreContext);
