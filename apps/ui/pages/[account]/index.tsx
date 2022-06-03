import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Text } from "@cassavaland/uikits";
import {
  getNftCardWidth,
  withSessionSsr,
  NFTCardProps,
} from "@cassavaland/sdk";
import Layout from "../../components/Layouts/Profile";
import { fetchAccount } from "../../libs/fetch-account";

export default function Collected({ user }) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [userNfts, setUserNfts] = useState<NFTCardProps[] | null>(null);

  useEffect(() => {
    const fetchNfts = async () => {
      const { data } = await axios.get(`/api/all/${user.address}/assets`);

      if (data && data.length) {
        setUserNfts(data);
      }
      setLoading(false);
    };

    fetchNfts();
  }, [user.address]);
  return (
    <Layout account={user}>
      {isLoading ? (
        <Text size={2} weight={600}>
          Loading...
        </Text>
      ) : !userNfts ? (
        <Text size={2} weight={600}>
          No NFTs Found!
        </Text>
      ) : (
        <Grid
          dataz={userNfts}
          getCardWidth={getNftCardWidth}
          cardHeight={360}
          type="nft"
        />
      )}
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const userWallet = req.session.account;
    const username = params.account as string;

    if (!userWallet && username === "account") {
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
