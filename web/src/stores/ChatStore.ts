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
  SendMessageDocument,
  SendMessageMutation,
  SendMessageMutationVariables,
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

  @action private addMessage(key: string, data: Message): void {
    if (!this.messages.has(key)) {
      this.messages.set(key, []);
    }
    this.messages.get(key)!.push(data);
  }

  private sortMessages(messages: Message[]): Message[] {
    return [...messages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  private roomId(message: Message): string {
    const userUuid = this.rootStore.userStore.uuid;

    return userUuid === message.sender.uuid
      ? message.recipient.uuid
      : message.sender.uuid;
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

    return this.sortMessages(firstMessages);
  }

  @computed get roomMessages(): Message[][] {
    if (!this.activeChat) {
      return [];
    }
    const roomMessages = this.messages.get(this.activeChat);

    if (!roomMessages) {
      return [];
    }

    const messages: Message[][] = [];
    const sortMessages = this.sortMessages([...roomMessages]);
    let recipient = this.rootStore.userStore.uuid;

    for (const message of sortMessages) {
      if (recipient === message.recipient.uuid) {
        if (messages.length === 0) {
          messages.push([]);
        }
      } else {
        messages.push([]);
        recipient = message.recipient.uuid;
      }

      messages[messages.length - 1].unshift(message);
    }

    return messages.reverse();
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
      for (const message of data.firstMessages) {
        const key: string = this.roomId(message);

        this.addMessage(key, message);
      }
    });
  }

  @action async fetchChatMessages(): Promise<void> {
    if (!this.activeChat) {
      throw new Error("Select a chatroom");
    }

    const { data, error } = await this.rootStore.urqlClient
      .query<MessagesQuery, MessagesQueryVariables>(MessagesDocument, {
        options: {
          friendUuid: this.activeChat,
          limit: 25,
        },
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
      this.messages.get(this.activeChat)!.push(...data.messages.messages);
      console.log(data.messages.messages);
    });
  }

  @action setChatroom(uuid?: string): void {
    if (!this.activeChat) {
      const latestMessage: Message = this.firstMessages[0];

      this.activeChat = this.roomId(latestMessage);
      this.fetchChatMessages();
      return;
    }

    if (!uuid) {
      throw new Error("Room not found");
    }

    this.activeChat = uuid;
    this.fetchChatMessages();
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
          const key: string = this.roomId(data.chatroomSubscription);
          console.log(data.chatroomSubscription, "from sub");
          this.addMessage(key, data.chatroomSubscription);
        });
      })
    );
  }

  @action async sendMessage(text: string): Promise<void> {
    if (!this.activeChat) {
      throw new Error("Select chat room");
    }

    const { data, error } = await this.rootStore.urqlClient
      .mutation<SendMessageMutation, SendMessageMutationVariables>(
        SendMessageDocument,
        {
          options: { recipientUuid: this.activeChat, text },
        }
      )
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.sendMessage) {
      throw new Error("Data not found");
    }
  }

  @action async subscribeAndFetch(): Promise<void> {
    await this.subscribeMessages();
    await this.fetchFirstMessages();
    // this.setChatroom();
  }
}
