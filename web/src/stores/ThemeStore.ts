import { action, makeObservable, observable } from "mobx";
import { DefaultTheme } from "styled-components";
import { themes } from "../utils/css/themes";
import { RootStore } from "./RootStore";

export class ThemeStore {
  @observable theme: DefaultTheme = this.loadTheme();

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  @action loadTheme() {
    const theme = localStorage.getItem("theme");

    if (theme) {
      return (themes as any)[theme];
    }

    return themes.light;
  }

  @action setTheme(theme: string) {
    localStorage.setItem("theme", theme);

    this.theme = (themes as any)[theme];
  }
}
