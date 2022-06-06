import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import {
  FlexCenter,
  FullWidth,
  Modal,
  Text,
  SecondaryOutlineBtn,
  SnowConfetti,
  FlexColumn,
  FlexBetween,
  ShareButton,
  PrimaryButton,
} from "@cassavaland/uikits";
import { getExplorerURL } from "@cassavaland/sdk";
import { ShareLink } from "../ClickToCopy";
import { useModal } from "../../contexts/application";
import { useActiveWeb3 } from "../../hooks/useWeb3";
import { useStore } from "../../state/mintForm";

const ModalContent = styled(FlexCenter)`
  width: 100%;
  flex-direction: column;
`;

const Header = styled(FlexCenter)`
  width: 100%;
  flex-direction: column;
  height: 20rem;
  position: relative;
`;

const ImageContainer = styled(FlexCenter)`
  width: 100%;
  max-width: 18rem;
  height: 100%;
  position: relative;
  border-radius: 0.5rem;
  margin: 2rem 2rem 0rem 2rem;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text300};
  max-width: 19rem;
  span {
    color: ${({ theme }) => theme.primary100};
    font-weight: 600;
  }
`;

const Body = styled(FullWidth)`
  padding: 2rem;
`;

const StatusBox = styled(FlexBetween)`
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const StatusBoxRow = styled(FlexCenter)`
  width: 100%;
  &:first-child > div {
    margin-right: 1.5rem;
  }

  &:last-child > div {
    width: calc(100% - 6.25rem);
    margin-right: 0rem;
  }
`;

const StatusBoxColumn = styled(FlexColumn)`
  justify-content: flex-start;
`;

const ViewButton = styled(PrimaryButton)`
  font-weight: 600;
  margin-top: 0.5rem;
  border-radius: 1rem 0rem 0rem 1rem;
  border-right-width: 0rem;
`;

const CreateButton = styled(SecondaryOutlineBtn)`
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
  border-radius: 0rem 1rem 1rem 0rem;
  border-left-width: 0rem;
`;

const StyledLink = styled.a`
  width: 100%;
  display: block;
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.primary100};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none;
  transition: all 0.25s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.text300};
  }
`;

const ShareButtons = styled(FlexBetween)`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default function NftCreatedModal() {
  const { isNftCreatedModalOpen } = useModal();
  const { chainId } = useActiveWeb3();
  const router = useRouter();

  const [collection, name, txHash, tokenId, previewURL] = useStore(
    (state) => [
      state.activeCollection,
      state.name,
      state.txHash,
      state.tokenId,
      state.previewURL,
    ],
    shallow
  );

  const assetURL = `${window.location.host}/assets/${collection.address}/${tokenId}`;

  const handleViewNFT = () => {
    router.push(`/assets/${chainId}/${collection.address}/${tokenId}`);
  };

  const handleCreateAnother = () => {
    router.replace(router.asPath);
  };

  const dismiss = () => {
    //
  };

  return (
    <Modal
      isOpen={isNftCreatedModalOpen}
      onDismiss={dismiss}
      minHeight={30}
      maxHeight={100}
      width="23rem"
    >
      <ModalContent>
        <Header>
          <SnowConfetti />
          <ImageContainer>
            {previewURL && (
              <Image
                src={previewURL}
                layout="fill"
                alt="img"
                objectFit="cover"
              />
            )}
          </ImageContainer>
          <Title>
            Your <span>{name}</span> NFT is successfully created
          </Title>
        </Header>
        <Body>
          <StatusBox>
            <StatusBoxRow>
              <StatusBoxColumn>
                <Text
                  size={0.875}
                  weight={600}
                  color="text200"
                  textAlign="left"
                >
                  Status
                </Text>
                <Text
                  size={1}
                  weight={600}
                  color="textSuccess"
                  textAlign="left"
                >
                  Confirmed
                </Text>
              </StatusBoxColumn>
              <StatusBoxColumn>
                <Text
                  size={0.875}
                  weight={600}
                  color="text200"
                  textAlign="left"
                >
                  Transaction hash
                </Text>
                <Text>
                  <StyledLink href={getExplorerURL(chainId, txHash, "tx")}>
                    {txHash}
                  </StyledLink>
                </Text>
              </StatusBoxColumn>
            </StatusBoxRow>
          </StatusBox>
          <Title>Let &apos;s spread the word</Title>
          <ShareButtons>
            <ShareButton nature="facebook" url={assetURL} />
            <ShareButton nature="twitter" url={assetURL} />
            <ShareButton nature="telegram" url={assetURL} />
            <ShareButton nature="email" url={assetURL} />
            <ShareLink toCopy={assetURL} />
          </ShareButtons>
          <FlexCenter>
            <ViewButton onClick={handleViewNFT}>View NFT</ViewButton>
            <CreateButton onClick={handleCreateAnother}>
              Create new NFT
            </CreateButton>
          </FlexCenter>
        </Body>
      </ModalContent>
    </Modal>
  );
}
