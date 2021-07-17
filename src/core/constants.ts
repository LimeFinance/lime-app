import BN from "bn.js";
export const PROVIDER_URL = "http://localhost:8545"; //"https://data-seed-prebsc-1-s1.binance.org:8545/"; // testnet for now
export const DEFAULT_NET = "local";
export const DAY_SECONDS = 86400;
export const ONE_ETHER = new BN("1000000000000000000");
export const ADDRESSES = {
  testnet: {
    lemonToken: "0x3288E58d1ca2d217A863bE27c00453c718AceD56",
    tokenFarm: "0xcA8DEC5d6B015d571e3f4c2Ba37c98d94475A0c7",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  local: {
    lemonToken: "0x3288E58d1ca2d217A863bE27c00453c718AceD56",
    tokenFarm: "0xcA8DEC5d6B015d571e3f4c2Ba37c98d94475A0c7",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  mainnet: {
    lemonToken: "",
    tokenFarm: "",
    BUSD: "",
    pancakeRouter: "",
  },
  invalid: {
    lemonToken: "",
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
