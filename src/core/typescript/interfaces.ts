import Web3 from "web3";

export interface IPool {
  limePerBlock: string;
  taxFree: boolean;
  token: string;
  poolSize: string;
  index: number;
}
export interface IPoolMeta {
  name: string;
  image: any;
  isFeatured: boolean;
  tokenAddress: string;
  homepage?: boolean;
}
export interface IPoolWithMeta extends IPool, IPoolMeta {}

export interface IConnectionInfo {
  web3: Web3;
  network: "mainnet" | "testnet" | "local" | "invalid";
  address: string | null;
}
export interface IAlert {
  message: string;
  type: "error" | "info" | "success";
}

export interface IHarvestingContext {
  status: "loading" | "done";
  nextHarvestingDate: Date | null;
}

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
