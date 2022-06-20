/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface TransferExecutorInterface extends utils.Interface {
  functions: {
    "getWtfuelAddress()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "getWtfuelAddress"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getWtfuelAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getWtfuelAddress",
    data: BytesLike
  ): Result;

  events: {
    "TransferProxyUpdated(string,address)": EventFragment;
    "TransferToWTfuelExchange(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TransferProxyUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferToWTfuelExchange"): EventFragment;
}

export interface TransferProxyUpdatedEventObject {
  assetType: string;
  proxy: string;
}
export type TransferProxyUpdatedEvent = TypedEvent<
  [string, string],
  TransferProxyUpdatedEventObject
>;

export type TransferProxyUpdatedEventFilter =
  TypedEventFilter<TransferProxyUpdatedEvent>;

export interface TransferToWTfuelExchangeEventObject {
  user: string;
  amount: BigNumber;
}
export type TransferToWTfuelExchangeEvent = TypedEvent<
  [string, BigNumber],
  TransferToWTfuelExchangeEventObject
>;

export type TransferToWTfuelExchangeEventFilter =
  TypedEventFilter<TransferToWTfuelExchangeEvent>;

export interface TransferExecutor extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TransferExecutorInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getWtfuelAddress(
      overrides?: CallOverrides
    ): Promise<[string] & { wtfuelAddress: string }>;
  };

  getWtfuelAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getWtfuelAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "TransferProxyUpdated(string,address)"(
      assetType?: null,
      proxy?: null
    ): TransferProxyUpdatedEventFilter;
    TransferProxyUpdated(
      assetType?: null,
      proxy?: null
    ): TransferProxyUpdatedEventFilter;

    "TransferToWTfuelExchange(address,uint256)"(
      user?: string | null,
      amount?: null
    ): TransferToWTfuelExchangeEventFilter;
    TransferToWTfuelExchange(
      user?: string | null,
      amount?: null
    ): TransferToWTfuelExchangeEventFilter;
  };

  estimateGas: {
    getWtfuelAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getWtfuelAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
