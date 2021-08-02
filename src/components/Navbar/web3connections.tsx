import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { PROVIDER_URL, DEFAULT_NET } from "../../core/constants";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import Torus from "@toruslabs/torus-embed";

export const _refreshConnection = async (
  web3: Web3,
  pushAlert: (any) => void,
  setConnectionInfo: (any) => void
) => {
  let network: "mainnet" | "testnet" | "invalid" | "local";
  const chainId = await web3.eth.getChainId();

  if (chainId === 56) {
    network = "mainnet";
  } else if (chainId === 97) {
    network = "testnet";
  } else if (chainId === 1337) {
    network = "local";
  } else {
    network = "invalid";
  }

  let _account: null | string = null;

  if (network === "invalid") {
    pushAlert({
      type: "error",
      message: "Please connect to BSC to use the dApp",
    });
    web3 = new Web3(PROVIDER_URL);
  } else if (network === "mainnet") {
    pushAlert({
      type: "error",
      message: "Mainnet is not supported yet. Please switch to testnet.",
    });
    network = "invalid";
    web3 = new Web3(PROVIDER_URL);
  } else {
    _account = (await web3.eth.getAccounts())[0];
    pushAlert({
      type: "success",
      message: "Successfully connected",
    });
  }

  setConnectionInfo({
    web3,
    address: _account,
    network,
  });
};
export const _connectToWeb3 = async (
  pushAlert: (any) => void,
  setConnectionInfo: (any) => void
) => {
  const providerOptions = {
    /* See Provider Options Section */
    authereum: {
      package: Authereum,

      options: {
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        network: "binance",
      },
    },
    torus: {
      package: Torus,
      options: {
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        network: "binance",
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        network: "binance",
      },
    },
  };

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    network: "binance",
    providerOptions, // required
  });

  try {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    _refreshConnection(web3, pushAlert, setConnectionInfo);
    addProviderListeners(provider, web3, pushAlert, setConnectionInfo);
  } catch (e) {
    pushAlert({
      type: "error",
      message: "Could not connect",
    });
  }
};
export const addProviderListeners = (
  provider: any,
  web3: Web3,
  pushAlert: (any) => void,
  setConnectionInfo: (any) => void
) => {
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts: string[]) => {
    _refreshConnection(web3, pushAlert, setConnectionInfo);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", () => {
    _refreshConnection(web3, pushAlert, setConnectionInfo);
  });

  // Subscribe to provider connection
  provider.on("connect", () => {
    _refreshConnection(web3, pushAlert, setConnectionInfo);
  });

  // Subscribe to provider disconnection
  provider.on("disconnect", () => {
    setConnectionInfo({
      web3: new Web3(PROVIDER_URL),
      address: null,
      network: DEFAULT_NET,
    });

    pushAlert({
      type: "info",
      message: "Account disconnected",
    });
  });
};
