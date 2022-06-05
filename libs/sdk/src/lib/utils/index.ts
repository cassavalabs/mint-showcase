import { getAddress } from "@ethersproject/address";
import axios from "axios";
import { SupportedChainId } from "../constants/chains";
import { EXPLORER_URLS } from "../constants/chain-info";
import { SUBSCAN_API } from "../constants/subscan";
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

export function walletNameId(address: string): string {
  const parsed = isAddress(address);

  if (!parsed) {
    return address;
  }

  return `${parsed.substring(2, 7).toUpperCase()}`;
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
        uri: `https://ipfs.io/ipfs/${hash}/`,
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

type ExplorerDataTypes = "account" | "block" | "tx";

export function getExplorerURL(
  chainId: SupportedChainId,
  data: string,
  type: ExplorerDataTypes
) {
  switch (type) {
    case "account":
      return `${EXPLORER_URLS[chainId]}/account/${data}`;

    case "block":
      return `${EXPLORER_URLS[chainId]}/block/${data}`;

    case "tx":
      return `${EXPLORER_URLS[chainId]}/extrinsic/${data}`;

    default:
      return EXPLORER_URLS[chainId];
  }
  // return `${EXPLORER_URLS[chainId]}/${type}/${data}`;
}

interface GetContractDeployer {
  address: string;
  // block_num: number;
  // contract_name: string;
  // deploy_at: number;
  deployer: string;
  verify_status: string;
}
export const getContractDeployer = async (
  chainId: number,
  contractAddress: string
) => {
  const fetch = await axios.post(`${SUBSCAN_API[chainId]}/contracts`, {
    contracts: [contractAddress],
  });

  if (!fetch.data) {
    return null;
  }

  const data: GetContractDeployer = {
    address: fetch.data.data[0].address,
    deployer: fetch.data.data[0].deployer,
    verify_status: fetch.data.data[0].verify_status,
  };

  return data;
};

export const slugify = (text: string, suffix?: number) => {
  let slug = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  slug = suffix ? slug + "-" + suffix : slug;

  return slug;
};

export const filterNull = (obj: any) => {
  for (const key of Object.keys(obj)) {
    if (!obj[key]) {
      obj[key] = "";
    }
  }
  return obj;
};

export const filterOutNull = (obj: any) => {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (obj[key]) {
      result[key] = obj[key];
    }
  }
  return result;
};
