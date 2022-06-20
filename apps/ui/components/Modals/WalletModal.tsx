import { useEffect, useState } from "react";
import styled from "styled-components";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import Image from "next/image";
import {
  FlexColumnCenter,
  FlexColumnStart,
  FlexBetween,
  FlexStart,
  FullWidth,
  RightIcon,
  Text,
  SecondaryButton,
  SpinLoading,
  Alert,
  IconButton,
  Modal,
  CloseIcon,
  BackArrowIcon,
} from "@cassavaland/uikits";
import { SUPPORTED_WALLETS } from "@cassavaland/sdk";
import { usePrevious } from "../../hooks/usePrevious";
import { useModal } from "../../contexts/application";

export interface OptionProps {
  size?: number;
  icon: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  name: string;
  description?: string;
}

export interface PendingConnectionProps {
  connector?: AbstractConnector;
  error?: boolean;
  setConnectionError: (error: boolean) => void;
  retryActivation: (connector: AbstractConnector) => void;
}

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0rem;
  color: ${({ theme }) => theme.text300};

  :hover {
    opacity: 0.3;
  }
`;

const BackButton = styled(IconButton)`
  padding: 0rem;
  color: ${({ theme }) => theme.text300};

  :hover {
    opacity: 0.3;
  }
`;

const ModalContent = styled.div`
  position: relative;
  padding: 1rem;
`;

const ModalHeader = styled(FlexStart)``;

const Options = styled(FullWidth)`
  display: flex;
  flex-direction: column;
`;

const ReconnectButton = styled(SecondaryButton)`
  margin: 0rem;
  :last-child {
    margin-bottom: 0rem;
  }
`;

const ErrorMessageBox = styled(FlexStart)<{ error?: boolean }>`
  width: 100%;
  border: 0.1rem solid
    ${({ theme, error }) => (error ? theme.red100 : theme.bg600)};
  color: ${({ theme, error }) => (error ? theme.red100 : theme.bg600)};
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.25rem 1rem;
`;

const WALLET_MODAL_VIEWS = {
  ACCOUNT: "account",
  BLOCKCHAINS: "blockchains",
  CONNECTING: "connecting",
  WALLETS: "wallets",
};

const StyledOption = styled(SecondaryButton)`
  width: 100%;
  margin: 0.5rem 0rem 0rem;
  :last-child {
    margin-bottom: 0rem;
  }
  &.active {
    box-shadow: none;
    background-color: ${({ theme }) => theme.bg700};
  }
`;

const WalletLogo = styled(RightIcon)`
  background-color: transparent;
`;

const Option = (props: OptionProps) => {
  const { active, icon, size, onClick, name, description, disabled } = props;

  return (
    <StyledOption
      onClick={onClick}
      className={active ? "active" : ""}
      disabled={active || disabled}
    >
      <FlexColumnStart>
        <Text size={1} weight={500} color="text300" textAlign="left">
          {name}
        </Text>
        {description && (
          <Text size={0.875} color="text200" textAlign="left">
            {description}
          </Text>
        )}
      </FlexColumnStart>
      <WalletLogo size={size} rounded>
        <Image src={icon} width={32} height={32} alt="logo" />
      </WalletLogo>
    </StyledOption>
  );
};

const PendingConnection = (props: PendingConnectionProps) => {
  const { connector, error, setConnectionError, retryActivation } = props;

  const handleReconnection = (
    connector: PendingConnectionProps["connector"]
  ) => {
    setConnectionError(true);
    connector && retryActivation(connector);
  };

  const isMetaMask = (window as any)?.ethereum?.isMetaMask;

  return (
    <FlexColumnCenter>
      <ErrorMessageBox error={error}>
        <FlexBetween>
          {error ? (
            <>
              Connection error
              <ReconnectButton onClick={() => handleReconnection}>
                Retry
              </ReconnectButton>
            </>
          ) : (
            <>
              <SpinLoading size={1.5} />
              <Text margin="0rem 0rem 0rem 1rem">Connecting...</Text>
            </>
          )}
        </FlexBetween>
      </ErrorMessageBox>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key];

        if (option.connector === connector) {
          if (option.connector === "injected") {
            if (isMetaMask && option.name !== "MetaMask") {
              return null;
            }
            if (!isMetaMask && option.name === "MetaMask") {
              return null;
            }
          }

          return (
            <Option
              active={true}
              description={option.description}
              icon={option.iconURL}
              key={key}
              name={option.name}
            />
          );
        }
        return null;
      })}
    </FlexColumnCenter>
  );
};

export default function WalletModal() {
  const { isWalletModalOpen, toggleWalletModal } = useModal();
  const { activate, active, account, connector, error } = useWeb3React();

  const [activeModalView, setActiveModalView] = useState(
    WALLET_MODAL_VIEWS.WALLETS
  );
  // const previousActiveModalView = usePrevious(activeModalView);
  const previousAccount = usePrevious(account);

  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >();
  const [pendingError, setPendingError] = useState<boolean>(false);

  useEffect(() => {
    if (account && !previousAccount && isWalletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, isWalletModalOpen, toggleWalletModal]);

  // Set default view on modal open to active account view
  useEffect(() => {
    if (isWalletModalOpen) {
      setPendingError(false);
      setActiveModalView(WALLET_MODAL_VIEWS.ACCOUNT);
    }
  }, [isWalletModalOpen]);

  // Close modal when connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  useEffect(() => {
    if (
      isWalletModalOpen &&
      ((active && !activePrevious) ||
        (connector && connector !== connectorPrevious && !error))
    ) {
      setActiveModalView(WALLET_MODAL_VIEWS.ACCOUNT);
    }
  }, [
    active,
    activePrevious,
    connector,
    connectorPrevious,
    error,
    isWalletModalOpen,
    setActiveModalView,
  ]);

  const tryActivation = async (connector: AbstractConnector) => {
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      let name = "";
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    setPendingWallet(connector);
    setActiveModalView(WALLET_MODAL_VIEWS.CONNECTING);
    activate(connector, undefined, true).catch((err) => {
      if (err instanceof UnsupportedChainIdError) {
        Alert("Opps! You trying to connect to an unsupported chain", "error");
        toggleWalletModal();
      } else if (err instanceof UserRejectedRequestError) {
        Alert("Opps! You have rejected the connection", "error");
        toggleWalletModal();
      } else {
        setPendingError(true);
      }
    });
  };

  const getOptions = () => {
    // const { web3, ethereum } = window as any;
    // const isMetaMask = ethereum && ethereum.isMetaMask;

    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      return (
        <Option
          active={option.connector && option.connector === connector}
          icon={option.iconURL}
          disabled={option.disabled}
          name={option.name}
          key={key}
          onClick={() => {
            option.connector && !option.href && tryActivation(option.connector);
          }}
        />
      );
    });
  };

  const getModalViewContent = () => {
    return (
      <ModalContent>
        <CloseButton onClick={toggleWalletModal}>
          <CloseIcon size={24} />
        </CloseButton>
        {activeModalView !== WALLET_MODAL_VIEWS.ACCOUNT ? (
          <ModalHeader>
            <BackButton
              onClick={() => {
                setPendingError(false);
                setActiveModalView(WALLET_MODAL_VIEWS.ACCOUNT);
              }}
            >
              <BackArrowIcon size={24} />
            </BackButton>
          </ModalHeader>
        ) : (
          <ModalHeader>
            <Text color="text300" size={1.5} weight={500} textAlign="left">
              Connect your wallet
            </Text>
          </ModalHeader>
        )}
        <Text
          size={1}
          color="text200"
          weight={400}
          textAlign="left"
          margin="1rem 0rem"
        >
          {activeModalView === WALLET_MODAL_VIEWS.CONNECTING
            ? `Please wait to authorize this app, while we attempt connection to
              your selected blockchain and wallet.`
            : `Select one of our many supported wallet providers or create new
              one.`}
        </Text>
        {activeModalView === WALLET_MODAL_VIEWS.CONNECTING ? (
          <PendingConnection
            connector={pendingWallet}
            error={pendingError}
            setConnectionError={setPendingError}
            retryActivation={tryActivation}
          />
        ) : (
          <Options>{getOptions()}</Options>
        )}
      </ModalContent>
    );
  };

  return (
    <Modal
      isOpen={isWalletModalOpen}
      onDismiss={() => toggleWalletModal}
      minHeight={30}
      maxHeight={90}
    >
      <FullWidth>{getModalViewContent()}</FullWidth>
    </Modal>
  );
}
