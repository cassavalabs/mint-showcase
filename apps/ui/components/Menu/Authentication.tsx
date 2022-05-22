import styled from "styled-components";
import Image from "next/image";
import {
  FlexColumn,
  LeftIcon,
  MenuContainer,
  Text,
  SecondaryButton,
} from "@cassavaland/uikits";
import { CHAIN_INFO } from "@cassavaland/sdk";
import { useActiveChainId } from "../../contexts/application";
import { useStore } from "../../state/sidebar";

const Container = styled(FlexColumn)`
  padding: 1.5rem;
`;

const ScrollContent = styled(FlexColumn)`
  max-height: calc(100vh - 11.75rem);
  margin-top: 1rem;
  overflow: hidden;
  :hover {
    overflow-y: auto;
  }
`;

const OptionButton = styled(SecondaryButton)`
  margin: 0.5rem 0rem;
  &.active {
    box-shadow: none;
    background-color: ${({ theme }) => theme.bg700};
  }
`;

export const Authentication = () => {
  const { chainId: activeChainId, switchNetwork } = useActiveChainId();
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const handleChainSelection = (chainId: number) => {
    toggleSidebar(false);
    switchNetwork(chainId);
  };

  return (
    <MenuContainer show>
      <Container>
        <Text size={1.5} color="text300" weight={500} textAlign="center">
          Blockchains
        </Text>
        <Text size={1} color="text200" weight={400} textAlign="center">
          Select one of our many supported blockchains to interact with.
        </Text>
        <ScrollContent>
          {Object.keys(CHAIN_INFO).map((key) => {
            const chainId = Number(key);
            const option = CHAIN_INFO[chainId];

            return (
              <OptionButton
                onClick={() => handleChainSelection(chainId)}
                key={chainId}
                className={activeChainId === chainId ? "active" : ""}
                disabled={activeChainId === chainId}
              >
                <LeftIcon rounded>
                  <Image
                    src={option.iconUrls[0]}
                    width={32}
                    height={32}
                    alt="logo"
                  />
                </LeftIcon>
                {option.chainName}
              </OptionButton>
            );
          })}
        </ScrollContent>
      </Container>
    </MenuContainer>
  );
};
