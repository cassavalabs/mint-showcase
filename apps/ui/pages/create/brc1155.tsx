import { BoxedPage, Page, Text } from "@cassavaland/uikits";
import { MintForm } from "../../components/Form";

export default function Create() {
  return (
    <Page centered>
      <BoxedPage>
        <Text size={2.5} color="text300" weight={700} textAlign="center">
          Create A New Collectible
        </Text>
        <MintForm isMultiple />
      </BoxedPage>
    </Page>
  );
}
