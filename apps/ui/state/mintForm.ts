import create from "zustand";
import type { MintFormData, TokenMetaData } from "@cassavaland/sdk";

type MintForm = MintFormData &
  TokenMetaData & { rawFile: File | null; previewURL: string; txHash: string };

interface MintFormActions {
  setRawFile: (file: File) => void;
  setName: (name: string) => void;
  setImage: (image: string) => void;
  setExternalURL: (url: string) => void;
  setDescription: (description: string) => void;
  setAttributes: (attributes: TokenMetaData["attributes"]) => void;
  setOnsale: () => void;
  setPricingModel: (pricing: MintFormData["pricingModel"]) => void;
  setShowProperties: () => void;
  setActiveCollection: (collection: MintFormData["activeCollection"]) => void;
  setCollections: (collections: MintFormData["collections"]) => void;
  setRoyalty: (amount: string) => void;
  setTokenId: (id: string) => void;
  setStartTime: (timestamp: string) => void;
  setStopTime: (timestamp: string) => void;
  setReservePrice: (amount: string) => void;
  setPrice: (amount: string) => void;
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
  external_url: "https://cassavaland.io",
  attributes: [
    {
      trait_type: "",
      value: "",
    },
  ],
  onSale: false,
  pricingModel: "Bid",
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
  royalty: 10,
  tokenId: 1,
  startTime: "1",
  endTime: "120",
  reservedPrice: "0.05",
  price: "0.1",
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
  setOnsale: () => set((state) => ({ onSale: !state.onSale })),
  setPricingModel: (pricing) => set({ pricingModel: pricing }),
  setShowProperties: () =>
    set((state) => ({ showProperties: !state.showProperties })),
  setActiveCollection: (collection) => set({ activeCollection: collection }),
  setCollections: (collections) => set({ collections: collections }),
  setRoyalty: (amount) => set({ royalty: amount }),
  setTokenId: (id) => set({ tokenId: id }),
  setStartTime: (timestamp) => set({ startTime: timestamp }),
  setStopTime: (timestamp) => set({ endTime: timestamp }),
  setReservePrice: (amount) => set({ reservedPrice: amount }),
  setPrice: (amount) => set({ price: amount }),
  setTxHash: (hash) => set({ txHash: hash }),
  setPreviewURL: (url) => set({ previewURL: url }),
}));
