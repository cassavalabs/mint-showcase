import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Text } from "@cassavaland/uikits";
import {
  getNftCardWidth,
  NFTCardProps,
  getCollectionNfts,
  decodeURI,
} from "@cassavaland/sdk";
import Layout from "../../../components/Layouts/Collection";
import { fetchCollection } from "../../../libs/fetch-collections";

export default function Collection({ collection }) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [nfts, setNfts] = useState<any | null>(null);

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

    const fetchData = async () => {
      const nftData: any = await axios.get(
        `/api/${
          collection.blockchain
        }/asset/${collection.address.toLowerCase()}/assets`
      );

      const assets: any = [];
      //TODO refactor
      nftData?.data?.assets?.map((asset: any) => {
        assets.push({
          ...asset,
          image_uri: decodeURI(asset.image_uri).uri,
        });
      });

      if (assets && assets.length > 0) {
        setNfts(assets);
        collection.total_supply = assets.length;
      }
      setLoading(false);
    };

    // fetchNfts();
    fetchData();
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

export async function getServerSideProps({ req, params }) {
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
