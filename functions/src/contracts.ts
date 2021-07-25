import * as functions from "firebase-functions";

import { ADDRESSES, DEFAULT_NET } from "./constants";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import RouterAbi from "./abis/PancakeRouter.json";
import { abi as TokenFarmAbi } from "./abis/TokenFarm.json";
import { abi as LimeTokenAbi } from "./abis/LimeToken.json";

const { provider } = functions.config().getblock;

export const web3 = new Web3(provider);

export const pancakeRouter = new web3.eth.Contract(
  RouterAbi as AbiItem[],
  ADDRESSES[DEFAULT_NET].pancakeRouter
);
export const tokenFarm = new web3.eth.Contract(
  TokenFarmAbi as AbiItem[],
  ADDRESSES[DEFAULT_NET].tokenFarm
);
export const limeToken = new web3.eth.Contract(
  LimeTokenAbi as AbiItem[],
  ADDRESSES[DEFAULT_NET].tokenFarm
);
