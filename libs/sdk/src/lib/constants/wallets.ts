import { injected } from "../connectors";

export interface WalletInfo {
  connector?: any;
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  disabled: boolean;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

//Only MetaMask supported at the moment

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconURL: "/metaMask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    disabled: false,
  },
};
