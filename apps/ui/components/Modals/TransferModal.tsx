import { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  Text,
  FlexColumn,
  Textbox,
  PrimaryButton,
  Alert,
} from "@cassavaland/uikits";
import { GetMetadata, isAddress } from "@cassavaland/sdk";
import { useModal, ApplicationModal } from "../../contexts/application";
import { useStore } from "../../state/mintForm";
import { useActiveWeb3 } from "../../hooks/useWeb3";

const Container = styled(FlexColumn)`
  width: 100%;
  padding: 2rem;
`;

export default function TransferModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>("");
  const { useActiveModal, toggleActiveModal } = useModal();
  const isModalOpen = useActiveModal(ApplicationModal.TRANSFER_NFT);
  const collectionAddress = useStore((state) => state.activeCollection.address);
  const tokenId = useStore((state) => state.tokenId);

  const { chainId, account } = useActiveWeb3();

  const validate = () =>
    !chainId || !account || !tokenId || !isAddress(receiver);

  const handleTransfer = async () => {
    if (!validate) return;
    setIsLoading(true);

    const contract = new GetMetadata(collectionAddress, chainId);
    await contract.transferFrom(account, receiver, tokenId);
    Alert("Token transfered successfully", "success");
    setIsLoading(false);
    toggleActiveModal(null);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onDismiss={() => toggleActiveModal(null)}
      minHeight={30}
      maxHeight={90}
    >
      <Container>
        <Text size={1.5} weight={600} color="text300" textAlign="left">
          Transfer token
        </Text>
        <Text
          size={1}
          weight={400}
          color="text200"
          textAlign="left"
          margin="0.5rem 0rem"
        >
          You can only transfer tokens in your actively connected wallet
          address.
        </Text>
        <Textbox
          label="Receipient address"
          onChange={(e) => setReceiver(e.target.value)}
          value={receiver}
        />
        <PrimaryButton
          disabled={validate() || isLoading}
          onClick={handleTransfer}
        >
          {isLoading ? "Sending..." : "Send"}
        </PrimaryButton>
      </Container>
    </Modal>
  );
}
