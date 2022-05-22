import styled from "styled-components";
import { Colors } from "../theme/styled";

export interface TextProps {
  mWidth?: string;
  margin?: string;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  color?: keyof Colors;
  fontStyle?: "normal" | "italic" | "oblique";
  textAlign?: "left" | "right" | "center";
  lineHeight?: number | string;
}

export const Text = styled.div<TextProps>`
  max-width: ${({ mWidth }) => mWidth};
  margin: ${({ margin }) => margin ?? "0rem"};
  padding: 0rem;
  color: ${({ color, theme }) => (color ? theme[color] : theme.text200)};
  font-size: ${({ size }) => (size ? size + "rem" : "1rem")};
  font-weight: ${({ weight }) => weight ?? 400};
  text-align: ${({ textAlign }) => textAlign ?? "center"};
  line-height: ${({ lineHeight }) => lineHeight ?? 1.5};
`;
