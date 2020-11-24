import { action, observable, runInAction } from "mobx";
import {
  FirstMessagesDocument,
  FirstMessagesQuery,
  FirstMessagesQueryVariables,
} from "../generated/graphql";
import { RootStore } from "./RootStore";

export type Recipient = {
  uuid: string;
  username: string;
};

export type Sender = {
  uuid: string;
  username: string;
};

export type Message = {
  uuid: string;
  text: string;
  createdAt: string;
  sender: Sender;
  recipient: Recipient;
};

export class MessageStore {
  @observable public readonly messages: Map<string, Message[]> = new Map();

  constructor(private readonly rootStore: RootStore) {}

  @action async fetchFirstMessages(): Promise<void | undefined> {
    const { data, error } = await this.rootStore.urqlClient
      .query<FirstMessagesQuery, FirstMessagesQueryVariables>(
        FirstMessagesDocument
      )
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.firstMessages) {
      throw new Error("Data not found");
    }

    return runInAction(() => {
      // const userUuid = this.rootStore.userStore.uuid;
      const userUuid = "48c480b8-a656-4f1b-aecb-e5ceb9ade1a8";
      // console.log(userUuid);

      for (const message of data.firstMessages) {
        // const key: string =
        //   userUuid === message.sender.uuid
        //     ? message.recipient.uuid
        //     : message.sender.uuid;

        // if (!this.messages.has(key)) {
        //   this.messages.set(key, []);
        // }
        // this.messages.get(key)!.push(message);

        if (!this.messages.has(message.recipient.uuid)) {
          this.messages.set(message.recipient.uuid, []);
        }
        this.messages.get(message.recipient.uuid)!.push(message);

        //console.log(this.messages);
        // const thisUserMessages =
        //   this.messages.get(message.recipient.uuid) ?? [];
        // thisUserMessages.push(message);
        // //console.log(message);
        // this.messages.set(message.recipient.uuid, thisUserMessages);
      }
      console.log(this.messages.size);
      console.log(this.messages);
    });
  }
}
