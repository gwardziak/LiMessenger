import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  FilesDocument,
  FilesQuery,
  FilesQueryVariables,
  ImagesDocument,
  ImagesQuery,
  ImagesQueryVariables,
} from "../generated/graphql";
import { RootStore } from "./RootStore";

export declare namespace AttachmentStore {
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
    links: {
      orginal: string;
      min: string | null;
    };
  };

  export type File = {
    uuid: string;
    name: string;
    mimetype: string;
    createdAt: string;
    updatedAt: string;
    link: string;
  };

  export type AttachmentsInfo = {
    hasMore: boolean;
  };
}

export class AttachmentsStore {
  @observable public readonly files: Map<string, AttachmentStore.File[]> =
    observable.map();

  @observable public readonly filesInfo: Map<
    string,
    AttachmentStore.AttachmentsInfo
  > = observable.map();

  @observable public readonly images: Map<string, AttachmentStore.Image[]> =
    observable.map();

  @observable public readonly imagesInfo: Map<
    string,
    AttachmentStore.AttachmentsInfo
  > = observable.map();

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  private sortAttachments<T extends { createdAt: string }>(
    attachments: T[]
  ): T[] {
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

  @action async fetchFiles(): Promise<void> {
    const activeChat = this.rootStore.chatStore.activeChat;
    if (!activeChat) {
      throw new Error("Select a chatroom");
    }

    const chatroom = this.files.get(activeChat);

    const { data, error } = await this.rootStore.urqlClient
      .query<FilesQuery, FilesQueryVariables>(FilesDocument, {
        options: {
          friendUuid: activeChat,
          limit: 24,
          cursor: chatroom ? chatroom[chatroom.length - 1]?.uuid : null,
        },
      })
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.files) {
      throw new Error("Data not found");
    }

    return runInAction(() => {
      if (!activeChat) return;
      if (!this.files.has(activeChat)) {
        this.files.set(activeChat, []);
      }

      this.files.get(activeChat)!.push(...data.files.files);

      if (!data.files.hasMore) {
        this.setHasMore(activeChat, false, true);
      } else {
        this.setHasMore(activeChat, true, true);
      }
    });
  }

  @action async fetchImages(): Promise<void> {
    const activeChat = this.rootStore.chatStore.activeChat;
    if (!activeChat) {
      throw new Error("Select a chatroom");
    }

    const chatroom = this.images.get(activeChat);

    const { data, error } = await this.rootStore.urqlClient
      .query<ImagesQuery, ImagesQueryVariables>(ImagesDocument, {
        options: {
          friendUuid: activeChat,
          limit: 24,
          cursor: chatroom ? chatroom[chatroom.length - 1]?.uuid : null,
        },
      })
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.images) {
      throw new Error("Data not found");
    }

    return runInAction(() => {
      if (!activeChat) return;
      if (!this.images.has(activeChat)) {
        this.images.set(activeChat, []);
      }

      this.images.get(activeChat)!.push(...data.images.images);

      if (!data.images.hasMore) {
        this.setHasMore(activeChat, false, true);
      } else {
        this.setHasMore(activeChat, true, true);
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
