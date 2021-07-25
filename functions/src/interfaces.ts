import BN from "bn.js";

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
  poolSizeBusd?: BN;
}
export interface IPoolWithMeta extends IPool, IPoolMeta {}
