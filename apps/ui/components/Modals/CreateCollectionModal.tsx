import styled from "styled-components";
import { useReducer } from "react";
import {
  Flex,
  FormGroup,
  FormLabel,
  Modal,
  Text,
  StyledTextArea,
  Alert,
  Textbox,
} from "@cassavaland/uikits";
import { SubmitButton } from "../Form/Styles";
import { useModal } from "../../contexts/application";
import { useNftFactoryContract } from "../../hooks/useContract";
import { useProgressStore } from "../../state/progress";

const ModalContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
`;

const ModalForm = styled.div`
  width: 100%;
  padding: 0rem 1rem 1rem;
`;

interface Collection {
  name: string;
  symbol: string;
  description?: string;
}

const INITIAL_COLLECTION_STATE = {
  name: "",
  symbol: "",
};

const COLLECTION_STEPS = [
  {
    title: "Deploy",
    description: "Please wait while we deploy code for the new smart contract.",
    status: "processing",
  },
];

export default function CreateCollection() {
  const { isCollectionModalOpen, toggleCollectionModal, toggleProgressModal } =
    useModal();
  const setProgress = useProgressStore((state) => state.setProgress);
  const contract = useNftFactoryContract();

  const [inputs, setInput] = useReducer(
    (inputs: Collection, updates: Partial<Collection>) => ({
      ...inputs,
      ...updates,
    }),
    INITIAL_COLLECTION_STATE
  );

  const dismiss = () => {
    toggleCollectionModal();
  };

  const validate = () => {
    return inputs.name !== "" && inputs.symbol !== "";
  };

  const handleSubmit = async () => {
    if (!contract) return;

    setProgress(COLLECTION_STEPS);
    toggleProgressModal();

    const tx = await contract.createERC721Collection(
      inputs.name,
      inputs.symbol,
      "ipfs://"
    );
    const receipt = await tx.wait();
    const event = receipt?.events?.find(
      (event) => event.event === "ERC721CassavaCreated"
    );

    if (event && event.args) {
      const [collectionAddress, creatorAddress, name, symbol] = event.args;
      console.log("Collection " + collectionAddress);
      console.log("Owner " + creatorAddress);
      console.log("Name " + name);
      console.log("Symbol " + symbol);
    }

    toggleProgressModal();
    setProgress(null);

    Alert("Collection created Successfully", "success");
  };

  return (
    <Modal
      isOpen={isCollectionModalOpen}
      onDismiss={dismiss}
      minHeight={30}
      maxHeight={100}
    >
      <ModalContent>
        <Header>
          <Text size={1.5} weight={600} color="text300">
            Create Collection
          </Text>
        </Header>
        <ModalForm>
          <Textbox
            label="Name"
            placeholder="Example: The Manihot specie"
            onChange={(e) => setInput({ name: e.target.value })}
            value={inputs.name}
          />
          <Textbox
            label="Symbol"
            placeholder="Example: THOT"
            onChange={(e) => setInput({ symbol: e.target.value })}
            value={inputs.symbol}
          />
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <StyledTextArea
              placeholder="spread some words about this collection"
              onChange={(e) => setInput({ description: e.target.value })}
              value={inputs.description}
            ></StyledTextArea>
          </FormGroup>
          <FormGroup>
            <SubmitButton disabled={!validate()} onClick={handleSubmit}>
              Create
            </SubmitButton>
          </FormGroup>
        </ModalForm>
      </ModalContent>
    </Modal>
  );
}
