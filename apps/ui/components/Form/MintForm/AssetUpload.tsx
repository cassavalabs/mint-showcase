import { useRef, useState, ChangeEvent } from "react";
import { FileUpload } from "@cassavaland/uikits";
import { useStore } from "../../../state/mintForm";

export const AssetUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const setRawFile = useStore((state) => state.setRawFile);
  const setPreviewURL = useStore((state) => state.setPreviewURL);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;
    const objectURL = URL.createObjectURL(files[0]);
    setPreview(objectURL);
    setPreviewURL(objectURL);
    setRawFile(files[0]);
  };

  const resetFile = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreview(null);
    setRawFile(null);
  };

  return (
    <FileUpload
      label="Upload File"
      preview={preview}
      resetFile={resetFile}
      ref={fileInputRef}
      onChange={handleImageChange}
    />
  );
};
