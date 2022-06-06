import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import axios from "axios";
import type { SupportedChainId } from "../constants/chains";
import type { TokenMetaData } from "../typings";
import { NETWORK_URLS } from "../constants/chain-info";
import { decodeURI } from ".";

const ERC721Abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        name: "from",
        type: "address",
      },
      {
        name: "to",
        type: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class GetMetadata {
  private contract: Contract;

  constructor(collectionAddress: string, chainId: SupportedChainId) {
    const provider = new JsonRpcProvider(NETWORK_URLS[chainId]);
    this.contract = new Contract(collectionAddress, ERC721Abi, provider);
  }

  async getTokenURI(tokenId: string) {
    const tokenURI: string = await this.contract.tokenURI(tokenId);
    const { protocol, uri } = decodeURI(tokenURI);

    if (!uri || !protocol) {
      return null;
    }

    return { protocol, uri };
  }

  static async decodeTokenURI(tokenURI: string): Promise<TokenMetaData | null> {
    const { protocol, uri } = decodeURI(tokenURI);

    if (!uri || !protocol) {
      return null;
    }

    const { data } = await axios(uri);

    if (!data) {
      return null;
    }

    const { uri: image } = decodeURI(data.image);

    const resp: TokenMetaData = {
      name: data.name,
      description: data.description,
      external_url: data.external_url ?? "",
      image,
      attributes: data.attributes,
    };

    return resp;
  }

  async getOwner(tokenId: string) {
    const owner: string = await this.contract.ownerOf(tokenId);

    if (!owner) {
      return null;
    }

    return owner;
  }

  async supportsInterface(interfaceId: string) {
    const res: boolean = await this.contract.supportsInterface(interfaceId);

    return res;
  }

  async transferFrom(from: string, to: string, tokenId: string) {
    const tx = await this.contract.transferFrom(from, to, tokenId);
    console.log(tx);
    return tx;
  }
}
