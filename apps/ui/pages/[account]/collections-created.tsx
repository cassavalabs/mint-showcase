import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Text } from "@cassavaland/uikits";
import {
  getCollectionCardWidth,
  isAddress,
  withSessionSsr,
  AssetCollection,
} from "@cassavaland/sdk";
import Layout from "../../components/Layouts/Profile";
import { fetchAccount } from "../../libs/fetch-account";

export default function CollectionsCreated({ user }) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [userCollections, setUserCollections] = useState<
    AssetCollection[] | null
  >(null);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await axios.get(`/api/1285/${user.address}/collections`);

      if (data && data.length) {
        setUserCollections(data);
      }
      setLoading(false);
    };

    fetchCollections();
  }, [user.address]);
  return (
    <Layout account={user}>
      {isLoading ? (
        <Text size={2} weight={600}>
          Loading...
        </Text>
      ) : !userCollections ? (
        <Text size={2} weight={600}>
          No Collections Found!
        </Text>
      ) : (
        <Grid
          dataz={userCollections}
          getCardWidth={getCollectionCardWidth}
          cardHeight={460}
          type="collection"
        />
      )}
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const userWallet = req.session.account;
    const username = params.account as string;

    if (!isAddress(userWallet) && username === "account") {
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
