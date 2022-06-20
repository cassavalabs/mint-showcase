import {
  ForwardRefRenderFunction,
  forwardRef,
  InputHTMLAttributes,
  RefObject,
} from "react";
import { FormLabel, FormGroup, StyledTextArea } from "@cassavaland/uikits";

export interface TextAreaBoxProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  ref: RefObject<HTMLTextAreaElement> | undefined | null;
}

const input: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaBoxProps> = (
  { label, ...rest },
  ref
) => {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <StyledTextArea {...rest} ref={ref} />
    </FormGroup>
  );
};

export const TextAreaBox = forwardRef(input);
