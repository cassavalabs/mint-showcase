import { Grid } from "@cassavaland/uikits";
import { FAKE_DATA, getNftCardWidth } from "@cassavaland/sdk";
import Layout from "../../../../components/Layouts/Collection";

export default function Collection() {
  return (
    <Layout>
      <Grid
        dataz={FAKE_DATA}
        getCardWidth={getNftCardWidth}
        cardHeight={360}
        type="nft"
      />
    </Layout>
  );
}
