import { Grid } from "@cassavaland/uikits";
import { FAKE_DATA, getNftCardWidth } from "@cassavaland/sdk";
import Layout from "../../components/Layouts/Profile";

export default function ItemsCreated() {
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
