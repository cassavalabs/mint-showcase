import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { walletNameId } from "@cassavaland/sdk";
import { FlexBetween, FlexColumn, Flex } from "../styles";
import { RedoIcon, SendIcon, ShareIcon2 } from "../icons";
import { IconButton } from "../button";
import { Text } from "../text";
import { TextLink } from "../links";

const Container = styled(FlexColumn)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const TopHeader = styled(FlexBetween)`
  width: 100%;
  margin-bottom: 0.5rem;
`;

const StyledButton = styled(IconButton)`
  border: 0.1rem solid ${({ theme }) => theme.bg700};
  height: 3rem;
  :first-child {
    border-radius: 0.5rem 0rem 0rem 0.5rem;
    border-right-width: 0rem;
  }
  :last-child {
    border-radius: 0rem 0.5rem 0.5rem 0rem;
    border-left-width: 0rem;
  }
`;

const Title = styled(Text)`
  font-size: 2rem;
  color: ${({ theme }) => theme.text300};
  font-weight: 600;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-bottom: 1.5rem;
`;

export const AssetHeader = ({
  collectionName,
  assetName,
  transferHandler,
  owner,
}: {
  collectionName: string;
  assetName: string;
  transferHandler: () => void;
  owner: string;
}) => {
  return (
    <Container>
      <TopHeader>
        <TextLink href="#">{collectionName}</TextLink>
        <Flex>
          <Tippy content="Refresh Metadata" theme="tooltip">
            <StyledButton>
              <RedoIcon />
            </StyledButton>
          </Tippy>
          <Tippy content="Transfer NFT" theme="tooltip">
            <StyledButton onClick={transferHandler}>
              <SendIcon />
            </StyledButton>
          </Tippy>
          <Tippy content="Share" theme="tooltip">
            <StyledButton>
              <ShareIcon2 />
            </StyledButton>
          </Tippy>
        </Flex>
      </TopHeader>
      <Title>{assetName}</Title>
      <Text textAlign="left">
        Owned by <TextLink href={`/${owner}`}>{walletNameId(owner)}</TextLink>
      </Text>
    </Container>
  );
};
