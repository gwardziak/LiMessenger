import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  AttachmentsDocument,
  AttachmentsQuery,
  AttachmentsQueryVariables,
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
  name: string;
  mimetype: string;
  createdAt: string;
  link: string;
  height: number;
  width: number;
};

export type AttachmentsInfo = {
  hasMore: boolean;
};

export class AttachmentsStore {
  @observable public readonly files: Map<
    string,
    Attachment[]
  > = observable.map();

  @observable public readonly filesInfo: Map<
    string,
    AttachmentsInfo
  > = observable.map();

  @observable public readonly images: Map<
    string,
    Attachment[]
  > = observable.map();

  @observable public readonly imagesInfo: Map<
    string,
    AttachmentsInfo
  > = observable.map();

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  private sortAttachments(attachments: Attachment[]): Attachment[] {
    return [...attachments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  @computed get fileAttachments() {
    if (!this.rootStore.chatStore.activeChat) {
      return [];
    }
    const attachments = this.files.get(this.rootStore.chatStore.activeChat);

    if (!attachments) {
      return [];
    }
    return this.sortAttachments([...attachments]);
  }

  @computed get imageAttachments() {
    if (!this.rootStore.chatStore.activeChat) {
      return [];
    }
    const images = this.images.get(this.rootStore.chatStore.activeChat);

    if (!images) {
      return [];
    }
    return this.sortAttachments([...images]);
  }

  @action async fetchAttachments(isImage: boolean): Promise<void> {
    const activeChat = this.rootStore.chatStore.activeChat;
    if (!activeChat) {
      throw new Error("Select a chatroom");
    }

    const repository = isImage ? this.images : this.files;
    const chatroom = repository.get(activeChat);

    const { data, error } = await this.rootStore.urqlClient
      .query<AttachmentsQuery, AttachmentsQueryVariables>(AttachmentsDocument, {
        options: {
          friendUuid: activeChat,
          limit: 24,
          isImage,
          cursor: chatroom ? chatroom[chatroom.length - 1]?.createdAt : null,
        },
      })
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.attachments) {
      throw new Error("Data not found");
    }

    return runInAction(() => {
      if (!activeChat) return;
      if (!repository.has(activeChat)) {
        repository.set(activeChat, []);
      }

      repository.get(activeChat)!.push(...data.attachments.attachments);

      if (!data.attachments.hasMore) {
        this.setHasMore(activeChat, false, isImage);
      } else {
        this.setHasMore(activeChat, true, isImage);
      }
    });
  }

  @action setHasMore(uuid: string, hasMore: boolean, isImage: boolean): void {
    const repository = isImage ? this.imagesInfo : this.filesInfo;

    repository.set(uuid, { hasMore });
  }

  @action resetStore(): void {
    this.files.clear();
    this.filesInfo.clear();
    this.images.clear();
    this.imagesInfo.clear();
  }
}
