import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
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
  SpinLoader,
} from "@cassavaland/uikits";
import { withSessionSsr, getCollectionNft } from "@cassavaland/sdk";
import { fetchCollection } from "../../../../libs/fetch-collections";
import { useStore } from "../../../../state/mintForm";
import { useModal, ApplicationModal } from "../../../../contexts/application";

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
  tokenId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [nftMetadata, setNftData] = useState<any>(null);
  const { toggleActiveModal } = useModal();

  const [setCollection, setTokenId] = useStore(
    (state) => [state.setActiveCollection, state.setTokenId],
    shallow
  );

  const transferHandler = () =>
    toggleActiveModal(ApplicationModal.TRANSFER_NFT);

  useEffect(() => {
    const fetchNft = async () => {
      const data = await getCollectionNft(
        collection.blockchain,
        collection.address,
        tokenId
      );
      setNftData(data);
      setCollection({ name: collection.name, address: collection.address });
      setTokenId(tokenId);
    };

    fetchNft();
  }, [collection, tokenId, setCollection, setTokenId]);

  return (
    <Page>
      {nftMetadata ? (
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
              transferHandler={transferHandler}
            />
            <DisplayTraits traits={nftMetadata.attributes} />
          </RightColumn>
        </Row>
      ) : (
        <SpinLoader />
      )}
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

    return {
      props: {
        collection,
        tokenId,
      },
    };
  }
);
