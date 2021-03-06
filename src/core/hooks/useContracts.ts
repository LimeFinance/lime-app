import { Contract } from "web3-eth-contract";
import { useContext } from "react";
import { ConnectionContext } from "../context/connectionContext";
import { abi as TokenAbi } from "../../assets/contracts/LimeToken.json";
import { abi as FarmAbi } from "../../assets/contracts/TokenFarm.json";
import { abi as LotteryAbi } from "../../assets/contracts/Lottery.json";
import { AbiItem } from "web3-utils";
import { ADDRESSES, DEFAULT_NET } from "../constants";

interface IUseContracts {
  tokenFarm: Contract;
  limeToken: Contract;
  lottery: Contract;
  getBep20: (address: string) => Contract;
}
export const useContracts = (): IUseContracts => {
  const [{ web3, network }] = useContext(ConnectionContext);
  let net = network;
  if (network === "invalid") net = DEFAULT_NET;

  const getBep20 = (address: string) => {
    return new web3.eth.Contract(TokenAbi as AbiItem[], address);
  };

  return {
    limeToken: new web3.eth.Contract(
      TokenAbi as AbiItem[],
      ADDRESSES[net].limeToken
    ),
    tokenFarm: new web3.eth.Contract(
      FarmAbi as AbiItem[],
      ADDRESSES[net].tokenFarm
    ),
    lottery: new web3.eth.Contract(
      LotteryAbi as AbiItem[],
      ADDRESSES[net].lottery
    ),
    getBep20,
  };
};
