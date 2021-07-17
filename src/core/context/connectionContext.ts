import { createContext, Dispatch, SetStateAction } from "react";
import Web3 from "web3";
import { DEFAULT_NET, PROVIDER_URL } from "../constants";
import { IConnectionInfo } from "../typescript/interfaces";

export const ConnectionContext = createContext<
  [IConnectionInfo, Dispatch<SetStateAction<IConnectionInfo>>]
>([
  {
    web3: new Web3(PROVIDER_URL),
    address: "",
    network: DEFAULT_NET,
  },
  () => {},
]);
