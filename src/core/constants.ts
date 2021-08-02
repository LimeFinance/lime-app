import BN from "bn.js";
export const PROVIDER_URL = "https://data-seed-prebsc-1-s2.binance.org:8545/"; // testnet for now
export const DEFAULT_NET = "testnet";
export const DAY_SECONDS = 86400;
export const ONE_ETHER = new BN("1000000000000000000");
export const LOTTERY_STATES = {
  0: "Open",
  1: "Closed",
  2: "Calculating winner",
};
export const ADDRESSES = {
  testnet: {
    limeToken: "0xAA6356866602cda84DaAB73E6cbBAf438A403625",
    tokenFarm: "0x2b02BBfb009a8bE49D9Aa7973b84200BD28dA08B",
    lottery: "0x9687289fA79b09bC2A33a429C3C2BcBf4a3976E2",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  local: {
    limeToken: "0x1309f30F07cC84E4625b53347aFddf7AB141bfa4",
    tokenFarm: "0xb63a63aF1492E4e5250F42b72Bb3AE639EF468b0",
    lottery: "0x2c3C6009d609EDC62380F948daa4368f7b3e452D",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  mainnet: {
    limeToken: "",
    tokenFarm: "",
    lottery: "0x520F20e419B0Bb86b6D633E17b9106E3A9268811",
    BUSD: "",
    pancakeRouter: "",
  },
  invalid: {
    limeToken: "",
    BUSD: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
    tokenFarm: "",
    lottery: "0x520F20e419B0Bb86b6D633E17b9106E3A9268811",
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
