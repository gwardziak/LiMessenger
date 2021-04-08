import { Theme } from "../utils/css/themes";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
