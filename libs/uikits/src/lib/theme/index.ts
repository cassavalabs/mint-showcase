import { DefaultTheme } from "styled-components";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export function theme(darkMode: boolean): DefaultTheme {
  return darkMode ? darkTheme : lightTheme;
}
