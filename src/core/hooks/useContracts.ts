import { Contract } from "web3-eth-contract";
import { useContext } from "react";
import { ConnectionContext } from "../context/connectionContext";
import { abi as TokenAbi } from "../../assets/contracts/LimeToken.json";
import { abi as FarmAbi } from "../../assets/contracts/TokenFarm.json";
import { AbiItem } from "web3-utils";
import { ADDRESSES, DEFAULT_NET } from "../constants";

interface useContractsReturnValue {
  tokenFarm: Contract;
  lemonToken: Contract;
  getBep20: (address: string) => Contract;
}
export const useContracts = (): useContractsReturnValue => {
  const [{ web3, network }] = useContext(ConnectionContext);
  let net = network;
  if (network === "invalid") net = DEFAULT_NET;

  const getBep20 = (address: string) => {
    return new web3.eth.Contract(TokenAbi as AbiItem[], address);
  };

  return {
    lemonToken: new web3.eth.Contract(TokenAbi as AbiItem[], ADDRESSES[net].lemonToken),
    tokenFarm: new web3.eth.Contract(FarmAbi as AbiItem[], ADDRESSES[net].tokenFarm),
    getBep20,
  };
};
