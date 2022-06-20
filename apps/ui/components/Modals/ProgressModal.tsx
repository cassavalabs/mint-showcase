import styled from "styled-components";
import shallow from "zustand/shallow";
import {
  FlexCenter,
  FormGroup,
  Modal,
  Text,
  SpinLoading,
  SecondaryButton,
  FlexColumnStart,
  CheckMarkIcon,
} from "@cassavaland/uikits";
import { ApplicationModal, useModal } from "../../contexts/application";
import { useProgressStore } from "../../state/progress";

const ModalContent = styled(FlexCenter)`
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
`;

const Container = styled.div`
  width: 100%;
  padding: 0rem 1.5rem 1rem;
`;

const CancelButton = styled(SecondaryButton)`
  height: 3rem;
  justify-content: center;
  :last-child {
    margin: 2rem 0rem 0rem 0rem;
  }
`;

const StepItem = styled(FlexCenter)`
  margin-top: 1rem;
  border-top: 0.1rem solid ${({ theme }) => theme.bg600};
`;

export default function ProgressModal() {
  const { useActiveModal, toggleActiveModal } = useModal();
  const isModalOpen = useActiveModal(ApplicationModal.CREATE_NFT_STATE);
  const [progress, setProgress] = useProgressStore(
    (state) => [state.progress, state.setProgress],
    shallow
  );

  const dismiss = () => {
    //
  };

  const close = () => {
    setProgress(null);
    toggleActiveModal(null);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onDismiss={dismiss}
      minHeight={30}
      maxHeight={100}
    >
      <ModalContent>
        <Header>
          <Text size={1.5} weight={600} color="text300">
            Processing
          </Text>
        </Header>
        <Container>
          {progress?.map((status, key) => {
            return (
              <StepItem key={key}>
                {status.status === "processing" ? (
                  <SpinLoading size={2} />
                ) : status.status === "completed" ? (
                  <CheckMarkIcon size="32px" color="#2172e5" />
                ) : (
                  <CheckMarkIcon size="32px" />
                )}
                <FlexColumnStart full>
                  <Text
                    margin="0rem 0rem 0rem 1.5rem"
                    color="text300"
                    textAlign="left"
                    weight={600}
                  >
                    {status.title}
                  </Text>
                  <Text
                    margin="0rem 0rem 0rem 1.5rem"
                    size={0.875}
                    textAlign="left"
                  >
                    {status.description}
                  </Text>
                </FlexColumnStart>
              </StepItem>
            );
          })}
          <FormGroup>
            <CancelButton onClick={close}>Cancel</CancelButton>
          </FormGroup>
        </Container>
      </ModalContent>
    </Modal>
  );
}
