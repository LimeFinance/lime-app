import BN from "bn.js";
export const DAY_SECONDS = 86400;
export const ONE_ETHER = new BN("1000000000000000000");
export const DEFAULT_NET = "testnet";
export const ADDRESSES = {
  testnet: {
    limeToken: "0xf4eFa4A894616aAa8d02952F78CCF90e13870783",
    tokenFarm: "0xa93e77A64917bd74C75F2DC11191C887c0d3bBDe",
    lottery: "0x8bD0B15177B67676a3f27b7240FEfC8228f67108",
    BUSD: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
    pancakeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  },
  mainnet: {
    limeToken: "",
    tokenFarm: "",
    BUSD: "",
    pancakeRouter: "",
  },
};
