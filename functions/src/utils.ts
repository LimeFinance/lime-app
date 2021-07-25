import BN from "bn.js";
import { AbiItem } from "web3-utils";
import { ADDRESSES, DEFAULT_NET, ONE_ETHER } from "./constants";
import { pancakeRouter } from "./contracts";
import { IPool } from "./interfaces";
import IPancakePair from "./abis/IPancakePair.json";
import { web3 } from "./contracts";

const addresses = ADDRESSES[DEFAULT_NET];

const sqrt = (a: BN): BN => {
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
export const tokens = (amount: string) => {
  return web3.utils.toWei(amount);
};
export const fromTokens = (amount: string | BN) => {
  return web3.utils.fromWei(amount);
};
export const getPrice = async (tokenAddress: string): Promise<BN> => {
  if (tokenAddress.toLowerCase() === addresses.BUSD.toLowerCase()) return ONE_ETHER;

  const amountsOut = await pancakeRouter.methods
    .getAmountsOut(tokens("1"), [tokenAddress, addresses.BUSD])
    .call();

  return new BN(amountsOut[1]);
};

export const getPoolSizeBusd = async (pool: IPool, isLp: boolean): Promise<BN> => {
  const poolSize = new BN(pool.poolSize);
  if (isLp) {
    const lpToken = new web3.eth.Contract(IPancakePair as AbiItem[], pool.token);
    const tokenA = await lpToken.methods.token0().call();
    const tokenB = await lpToken.methods.token1().call();
    const priceA = await getPrice(tokenA);
    const priceB = await getPrice(tokenB);
    const totalReserves = await lpToken.methods.getReserves().call();
    const totalSupply = await lpToken.methods.totalSupply().call();
    const tokenPriceCumulative = sqrt(priceA.mul(priceB));
    const tokenReserveCumulative = sqrt(new BN(totalReserves[0]).mul(new BN(totalReserves[1])));
    const lpTokenPrice = tokenReserveCumulative
      .mul(tokenPriceCumulative)
      .div(new BN(totalSupply))
      .mul(new BN(2));

    return poolSize.mul(lpTokenPrice).div(ONE_ETHER);
  } else {
    const tokenPrice = new BN(await getPrice(pool.token));
    return poolSize.mul(tokenPrice).div(ONE_ETHER);
  }
};

export const getApr = (pool: IPool, limePrice: BN): BN => {
  const { limePerBlock, poolSize } = pool;
  const limePerBlockBN = new BN(limePerBlock);
  const poolSizeBN = new BN(poolSize);
  const BLOCKS_IN_A_YEAR = new BN(10512000);
  if (poolSizeBN.eq(new BN(0))) return limePerBlockBN.mul(BLOCKS_IN_A_YEAR).mul(limePrice);
  return limePerBlockBN.mul(BLOCKS_IN_A_YEAR).mul(limePrice).div(poolSizeBN);
};
