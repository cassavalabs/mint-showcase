import { useEffect, useState } from "react";
import { Grid, Text } from "@cassavaland/uikits";
import {
  getNftCardWidth,
  withSessionSsr,
  NFTCardProps,
  getCollectionNfts,
} from "@cassavaland/sdk";
import Layout from "../../../components/Layouts/Collection";
import { fetchCollection } from "../../../libs/fetch-collections";

export default function Collection({ collection }) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [nfts, setNfts] = useState<NFTCardProps[] | null>(null);

  useEffect(() => {
    const fetchNfts = async () => {
      const data = await getCollectionNfts(
        collection.blockchain,
        collection.address
      );

      if (data && data.length) {
        setNfts(data);
        collection.total_supply = data[0].totalNfts;
      }
      setLoading(false);
    };

    fetchNfts();
  }, []);

  return (
    <Layout collection={collection}>
      {isLoading ? (
        <Text size={2} weight={600}>
          Loading...
        </Text>
      ) : !nfts ? (
        <Text size={2} weight={600}>
          No NFTs Found!
        </Text>
      ) : (
        <Grid
          dataz={nfts}
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
    const blockchainId = params.blockchain_id as string;
    const collectionId = params.collection_id as string;

    const collection = await fetchCollection(collectionId, blockchainId);

    if (!collection) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        collection,
      },
    };
  }
);
