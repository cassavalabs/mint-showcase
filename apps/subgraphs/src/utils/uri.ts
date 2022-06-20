import { BigInt } from "@graphprotocol/graph-ts";
export function replaceURI(uri: string, tokenId: BigInt): string {
  return uri.replaceAll("{id}", tokenId.toHex().slice(2).padStart(64, "0"));
}
