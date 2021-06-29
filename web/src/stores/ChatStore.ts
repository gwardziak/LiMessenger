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

export type Image = {
  uuid: string;
  name: string;
  mimetype: string;
  createdAt: string;
  updatedAt: string;
  minHeight: number;
  minWidth: number;
  links: Links;
};

export type IFile = {
  uuid: string;
  name: string;
  mimetype: string;
  createdAt: string;
  updatedAt: string;
  link: string;
};

export type Links = {
  orginal: string;
  min: string | null;
};

export type Message = {
  uuid: string;
  text: string;
  createdAt: string;
  sender: Sender;
  recipient: Recipient;
  images?: Image[];
  files?: IFile[];
};

export type MessageInfo = {
  initialFetch: boolean;
  hasMore: boolean;
};

export class ChatStore {
  private chatSubscription: { unsubscribe: (_: void) => void } | null = null;

  @observable public readonly messages: Map<string, Message[]> =
    observable.map();

  @observable public readonly messagesInfo: Map<string, MessageInfo> =
    observable.map();

  @observable activeChat: string | null = null;

  @observable friendName: string | null = null;

  @observable incomingMessage: {
    recipientUuid: string;
    senderUuid: string;
  } | null = null;

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  @action resetStore(): void {
    this.messages.clear();
    this.messagesInfo.clear();
    this.activeChat = null;
    this.friendName = null;
  }

  @action setFriendName(name: string): void {
    this.friendName = name;
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

  @computed get recipientName(): string {
    if (!this.activeChat) {
      return "";
    }

    const messages = this.messages.get(this.activeChat);
    if (messages) {
      const message = messages[0];
      return message.recipient.username === this.rootStore.userStore.username
        ? message.sender.username
        : message.recipient.username;
    }

    return this.friendName!;
  }

  @computed get firstMessages(): Message[] {
    const firstMessages: Message[] = [];
    const keys: IterableIterator<string> = this.messages.keys();

    if (!this.messages) {
      return [];
    }

    for (const key of keys) {
      const messages = this.messages.get(key);
      firstMessages.push(messages![0]);
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

  @action setIncomingMessage(
    participants: {
      recipientUuid: string;
      senderUuid: string;
    } | null
  ) {
    this.incomingMessage = participants;
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
        if (!this.messages.has(key)) {
          this.messages.set(key, []);
        }

        this.messages.get(key)!.unshift(message);
        this.setMessageInfo(key, { hasMore: true, initialFetch: true });
      }
    });
  }

  @action async fetchChatMessages(): Promise<void> {
    if (!this.activeChat) {
      throw new Error("Select a chatroom");
    }

    const chatroom = this.messages.get(this.activeChat);
    const { data, error } = await this.rootStore.urqlClient
      .query<MessagesQuery, MessagesQueryVariables>(MessagesDocument, {
        options: {
          friendUuid: this.activeChat,
          limit: 30,
          cursor: chatroom ? chatroom[chatroom.length - 1]?.uuid : null,
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

      if (this.messagesInfo.get(this.activeChat)?.initialFetch) {
        this.setMessageInfo(this.activeChat, {
          hasMore: this.messagesInfo.get(this.activeChat)?.hasMore!,
          initialFetch: false,
        });
      }

      if (!data.messages.hasMore) {
        this.setMessageInfo(this.activeChat, {
          hasMore: false,
          initialFetch: false,
        });
      }
    });
  }

  @action async setChatroom(uuid?: string): Promise<void> {
    if (!this.activeChat) {
      const latestMessage: Message = this.firstMessages[0];

      if (latestMessage) {
        this.activeChat = this.roomId(latestMessage);

        await this.fetchChatMessages();

        await this.rootStore.attachmentsStore.fetchFiles();
        await this.rootStore.attachmentsStore.fetchImages();
        return;
      } else {
        this.activeChat = " ";
        return;
      }
    }

    if (!uuid) {
      throw new Error("Room not found");
    }

    this.activeChat = uuid;

    if (
      this.rootStore.attachmentsStore.filesInfo.get(this.activeChat) ===
      undefined
    ) {
      await this.rootStore.attachmentsStore.fetchFiles();
      await this.rootStore.attachmentsStore.fetchImages();
    }
  }

  @action setMessageInfo(
    uuid: string,
    { initialFetch, hasMore }: MessageInfo
  ): void {
    this.messagesInfo.set(uuid, { initialFetch, hasMore });
  }

  @action async unsubsribeChat(): Promise<void> {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
      this.chatSubscription = null;
    }
  }

  @action async subscribeMessages(): Promise<void> {
    //TODO handle subscription error
    this.chatSubscription = pipe(
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

          if (!this.messages.has(key)) {
            this.messages.set(key, []);
          }

          this.messages.get(key)!.unshift(data.chatroomSubscription);

          if (data.chatroomSubscription.images.length !== 0) {
            if (!this.rootStore.attachmentsStore.images.has(key)) {
              this.rootStore.attachmentsStore.images.set(key, []);
            }

            this.rootStore.attachmentsStore.images
              .get(key)!
              .push(...data.chatroomSubscription.images);
          }

          if (data.chatroomSubscription.files.length !== 0) {
            if (!this.rootStore.attachmentsStore.files.has(key)) {
              this.rootStore.attachmentsStore.files.set(key, []);
            }

            this.rootStore.attachmentsStore.files
              .get(key)!
              .push(...data.chatroomSubscription.files);
          }

          this.setIncomingMessage({
            recipientUuid: data.chatroomSubscription.recipient.uuid,
            senderUuid: data.chatroomSubscription.sender.uuid,
          });
        });
      })
    );
  }

  @action async sendMessage(text: string, files: File[]): Promise<void> {
    if (!this.activeChat) {
      throw new Error("Select chat room");
    }

    const { data, error } = await this.rootStore.urqlClient
      .mutation<SendMessageMutation, SendMessageMutationVariables>(
        SendMessageDocument,
        {
          options: { recipientUuid: this.activeChat, text },
          files: files ?? null,
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
    await this.rootStore.userStore.fetchMe();
    await this.subscribeMessages();
    await this.fetchFirstMessages();
    await this.setChatroom();
  }
}
