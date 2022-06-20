import styled from "styled-components";
import {
  Grid,
  Banner,
  FlexColumn,
  Container,
  HorizontalDivider,
  Text,
} from "@cassavaland/uikits";
import { getCollectionCardWidth, AssetCollection } from "@cassavaland/sdk";
import { fetchCollections } from "../../libs/fetch-collections";

const PageContent = styled(FlexColumn)`
  padding: 2rem 1rem;
  background-color: ${({ theme }) => theme.bg100};
`;

const Header = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export default function Collections({
  collections,
}: {
  collections: AssetCollection[];
}) {
  return (
    <FlexColumn>
      <Header>
        <Banner />
        <Text size={2.5} color="text300" weight={600} margin="2rem 0rem">
          Explore Collectibles
        </Text>
        <Text size={1} mWidth="37rem">
          An online community of makers, developers, and traders is pushing the
          art world into new territory. It all started with CryptoPunks, a set
          of 10,000 randomly generated punks that proved demand for the digital
          ownership of non-physical items and collectibles in 2017, and the
          market has evolved rapidly ever since.
        </Text>
      </Header>
      <HorizontalDivider />
      <PageContent>
        {collections.length > 0 ? (
          <Grid
            dataz={collections}
            getCardWidth={getCollectionCardWidth}
            cardHeight={460}
            type="collection"
          />
        ) : (
          <Text>No Collections Found!</Text>
        )}
      </PageContent>
    </FlexColumn>
  );
}

export const getServerSideProps = async () => {
  const data = await fetchCollections();

  return {
    props: {
      collections: JSON.parse(JSON.stringify(data)),
    },
  };
};
