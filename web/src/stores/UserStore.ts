import { action, observable, runInAction } from "mobx";
import {
  AuthorizeDocument,
  AuthorizeQuery,
  AuthorizeQueryVariables,
} from "../generated/graphql";
import { RootStore } from "./RootStore";

export class UserStore {
  @observable isAuthenticated: boolean = false;
  @observable uuid: string | null = null;
  @observable username: string | null = null;
  @observable email: string | null = null;
  @observable avatar: string | null = "#";

  constructor(public readonly rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action setIsAuth(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
  }
  @action async fetchMe(): Promise<void> {
    const { data, error } = await this.rootStore.urqlClient
      .query<AuthorizeQuery, AuthorizeQueryVariables>(AuthorizeDocument, {
        options: {
          token: localStorage.getItem("authToken"),
        },
      })
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.authorize) {
      return;
      // throw new Error("User not found");
    }

    return runInAction(() => {
      this.isAuthenticated = true;
      this.uuid = data.authorize!.uuid;
      this.username = data.authorize!.username;
      this.email = data.authorize!.email;
    });
  }
}
