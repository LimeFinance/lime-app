import Web3 from "web3";
import BN from "bn.js";
import PancakeRouter from "../assets/contracts/PancakeRouter.json";
import { AbiItem } from "web3-utils";
import { ADDRESSES, ONE_ETHER } from "./constants";
import { IPool, IPoolWithMeta } from "./typescript/interfaces";
import IPancakePair from "@pancakeswap-libs/pancake-swap-core/build/IPancakePair.json";

export const sqrt = (a: BN): BN => {
  let res = new BN(0);
  if (a.gt(new BN(3))) {
    res = a;
    let x = a.div(new BN(2)).add(new BN(1));
    while (x.lt(res)) {
      res = x;
      x = a.div(x).add(x).div(new BN(2));
    }
  } else if (!a.eq(new BN(0))) {
    res = new BN(1);
  }
  return res;
};

export const fromWei = (amount: BN | string) => {
  return new Web3().utils.fromWei(amount);
};
export const tokens = (amount: string) => {
  return new Web3().utils.toWei(amount);
};
export const roundString = (chars: string, amountChars: number): string => {
  if (chars.length < amountChars || !chars.includes(".")) {
    return chars;
  }
  const firstDecimals = chars.split(".")[1].slice(0, amountChars);

  return chars.split(".")[0] + "." + firstDecimals;
};

export const getPrice = async (
  web3: Web3,
  tokenAddress: string,
  addresses: typeof ADDRESSES["testnet"]
): Promise<BN> => {
  const pancakeContract = new web3.eth.Contract(
    PancakeRouter as AbiItem[],
    addresses.pancakeRouter
  );

  if (tokenAddress.toLowerCase() === addresses.BUSD.toLowerCase()) return ONE_ETHER;

  const amountsOut = await pancakeContract.methods
    .getAmountsOut(tokens("1"), [tokenAddress, addresses.BUSD])
    .call();

  return new BN(amountsOut[1]);
};

export const getPoolSizeBusd = async (
  web3: Web3,
  pool: IPoolWithMeta,
  addresses: typeof ADDRESSES["testnet"]
): Promise<BN> => {
  const poolSize = new BN(pool.poolSize);
  if (pool.name.includes("LP")) {
    const lpToken = new web3.eth.Contract(IPancakePair.abi as AbiItem[], pool.token);
    const tokenA = await lpToken.methods.token0().call();
    const tokenB = await lpToken.methods.token1().call();
    const priceA = await getPrice(web3, tokenA, addresses);
    const priceB = await getPrice(web3, tokenB, addresses);
    const totalReserves = await lpToken.methods.getReserves().call();
    const totalSupply = await lpToken.methods.totalSupply().call();
    const tokenPriceCumulative = sqrt(priceA.mul(priceB));
    const tokenReserveCumulative = sqrt(new BN(totalReserves[0]).mul(new BN(totalReserves[1])));
    const lpTokenPrice = tokenReserveCumulative
      .mul(tokenPriceCumulative)
      .div(new BN(totalSupply))
      .mul(new BN(2));

    return poolSize.mul(lpTokenPrice);
  } else {
    const tokenPrice = new BN(fromWei(await getPrice(web3, pool.token, addresses)));
    return poolSize.mul(tokenPrice);
  }
};

export const addCommasToNumber = (num: string): string => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getApr = (limePerBlock: BN, lemonPriceNormal: BN, poolSize: BN): BN => {
  const BLOCKS_IN_A_YEAR = new BN(10512000);
  if (poolSize.eq(new BN(0))) return limePerBlock.mul(BLOCKS_IN_A_YEAR).mul(lemonPriceNormal);
  return limePerBlock.mul(BLOCKS_IN_A_YEAR).mul(lemonPriceNormal).div(poolSize);
};
