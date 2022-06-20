import { useRef, useState, ChangeEvent, useReducer } from "react";
import axios from "axios";
import {
  BoxedPage,
  Page,
  FormGroup,
  FileUpload,
  Textbox,
  TextAreaBox,
  Text,
  PrimaryButton,
  Alert,
} from "@cassavaland/uikits";
import { withSessionSsr, Account, filterNull } from "@cassavaland/sdk";
import { fetchAccount } from "../../libs/fetch-account";

type FormInputs = Omit<
  Account,
  "address" | "avatar_uri" | "banner_uri" | "verified" | "email"
>;

export default function Settings({ user }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { address, avatar_uri, banner_uri, verified, email, ...initialData } =
    filterNull(user);
  const [form, setForm] = useReducer(
    (state: FormInputs, newState: Partial<FormInputs>) => ({
      ...state,
      ...newState,
    }),
    {
      ...initialData,
    }
  );

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;
    const objectURL = URL.createObjectURL(files[0]);
    setPreview(objectURL);
    //TODO:send to server
  };

  const resetFile = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreview(null);
  };

  const handleSubmit = async () => {
    const { status, statusText, data } = await axios.post(
      "/api/auth/settings",
      form
    );

    if (status === 200 && data) {
      Alert("Profile updated Successfully!", "success");
    }

    if (status === 500) {
      Alert(statusText, "error");
    }
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
        <Textbox
          label="Display name"
          placeholder="Enter your display name"
          value={form.display_name}
          onChange={(e) => setForm({ display_name: e.target.value })}
        />
        <Textbox
          label="Username"
          placeholder="https://cassavaland.io/CassavaBoy"
          value={form.username}
          onChange={(e) => setForm({ username: e.target.value })}
        />
        <TextAreaBox
          label="Bio"
          placeholder="Tell a little of your story"
          value={form.bio}
          onChange={(e) => setForm({ bio: e.target.value })}
        />
        <Textbox
          label="Twitter handle"
          placeholder="Enter your twitter handle"
          value={form.twitter}
          onChange={(e) => setForm({ twitter: e.target.value })}
        />
        <Textbox
          label="Instagram handle"
          placeholder="Enter your instagram handle"
          value={form.instagram}
          onChange={(e) => setForm({ instagram: e.target.value })}
        />
        <Textbox
          label="FaceBook username"
          placeholder="Enter your facebook username"
          value={form.facebook}
          onChange={(e) => setForm({ facebook: e.target.value })}
        />
        <Textbox
          label="Discord handle"
          placeholder="Enter your discord handle"
          value={form.discord}
          onChange={(e) => setForm({ discord: e.target.value })}
        />
        <Textbox
          label="Telegram handle"
          placeholder="Enter your telegram handle"
          value={form.telegram}
          onChange={(e) => setForm({ telegram: e.target.value })}
        />
        <Textbox
          label="Website"
          placeholder="https://"
          value={form.website}
          onChange={(e) => setForm({ website: e.target.value })}
        />
        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      </BoxedPage>
    </Page>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const userWallet = req.session.account;
    const username = params.account as string;

    if (!userWallet) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const userAccount = await fetchAccount(userWallet, username);

    if (!userAccount) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: userAccount,
      },
    };
  }
);
