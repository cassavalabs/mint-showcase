import { useRef, useState, ChangeEvent } from "react";
import {
  BoxedPage,
  Page,
  FormGroup,
  FileUpload,
  Textbox,
  TextAreaBox,
  Text,
  PrimaryButton,
} from "@cassavaland/uikits";

export default function Settings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;
    const objectURL = URL.createObjectURL(files[0]);
    setPreview(objectURL);
  };

  const resetFile = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreview(null);
  };

  return (
    <Page centered>
      <BoxedPage>
        <FormGroup>
          <Text size={2.5} weight={700} color="text300" textAlign="left">
            Account Settings
          </Text>
        </FormGroup>
        <FileUpload
          label="Profile Image"
          preview={preview}
          resetFile={resetFile}
          ref={fileInputRef}
          onChange={handleImageChange}
          width="12rem"
          height="10rem"
        />
        <Textbox label="Display name" placeholder="Enter your display name" />
        <Textbox
          label="Username"
          placeholder="https://cassavaland.io/CassavaBoy"
        />
        <TextAreaBox label="Bio" placeholder="Tell a little of your story" />
        <Textbox
          label="Twitter handle"
          placeholder="Enter your twitter handle"
        />
        <Textbox
          label="Instagram handle"
          placeholder="Enter your instagram handle"
        />
        <Textbox
          label="FaceBook username"
          placeholder="Enter your facebook username"
        />
        <Textbox
          label="Discord handle"
          placeholder="Enter your discord handle"
        />
        <Textbox
          label="Telegram handle"
          placeholder="Enter your telegram handle"
        />
        <Textbox label="Website" placeholder="https://" />
        <PrimaryButton>Submit</PrimaryButton>
      </BoxedPage>
    </Page>
  );
}
