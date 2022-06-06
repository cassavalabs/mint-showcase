import { InferGetServerSidePropsType } from "next";
import styled from "styled-components";
import {
  Page,
  MediaCard,
  Flex,
  FlexColumn,
  AssetHeader,
  DisplayTraits,
  DisplayDescription,
  DisplayDetails,
} from "@cassavaland/uikits";
import { withSessionSsr, getCollectionNft } from "@cassavaland/sdk";
import { fetchCollection } from "../../../../libs/fetch-collections";

const Row = styled(Flex)``;

const LeftColumn = styled(FlexColumn)`
  width: 100%;
  max-width: 45%;
  margin: 1.5rem 0.8rem 1.5rem 1.5rem;
  flex-grow: 3;
  flex-basis: 0;
`;

const RightColumn = styled(FlexColumn)`
  width: 100%;
  max-width: 55%;
  margin: 1.5rem 1.5rem 1.5rem 0.8rem;
`;

export default function AssetPage({
  collection,
  nftMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <Row>
        <LeftColumn>
          <MediaCard
            src={nftMetadata.image}
            blockchain={collection.blockchain}
          />
          <DisplayDescription description={nftMetadata.description} />
          <DisplayDetails
            collection={collection}
            tokenId={nftMetadata.token_id}
          />
        </LeftColumn>
        <RightColumn>
          <AssetHeader
            collectionName={collection.name}
            assetName={nftMetadata.name}
          />
          <DisplayTraits traits={nftMetadata.attributes} />
        </RightColumn>
      </Row>
    </Page>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const blockchainId = params.blockchain as string;
    const collectionId = params.collection as string;
    const tokenId = params.token_id as string;

    const collection = await fetchCollection(collectionId, blockchainId);

    if (!collection) {
      return {
        notFound: true,
      };
    }

    const nftMetadata = await getCollectionNft(
      collection.blockchain,
      collection.address,
      tokenId
    );

    return {
      props: {
        collection,
        nftMetadata,
      },
    };
  }
);
