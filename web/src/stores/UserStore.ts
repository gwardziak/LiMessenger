import { action, observable, runInAction } from "mobx";
import { MeDocument, MeQuery, MeQueryVariables } from "../generated/graphql";
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
      .query<MeQuery, MeQueryVariables>(MeDocument, {})
      .toPromise();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.me) {
      console.log("Failed during authorization");
      return;
      // throw new Error("User not found");
    }

    return runInAction(() => {
      this.isAuthenticated = true;
      this.uuid = data.me!.uuid;
      this.username = data.me!.username;
      this.email = data.me!.email;
    });
  }
}
