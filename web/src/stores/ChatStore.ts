import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { OperationResult } from "urql";
import { pipe, subscribe } from "wonka";
import {
  ChatroomDocument,
  ChatroomSubscription,
  ChatroomSubscriptionVariables,
  FirstMessagesDocument,
  FirstMessagesQuery,
  FirstMessagesQueryVariables,
  MessagesDocument,
  MessagesQuery,
  MessagesQueryVariables,
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

export class ChatStore {
  @observable public readonly messages: Map<
    string,
    Message[]
  > = observable.map();

  @observable activeChat: string | null = null;

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  @computed get firstMessages(): Message[] {
    const firstMessages: Message[] = [];
    const keys: IterableIterator<string> = this.messages.keys();

    if (!this.messages) {
      return [];
    }

    for (const key of keys) {
      const messages = this.messages.get(key);
      firstMessages.push(messages![messages!.length - 1]);
    }

    const sortMessages = firstMessages.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sortMessages;
  }

  @computed get messagesInRoom(): Message[][] {
    if (!this.activeChat) {
      return [];
    }
    const roomMessages = this.messages.get(this.activeChat);
    console.log(roomMessages, "roomy");

    if (!roomMessages) {
      return [];
    }

    const sortMessages = [...roomMessages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const messages: any = [];
    let messType = this.rootStore.userStore.uuid;
    for (const message of sortMessages) {
      console.log(message.recipient.uuid);
      if (messType === message.recipient.uuid) {
        if (messages.length === 0) messages.push([]);
        console.log("ta sama tablica");
      } else {
        messages.push([]);
        messType = message.recipient.uuid;
      }
      messages[messages.length - 1].push(message);
    }

    console.log(messages);
    return messages;
    // return sortMessages;
  }

  @action async fetchFirstMessages(): Promise<void> {
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
      const userUuid = this.rootStore.userStore.uuid;

      for (const message of data.firstMessages) {
        const key: string =
          userUuid === message.sender.uuid
            ? message.recipient.uuid
            : message.sender.uuid;

        if (!this.messages.has(key)) {
          this.messages.set(key, []);
        }
        this.messages.get(key)!.push(message);
      }
    });
  }

  @action async fetchChatMessages(room: string | null): Promise<void> {
    this.setChatroom(room);

    if (!this.activeChat) return;
    const { data, error } = await this.rootStore.urqlClient
      .query<MessagesQuery, MessagesQueryVariables>(MessagesDocument, {
        uuid: this.activeChat,
      })
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.messages) {
      throw new Error("Data not found");
    }

    return runInAction(() => {
      if (!this.activeChat) return;
      if (!this.messages.has(this.activeChat)) {
        this.messages.set(this.activeChat, []);
      }
      this.messages.get(this.activeChat)!.push(...data.messages);
      console.log(this.messages.get(this.activeChat));
    });
  }

  @action setChatroom(uuid?: string | null) {
    if (!this.activeChat) {
      const firstMessages: Message[] = [];
      const keys: IterableIterator<string> = this.messages.keys();

      if (!this.messages) {
        throw new Error("Chatroom not found");
      }

      for (const key of keys) {
        const messages = this.messages.get(key);

        firstMessages.push(messages![messages!.length - 1]);
      }

      const sortMessages = firstMessages.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const userUuid = this.rootStore.userStore.uuid;
      const uuid: string =
        userUuid === sortMessages[0].sender.uuid
          ? sortMessages[0].recipient.uuid
          : sortMessages[0].sender.uuid;

      this.activeChat = uuid;
      return;
    }

    if (!uuid) {
      throw new Error("Room not found");
    }

    this.activeChat = uuid;
  }

  @action async subscribeMessages(): Promise<void> {
    //TODO handle subscription error
    pipe(
      this.rootStore.urqlClient.subscription<
        ChatroomSubscription,
        ChatroomSubscriptionVariables
      >(ChatroomDocument),
      subscribe(({ data, error }: OperationResult<ChatroomSubscription>) => {
        if (error) {
          throw new Error(error.message);
        }

        if (!data?.chatroomSubscription) {
          throw new Error("Unexpected error during receiving a message");
        }

        return runInAction(() => {
          const userUuid = this.rootStore.userStore.uuid;
          const key: string =
            userUuid === data.chatroomSubscription.sender.uuid
              ? data.chatroomSubscription.recipient.uuid
              : data.chatroomSubscription.sender.uuid;

          if (!this.messages.has(key)) {
            this.messages.set(key, []);
          }

          this.messages.get(key)!.push(data.chatroomSubscription);
        });
      })
    );
  }

  @action async subscribeAndFetch(): Promise<void> {
    await this.subscribeMessages();
    await this.fetchFirstMessages();
    this.setChatroom();
    // await this.fetchChatMessages(this.activeChat);
  }
}
