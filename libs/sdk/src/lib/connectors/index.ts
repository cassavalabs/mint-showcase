import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { ALL_SUPPORTED_CHAIN_IDS } from "../constants/chains";
import { NETWORK_URLS } from "../constants/chain-info";
import { getLibrary } from "../utils/get-library";

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 4, //connect to rinkeby by default;
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.getProvider));
}
