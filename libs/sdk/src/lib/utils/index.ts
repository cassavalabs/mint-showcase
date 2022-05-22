import { getAddress } from "@ethersproject/address";
import { SupportedChainId } from "../constants/chains";
import { EXPLORER_URLS } from "../constants/chain-info";
import { MetaDataAtribute } from "../typings";

export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function validateDataMetaAttributes(attributes: MetaDataAtribute[]) {
  const result = attributes.filter((attribute) => {
    attribute.trait_type !== "" || attribute.value !== "";
  });

  return result;
}

export function decodeURI(uri: string) {
  const protocol = uri.split(":")[0].toLowerCase();

  switch (protocol) {
    case "data":
      return { protocol, uri };
    case "https":
      return { protocol, uri };
    case "http":
      return { protocol, uri: "https" + uri.substring(0, 4) };
    case "ipfs": {
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
      return {
        protocol,
        uri: `https://cloudflare-ipfs.com/ipfs/${hash}/`,
      };
    }
    case "ipns": {
      const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
      return {
        protocol,
        uri: `https://cloudflare-ipfs.com/ipns/${name}/`,
      };
    }
    case "ar": {
      const hash = uri.match(/^ar:(\/\/)?(.*)$/i)?.[2];
      return { protocol, uri: `https://arweave.net/${hash}` };
    }
    default: {
      return { protocol, uri };
    }
  }
}

type ExplorerDataTypes = "address" | "block" | "tx" | "token";

export function getExplorerURL(
  chainId: SupportedChainId,
  data: string,
  type: ExplorerDataTypes
) {
  return `${EXPLORER_URLS[chainId]}/${type}/${data}`;
}
