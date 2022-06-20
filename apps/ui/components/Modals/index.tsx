import dynamic from "next/dynamic";

const CreateCollectionModal = dynamic(() => import("./CreateCollectionModal"), {
  ssr: false,
});

const NftCreatedModal = dynamic(() => import("./NftCreatedModal"), {
  ssr: false,
});

const ProgressModal = dynamic(() => import("./ProgressModal"), {
  ssr: false,
});

const TransferModal = dynamic(() => import("./TransferModal"), {
  ssr: false,
});

const WalletModal = dynamic(() => import("./WalletModal"), {
  ssr: false,
});

export default function ModalProvider() {
  return (
    <>
      <CreateCollectionModal />
      <NftCreatedModal />
      <ProgressModal />
      <TransferModal />
      <WalletModal />
    </>
  );
}
