import styled from "styled-components";
import {
  shortenAddress,
  getExplorerURL,
  MetaDataAtribute,
  AssetCollection,
  CHAIN_INFO,
} from "@cassavaland/sdk";
import { FlexColumn, Flex, FlexBetween } from "../styles";
import { Collapsible } from "../collapsible";
import { Text } from "../text";
import { TextLink, StyledTextLink } from "../links";

const FlexRow = styled(Flex)`
  flex-wrap: wrap;
`;

const Row = styled(FlexBetween)`
  margin-top: 0.5rem;
`;

const TraitContainer = styled(FlexColumn)`
  width: 14rem;
  padding: 1rem;
  margin: 0.25rem;
  border: 0.1rem solid ${({ theme }) => theme.primary300};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.bg300};
  cursor: pointer;
`;

const BaseText = styled.div`
  text-align: center;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const TraitType = styled(BaseText)`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.primary300};
  text-transform: uppercase;
`;

const TraitValue = styled(BaseText)`
  font-size: 1rem;
  color: ${({ theme }) => theme.text300};
  line-height: 2;
`;

export const Trait = (props: MetaDataAtribute) => {
  const { trait_type, value } = props;

  return (
    <TraitContainer>
      <TraitType>{trait_type}</TraitType>
      <TraitValue>{value}</TraitValue>
    </TraitContainer>
  );
};

export const DisplayTraits = ({ traits }: { traits?: MetaDataAtribute[] }) => {
  return (
    <Collapsible header="Properties">
      <FlexRow>
        {traits?.map((trait, index) => {
          return <Trait {...trait} key={index} />;
        })}
      </FlexRow>
    </Collapsible>
  );
};

export const DisplayDescription = ({
  description,
}: {
  description: string;
}) => {
  return (
    <Collapsible header="Description">
      <FlexRow>
        {/* <Text textAlign="left" color="text400" lineHeight={2}>
          Created by <TextLink href="#">...</TextLink>
        </Text> */}
        <Text textAlign="left">{description}</Text>
      </FlexRow>
    </Collapsible>
  );
};

export const DisplayDetails = ({
  collection,
  tokenId,
}: {
  collection: AssetCollection;
  tokenId: string;
}) => {
  const chainInfo = CHAIN_INFO[parseInt(collection.blockchain)];

  return (
    <Collapsible header="Details">
      <FlexColumn>
        <Row>
          <Text>Contract Address</Text>
          <StyledTextLink
            target="_blank"
            href={getExplorerURL(
              parseInt(collection.blockchain),
              collection.address,
              "account"
            )}
          >
            {shortenAddress(collection.address)}
          </StyledTextLink>
        </Row>
        <Row>
          <Text>Token ID</Text>
          <StyledTextLink
            target="_blank"
            href={getExplorerURL(
              parseInt(collection.blockchain),
              collection.address,
              "account"
            )}
          >
            {shortenAddress(collection.address)}
          </StyledTextLink>
        </Row>
        <Row>
          <Text>Token Standard</Text>
          <Text weight={500}>{collection.contract_standard}</Text>
        </Row>
        <Row>
          <Text>Blockchain</Text>
          <Text weight={500}>{chainInfo.chainName}</Text>
        </Row>
        <Row>
          <Text>Metadata</Text>
          <Text weight={500}>Decentralized</Text>
        </Row>
      </FlexColumn>
    </Collapsible>
  );
};
