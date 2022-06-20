import {
  ForwardRefRenderFunction,
  forwardRef,
  InputHTMLAttributes,
  RefObject,
} from "react";
import { FormLabel, FormGroup } from "@cassavaland/uikits";
import { StyledTextbox } from "./styles";

export interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref: RefObject<HTMLInputElement> | undefined | null;
}

const input: ForwardRefRenderFunction<HTMLInputElement, TextBoxProps> = (
  { label, ...rest },
  ref
) => {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <StyledTextbox {...rest} ref={ref} />
    </FormGroup>
  );
};

export const Textbox = forwardRef(input);
export { StyledTextbox };
