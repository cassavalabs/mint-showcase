import { Colors } from "@cassavaland/uikits";

declare module "styled-components" {
  // eslint-disable-next-line
  export interface DefaultTheme extends Colors {}
}
