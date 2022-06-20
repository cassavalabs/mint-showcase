import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { CHAIN_INFO, network } from "@cassavaland/sdk";
import { Alert } from "@cassavaland/uikits";
import { useEagerConnect, useInactiveListener } from "../../hooks/useWeb3";

export enum ApplicationModal {
  WALLET,
  CREATE_COLLECTION,
  CREATE_NFT_STATE,
  NFT_CREATED_SUCCESSFULLY,
  TRANSFER_NFT,
}

const ApplicationContext = createContext<{
  readonly activeModal: ApplicationModal | null;
  toggleActiveModal: (modal: ApplicationModal | null) => void;
  readonly chainId: number | null;
  updateChainId: (chainId: number | null) => void;
  switchNetwork: (targetChainId: number) => void;
}>(null);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const { active, chainId: activeChainId, library } = useWeb3React();

  //Modal
  const [activeModal, _setActiveModal] = useState<ApplicationModal | null>(
    null
  );

  const toggleActiveModal = useCallback(
    (modal: ApplicationModal | null) => {
      if (activeModal === modal) {
        return _setActiveModal(null);
      }
      _setActiveModal(modal);
    },
    [activeModal, _setActiveModal]
  );

  const triedEager = useEagerConnect();
  const {
    activate: activateNetwork,
    active: activeNetwork,
    error: networkError,
  } = useWeb3React();

  //chainId
  const [chainId, _updateChainId] = useState<number | null>(null);

  const updateChainId = useCallback(
    (chainId: number | null) => _updateChainId(chainId),
    [_updateChainId]
  );

  useEffect(() => {
    if (triedEager && !active && !activeNetwork && !networkError) {
      activateNetwork(network);
    }
  }, [activateNetwork, active, activeNetwork, networkError, triedEager]);

  useInactiveListener(!triedEager);

  useEffect(() => {
    if (!active && networkError && triedEager) {
      if (networkError instanceof UnsupportedChainIdError) {
        Alert("You have connected to an unsupported blockchain", "error");
      } else {
        Alert(
          "Oops! An unknown error occured. Please refresh the page",
          "error"
        );
      }
    }
  }, [active, networkError, triedEager]);

  useEffect(() => {
    updateChainId(activeChainId ?? null);
  }, [activeChainId, updateChainId]);

  // Switch MetaMask Network
  const switchNetwork = useCallback(
    async (targetChainId: number) => {
      if (!library) {
        toggleActiveModal(ApplicationModal.WALLET);
      }

      const chainIdHex = `0x${targetChainId.toString(16)}`;

      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
        updateChainId(targetChainId);
      } catch (error) {
        const err = error as unknown as any;
        if (err.code === 4902) {
          const info = CHAIN_INFO[targetChainId];

          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainIdHex,
                  chainName: info.chainName,
                  rpcUrls: info.rpcUrls,
                  nativeCurrency: info.nativeCurrency,
                  blockExplorerUrls: info.blockExplorerUrls,
                },
              ],
            });
          } catch (error) {
            const err = error as unknown as any;
            if (err.code === 4001) {
              Alert(err.message, "error");
            }
          }
        }

        if (err.code === 4001) {
          Alert(err.message, "error");
        }
      }
    },
    [library, updateChainId, toggleActiveModal]
  );

  return (
    <ApplicationContext.Provider
      value={{
        activeModal,
        chainId,
        switchNetwork,
        toggleActiveModal,
        updateChainId,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useActiveChainId = () => {
  const context = useContext(ApplicationContext);

  if (!context) throw new Error("Missing Application context");

  const { chainId, updateChainId, switchNetwork } = context;

  return {
    chainId,
    updateChainId,
    switchNetwork,
  };
};

export const useModal = () => {
  const context = useContext(ApplicationContext);

  if (!context) throw new Error("Missing Application context");

  const { activeModal, toggleActiveModal } = context;

  const useActiveModal = (modal: ApplicationModal) => {
    return activeModal === modal;
  };

  const toggleWalletModal = () => {
    toggleActiveModal(ApplicationModal.WALLET);
  };

  const toggleCollectionModal = () => {
    toggleActiveModal(ApplicationModal.CREATE_COLLECTION);
  };

  const toggleProgressModal = () => {
    toggleActiveModal(ApplicationModal.CREATE_NFT_STATE);
  };

  const toggleNftCreatedModal = () => {
    toggleActiveModal(ApplicationModal.NFT_CREATED_SUCCESSFULLY);
  };

  const isWalletModalOpen = activeModal === ApplicationModal.WALLET;
  const isCollectionModalOpen =
    activeModal === ApplicationModal.CREATE_COLLECTION;
  const isProgressModalOpen = activeModal === ApplicationModal.CREATE_NFT_STATE;
  const isNftCreatedModalOpen =
    activeModal === ApplicationModal.NFT_CREATED_SUCCESSFULLY;

  return {
    activeModal,
    isWalletModalOpen,
    isCollectionModalOpen,
    isProgressModalOpen,
    isNftCreatedModalOpen,
    toggleActiveModal,
    toggleCollectionModal,
    toggleProgressModal,
    toggleNftCreatedModal,
    toggleWalletModal,
    useActiveModal,
  };
};
