import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import { BoxedPage, Page, Text } from "@cassavaland/uikits";
import {
  withSessionSsr,
  MintFormCollection,
  getERC721CollectionAddress,
} from "@cassavaland/sdk";
import { MintForm } from "../../components/Form";
import { useStore } from "../../state/mintForm";
import { fetchCollections } from "../../libs/fetch-collections";
import { useActiveWeb3 } from "../../hooks/useWeb3";

export default function Create({
  userCollections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { chainId } = useActiveWeb3();
  const setCollections = useStore((state) => state.setCollections);

  const erc721CollectionAddress = getERC721CollectionAddress(chainId);

  const newCollections: MintFormCollection[] = [
    { name: "CassavaLand", address: erc721CollectionAddress },
  ];
  userCollections.map((userCollection) => {
    newCollections.push({
      name: userCollection.name,
      address: userCollection.address,
    });
  });

  useEffect(() => {
    setCollections(newCollections);
  }, []);

  return (
    <Page centered>
      <BoxedPage>
        <Text size={2.5} color="text300" weight={700} textAlign="center">
          Create A New Collectible
        </Text>
        <MintForm />
      </BoxedPage>
    </Page>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const username = req.session.account;

    if (!username) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const userCollections = await fetchCollections(username);

    return {
      props: {
        userCollections,
      },
    };
  }
);
