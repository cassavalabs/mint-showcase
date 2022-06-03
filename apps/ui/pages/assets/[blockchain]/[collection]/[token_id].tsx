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

export default function AssetPage() {
  return (
    <Page>
      <Row>
        <LeftColumn>
          <MediaCard src="/gorilla.jpg" blockchain="1285" />
          <DisplayDescription />
          <DisplayDetails />
        </LeftColumn>
        <RightColumn>
          <AssetHeader />
          <DisplayTraits />
        </RightColumn>
      </Row>
    </Page>
  );
}

// export const
