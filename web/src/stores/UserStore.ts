import { action, observable, runInAction } from "mobx";
import { MeDocument, MeQuery, MeQueryVariables } from "../generated/graphql";
import { RootStore } from "./RootStore";

export class UserStore {
  @observable uuid: string | null = null;
  @observable username: string | null = null;
  @observable email: string | null = null;
  @observable avatar: string | null =
    "https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73";

  constructor(public readonly rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action async fetchUser(): Promise<void> {
    const { data, error } = await this.rootStore.urqlClient
      .query<MeQuery, MeQueryVariables>(MeDocument)
      .toPromise();

    if (error) throw new Error(error.message);

    if (!data?.me) throw new Error("Data not found");

    return runInAction(() => {
      this.uuid = data.me!.uuid;
      this.username = data.me!.username;
      this.email = data.me!.email;
    });
  }
}
