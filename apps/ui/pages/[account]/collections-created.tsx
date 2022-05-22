import { Grid } from "@cassavaland/uikits";
import { FAKE_COLLECTION, getCollectionCardWidth } from "@cassavaland/sdk";
import Layout from "../../components/Layouts/Profile";

export default function CollectionsCreated() {
  return (
    <Layout>
      <Grid
        dataz={FAKE_COLLECTION}
        getCardWidth={getCollectionCardWidth}
        cardHeight={460}
        type="collection"
      />
    </Layout>
  );
}
