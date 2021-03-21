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

export type Attachment = {
  uuid: string;
  link: string;
  name: string;
  mimetype: string;
  createdAt: string;
};

export type Message = {
  uuid: string;
  text: string;
  createdAt: string;
  sender: Sender;
  recipient: Recipient;
  attachments?: Attachment[];
};

export type MessageInfo = {
  initialFetch: boolean;
  hasMore: boolean;
};

export class ChatStore {
  private chatSubscription: { unsubscribe: (_: void) => void } | null = null;

  @observable public readonly messages: Map<
    string,
    Message[]
  > = observable.map();

  @observable public readonly messagesInfo: Map<
    string,
    MessageInfo
  > = observable.map();

  @observable activeChat: string | null = null;

  @observable friendName: string | null = null;

  @observable newMessage: {
    recipientUuid: string;
    senderUuid: string;
  } | null = null;

  @observable isFetching: boolean = true;

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  @action resetStore(): void {
    this.messages.clear();
    this.messagesInfo.clear();
    this.activeChat = null;
    this.friendName = null;
  }

  @action private addMessage(key: string, data: Message): void {
    if (!this.messages.has(key)) {
      this.messages.set(key, []);
    }
    this.messages.get(key)!.push(data);
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

  @action setNewMessage(
    val: {
      recipientUuid: string;
      senderUuid: string;
    } | null
  ) {
    this.newMessage = val;
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
        this.setRoomHasMore(key, true, true);
      }
    });
  }

  @action setIsFetching(val: boolean) {
    this.isFetching = val;
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
          cursor: chatroom ? chatroom[chatroom.length - 1]?.createdAt : null,
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
        this.setRoomHasMore(
          this.activeChat,
          this.messagesInfo.get(this.activeChat)?.hasMore!,
          false
        );
      }

      if (!data.messages.hasMore) {
        this.setRoomHasMore(this.activeChat, false, false);
      }
      this.setIsFetching(false);
    });
  }

  @action async setChatroom(uuid?: string): Promise<void> {
    if (!this.activeChat) {
      const latestMessage: Message = this.firstMessages[0];

      if (latestMessage) {
        this.activeChat = this.roomId(latestMessage);
        this.setIsFetching(true);
        await this.fetchChatMessages();
        this.setIsFetching(false);
        await this.rootStore.attachmentsStore.fetchAttachments(false);
        await this.rootStore.attachmentsStore.fetchAttachments(true);
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
      await this.rootStore.attachmentsStore.fetchAttachments(false);
      await this.rootStore.attachmentsStore.fetchAttachments(true);
    }
  }

  @action setRoomHasMore(
    uuid: string,
    hasMore: boolean,
    initialFetch: boolean
  ): void {
    this.messagesInfo.set(uuid, { hasMore, initialFetch });
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
          console.log(data.chatroomSubscription);
          const key: string = this.roomId(data.chatroomSubscription);
          const files = [];
          const images = [];

          if (!this.messages.has(key)) {
            this.messages.set(key, []);
          }

          this.messages.get(key)!.unshift(data.chatroomSubscription);

          if (data.chatroomSubscription.attachments.length !== 0) {
            for (const attachment of data.chatroomSubscription.attachments!) {
              attachment.mimetype.includes("image")
                ? images.push(attachment)
                : files.push(attachment);
            }

            if (files.length !== 0) {
              if (!this.rootStore.attachmentsStore.files.has(key)) {
                this.rootStore.attachmentsStore.files.set(key, []);
              }
              this.rootStore.attachmentsStore.files.get(key)!.push(...files);
            }

            if (images.length !== 0) {
              if (!this.rootStore.attachmentsStore.images.has(key)) {
                this.rootStore.attachmentsStore.images.set(key, []);
              }

              this.rootStore.attachmentsStore.images.get(key)!.push(...images);
            }
          }

          this.setNewMessage({
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
