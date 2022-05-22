/*eslint-disable prefer-const*/
import { BigInt } from "@graphprotocol/graph-ts";
import { TransferBatch, TransferSingle } from "../../generated/ERC1155/ERC1155";
import { Account, ERC1155NftContract } from "../../generated/schema";
import {
  loadAccount,
  loadERC1155Nft,
  loadERC1155Balance,
  loadERC1155Contract,
  ZERO_ADDRESS_STRING,
} from "../utils";

function registerTransfer(
  contract: ERC1155NftContract,
  from: Account,
  to: Account,
  id: BigInt,
  value: BigInt,
  timestamp: BigInt
): void {
  let token = loadERC1155Nft(contract, id);

  if (from.id == ZERO_ADDRESS_STRING) {
    let totalSupply = loadERC1155Balance(token, null);
    totalSupply.valueExact = totalSupply.valueExact.plus(value);
    totalSupply.value = totalSupply.valueExact.toBigDecimal();
    totalSupply.save();

    token.dateMinted = timestamp;
  } else {
    let balance = loadERC1155Balance(token, from);
    balance.valueExact = balance.valueExact.minus(value);
    balance.value = balance.valueExact.toBigDecimal();
    balance.save();
  }

  if (to.id == ZERO_ADDRESS_STRING) {
    let totalSupply = loadERC1155Balance(token, null);
    totalSupply.valueExact = totalSupply.valueExact.minus(value);
    totalSupply.value = totalSupply.valueExact.toBigDecimal();
    totalSupply.save();
  } else {
    let balance = loadERC1155Balance(token, to);
    balance.valueExact = balance.valueExact.plus(value);
    balance.value = balance.valueExact.toBigDecimal();
    balance.save();
  }
  token.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let contract = loadERC1155Contract(event.address);
  let from = loadAccount(event.params.from);
  let to = loadAccount(event.params.to);

  registerTransfer(
    contract,
    from,
    to,
    event.params.id,
    event.params.value,
    event.block.timestamp
  );
}

export function handleTransferBatch(event: TransferBatch): void {
  let contract = loadERC1155Contract(event.address);
  let from = loadAccount(event.params.from);
  let to = loadAccount(event.params.to);

  let ids = event.params.ids;
  let values = event.params.values;

  if (ids.length == values.length) {
    for (let i = 0; i < ids.length; ++i) {
      registerTransfer(
        contract,
        from,
        to,
        ids[i],
        values[i],
        event.block.timestamp
      );
    }
  }
}
