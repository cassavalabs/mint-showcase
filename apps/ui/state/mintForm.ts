import create from "zustand";
import type { MintFormData, TokenMetaData } from "@cassavaland/sdk";

type MintForm = MintFormData &
  TokenMetaData & {
    rawFile: File | null;
    previewURL: string;
    txHash: string;
  };

interface MintFormActions {
  setRawFile: (file: File) => void;
  setName: (name: string) => void;
  setImage: (image: string) => void;
  setExternalURL: (url: string) => void;
  setDescription: (description: string) => void;
  setAttributes: (attributes: TokenMetaData["attributes"]) => void;
  setShowProperties: () => void;
  setActiveCollection: (collection: MintFormData["activeCollection"]) => void;
  setCollections: (collections: MintFormData["collections"]) => void;
  setRoyalty: (amount: string) => void;
  setTokenId: (id: string) => void;
  setQuantities: (amount: string) => void;
  setTxHash: (hash: string) => void;
  setPreviewURL: (url: string) => void;
}

type MintFormState = MintForm & MintFormActions;

const INITIAL_MINT_FORM_STATE: MintForm = {
  rawFile: null,
  txHash: "",
  previewURL: "",
  name: "",
  image: "",
  quantity: "",
  external_url: "https://cassavaland.io",
  attributes: [
    {
      trait_type: "",
      value: "",
    },
  ],
  showProperties: false,
  activeCollection: {
    name: "Cassava",
    address: "",
  },
  collections: [
    {
      name: "Cassava",
      address: "",
    },
  ],
  royalty: "",
  tokenId: "",
};

export const useStore = create<MintFormState>((set) => ({
  ...INITIAL_MINT_FORM_STATE,
  //Form actions
  //TODO: refactor with immer

  setRawFile: (file) => set({ rawFile: file }),
  setName: (name) => set({ name: name }),
  setImage: (image) => set({ image: image }),
  setExternalURL: (url) => set({ external_url: url }),
  setDescription: (description) => set({ description: description }),
  setAttributes: (attributes) => set({ attributes: attributes }),
  setShowProperties: () =>
    set((state) => ({ showProperties: !state.showProperties })),
  setActiveCollection: (collection) => set({ activeCollection: collection }),
  setCollections: (collections) => set({ collections: collections }),
  setRoyalty: (amount) => set({ royalty: amount }),
  setTokenId: (id) => set({ tokenId: id }),
  setQuantities: (amount) => set({ quantity: amount }),
  setTxHash: (hash) => set({ txHash: hash }),
  setPreviewURL: (url) => set({ previewURL: url }),
}));
