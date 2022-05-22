import type { Types } from "mongoose";

export interface CollectionCardProps {
  creator: {
    avatar: string;
    name: string;
    url: string;
    verified: boolean;
  };
  collection: {
    cover: string;
    name: string;
    url: string;
    verified: boolean;
    description: string;
  };
}

export interface NFTCardProps {
  creator: {
    avatar: string;
    name: string;
    url: string;
    verified: boolean;
  };
  collection: {
    avatar: string;
    name: string;
    url: string;
    verified: boolean;
  };
  owner?: {
    avatar: string;
    name: string;
    url: string;
    verified: boolean;
  };
  token: {
    image: string;
    name: string;
    url: string;
  };
  likes: {
    liked: boolean;
    count: number;
  };
}

export type MintFormCollection = {
  name: string;
  address: string;
};

export interface MintFormData {
  onSale: boolean;
  pricingModel: "Auction" | "Bid" | "BuyNow";
  price: string;
  reservedPrice: string;
  startTime: string;
  endTime: string;
  showProperties: boolean;
  collections: MintFormCollection[];
  activeCollection: MintFormCollection;
  royalty: number | string;
  tokenId: number | string;
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
  blockchain: string;
  token_id: string;
  image_uri: string;
  name: string;
  description?: string;
  external_link?: string;
  date_minted?: string;
  asset_collection: Types.ObjectId;
  traits: Trait[];
}

export interface AssetCollection {
  blockchain: string;
  address: string;
  name: string;
  symbol: string;
  description?: string;
  external_link?: string;
  // social_contacts?: SocialContacts;
  facebook?: string;
  twitter?: string;
  discord?: string;
  instagram?: string;
  telegram?: string;
  slug: string;
  total_supply?: string;
  banner_image_uri?: string;
  owner: Types.ObjectId;
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
  collection: AssetCollection;
  owner: Account;
}

export interface SocialContacts {
  facebook?: string;
  twitter?: string;
  discord?: string;
  instagram?: string;
  telegram?: string;
}
