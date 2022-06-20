import {
  ForwardRefRenderFunction,
  forwardRef,
  InputHTMLAttributes,
  RefObject,
} from "react";
import Image from "next/image";
import {
  FormLabel,
  FormGroup,
  CloseIcon,
  UploadIcon,
  Text,
} from "@cassavaland/uikits";
import { FileContainer, FileInput, CloseButton, FilePreview } from "./styles";

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref: RefObject<HTMLInputElement> | undefined | null;
  preview: string | null;
  resetFile: () => void;
  width?: string;
  height?: string;
}

const fileUpload: ForwardRefRenderFunction<
  HTMLInputElement,
  FileUploadProps
> = ({ label, preview, width, height, resetFile, ...rest }, ref) => {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FileContainer width={width} height={height}>
        <FileInput
          type="file"
          className={preview ? "d-none" : ""}
          accept="image/*"
          multiple={false}
          {...rest}
          ref={ref}
        />
        {preview && (
          <CloseButton onClick={resetFile}>
            <CloseIcon />
          </CloseButton>
        )}
        {!preview ? (
          <>
            <Text>Drag and drop file or click to browse file</Text>
            <UploadIcon size={60} />
          </>
        ) : (
          <FilePreview id="preview">
            <Image
              src={preview}
              layout="fill"
              objectFit="cover"
              alt="preview"
            />
          </FilePreview>
        )}
      </FileContainer>
    </FormGroup>
  );
};

export const FileUpload = forwardRef(fileUpload);
