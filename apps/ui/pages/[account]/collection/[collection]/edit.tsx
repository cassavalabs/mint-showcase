import { withSessionSsr } from "@cassavaland/sdk";
import {
  Banner,
  BoxedPage,
  RoundAvatar,
  Page,
  Textbox,
  TextAreaBox,
  Text,
  PrimaryButton,
} from "@cassavaland/uikits";
import {
  HeaderContainer,
  HeaderWrapper,
} from "../../../../components/Headers/Collection";

export default function EditCollection() {
  return (
    <>
      <HeaderWrapper>
        <Banner />
        <HeaderContainer>
          <RoundAvatar
            size={10.5}
            src="/gorilla.jpg"
            layout="fill"
            alt="avatar"
          />
        </HeaderContainer>
      </HeaderWrapper>
      <Page centered>
        <BoxedPage>
          <Text size={2.5} color="text300" weight={600}>
            Edit My Collection
          </Text>
          <Textbox label="Name" placeholder="Enter display name" />
          <TextAreaBox
            label="Description"
            placeholder="Describe your collection as much as you can"
          />
          <Textbox
            label="Short URL"
            placeholder="https://cassavaland.io/the-fairy-moon-boy"
          />
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
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const userWallet = req.session.account;

    if (!userWallet) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
);
