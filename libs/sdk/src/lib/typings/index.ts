import type { Types } from "mongoose";

export type CollectionCardProps = Omit<AssetCollection, "owner"> & {
  owner?: Account;
  // created_at: string;
  // updated_at: string;
};

export interface NFTCardProps {
  token_id: string;
  collection_address: string;
  collection_name: string;
  blockchain: string;
  owner: string;
  value: TokenMetaData;
  totalNfts?: string;
}

export type MintFormCollection = {
  name: string;
  address: string;
};

export interface MintFormData {
  showProperties: boolean;
  collections: MintFormCollection[];
  activeCollection: MintFormCollection;
  royalty: string;
  tokenId: string;
  quantity: string;
}

export interface MetaDataAtribute {
  trait_type: string;
  value: string | number;
  display_type?: "boost_percentage" | "number";
}

export interface TokenMetaData {
  attributes?: MetaDataAtribute[];
  description?: string;
  external_url?: string;
  image: string;
  name: string;
}

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

/**
 * Database Model interfaces
 */

export interface Account {
  address: string;
  display_name?: string;
  username?: string;
  bio?: string;
  email?: string;
  avatar_uri?: string;
  banner_uri?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  discord?: string;
  telegram?: string;
  website?: string;
  verified?: boolean;
}

export interface Asset {
  token_id: string;
  image_uri: string;
  name: string;
  description?: string;
  external_link?: string;
  date_minted?: Date;
  asset_collection: Types.ObjectId;
  metadata_url: string;
  owner: string;
  // traits: Trait[];
}

export interface AssetCollection {
  blockchain: string;
  address: string;
  name: string;
  symbol: string;
  description?: string;
  external_link?: string;
  contract_standard?: string;
  // social_contacts?: SocialContacts;
  facebook?: string;
  twitter?: string;
  discord?: string;
  instagram?: string;
  telegram?: string;
  slug: string;
  total_supply?: string;
  banner_image_uri?: string;
  owner?: Types.ObjectId;
  // category: Types.ObjectId;
  verified?: boolean;
}

export interface Trait {
  asset_collection: Types.ObjectId;
  trait_type: string;
  value: string;
  display_type?: string;
}

export interface Favourite {
  account_id: Types.ObjectId;
  asset_id: Types.ObjectId;
}

export interface Category {
  title: string;
  description: string;
  slug: string;
  banner_image_uri?: string;
}

export interface AddCollectionPayload {
  blockchain: string;
  address: string;
  name?: string;
  symbol?: string;
  description?: string;
  external_link?: string;
  contract_standard?: string;
  owner: string;
  slug: string;
}

export interface SocialContacts {
  facebook?: string;
  twitter?: string;
  discord?: string;
  instagram?: string;
  telegram?: string;
}

export interface UserERC721Nfts {
  tokenId: string;
  metadataURL: string;
  nftContract: {
    id: string;
    name?: string;
    symbol?: string;
  };
}
