import BN from "bn.js";
export const PROVIDER_URL =
  "https://bsc.getblock.io/testnet/?api_key=1c20dd60-abf3-4aa1-8b66-fa6e370fea30"; //"https://data-seed-prebsc-1-s1.binance.org:8545/"; // testnet for now
export const DEFAULT_NET = "testnet";
export const DAY_SECONDS = 86400;
export const ONE_ETHER = new BN("1000000000000000000");
export const ADDRESSES = {
  testnet: {
    limeToken: "0x52ef9EC14CbDe1DFBff66D9d92d11e57Eb3286aF",
    tokenFarm: "0x9Ce1CaBe11c6E404Dd9529128518F35B31cC48a3",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  local: {
    limeToken: "0x52ef9EC14CbDe1DFBff66D9d92d11e57Eb3286aF",
    tokenFarm: "0x9Ce1CaBe11c6E404Dd9529128518F35B31cC48a3",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  mainnet: {
    limeToken: "",
    tokenFarm: "",
    BUSD: "",
    pancakeRouter: "",
  },
  invalid: {
    limeToken: "",
    BUSD: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
    tokenFarm: "",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
};
export const SOCIAL = {
  twitter: {
    username: "@FinanceLime",
    link: "https://twitter.com/FinanceLime?s=09",
  },
  telegram: {
    username: "LimeFinace",
    link: "http://t.me/LimeFinance",
  },
};
