import { BigInt } from "@graphprotocol/graph-ts";

export const ZERO_BYTES_32_STRING =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

/* eslint-disable prefer-const */
export let ZERO_BIG_INT = BigInt.fromI32(0);
export let ONE_BIG_INT = BigInt.fromI32(1);
export let ZERO_BIG_DECIMAL = ZERO_BIG_INT.toBigDecimal();
export let ZERO_ADDRESS_STRING = "0x0000000000000000000000000000000000000000";
