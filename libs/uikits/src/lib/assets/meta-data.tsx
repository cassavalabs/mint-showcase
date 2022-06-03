import styled from "styled-components";
import { shortenAddress, getExplorerURL } from "@cassavaland/sdk";
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

interface TraitProps {
  data: { trait_type: string; value: string };
}

export const Trait = () => {
  // const { data } = props;

  return (
    <TraitContainer>
      <TraitType>Background</TraitType>
      <TraitValue>Red</TraitValue>
    </TraitContainer>
  );
};

export const DisplayTraits = () => {
  return (
    <Collapsible header="Properties">
      <FlexRow>
        <Trait />
        <Trait />
        <Trait />
      </FlexRow>
    </Collapsible>
  );
};

export const DisplayDescription = () => {
  return (
    <Collapsible header="Description">
      <FlexRow>
        <Text textAlign="left" color="text400" lineHeight={2}>
          Created by <TextLink href="#">CassavaBoy</TextLink>
        </Text>
        <Text textAlign="left">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque illum
          obcaecati excepturi voluptatibus, itaque saepe aliquid, ea provident
          incidunt dolorum, accusamus a id porro? Velit doloribus odit
          reiciendis numquam eaque.
        </Text>
      </FlexRow>
    </Collapsible>
  );
};

export const DisplayDetails = () => {
  return (
    <Collapsible header="Details">
      <FlexColumn>
        <Row>
          <Text>Contract Address</Text>
          <StyledTextLink
            target="_blank"
            href={getExplorerURL(
              1285,
              "0x51685d226F643814EC3081593f0753CC8b2C38D1",
              "account"
            )}
          >
            {shortenAddress("0x51685d226F643814EC3081593f0753CC8b2C38D1")}
          </StyledTextLink>
        </Row>
        <Row>
          <Text>Token ID</Text>
          <StyledTextLink
            target="_blank"
            href={getExplorerURL(
              1285,
              "0x51685d226F643814EC3081593f0753CC8b2C38D1",
              "account"
            )}
          >
            {shortenAddress("0x51685d226F643814EC3081593f0753CC8b2C38D1")}
          </StyledTextLink>
        </Row>
        <Row>
          <Text>Token Standard</Text>
          <Text weight={500}>ERC721</Text>
        </Row>
        <Row>
          <Text>Blockchain</Text>
          <Text weight={500}>MoonRiver</Text>
        </Row>
        <Row>
          <Text>Metadata</Text>
          <Text weight={500}>Decentralized</Text>
        </Row>
      </FlexColumn>
    </Collapsible>
  );
};
