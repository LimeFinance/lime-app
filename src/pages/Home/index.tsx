import React, { useContext } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  TitleWithPadding,
  MainGrid,
  StatsCard,
  UserInfoCard,
  FeaturedPool,
  StatsContainer,
  Stat,
  Placeholder,
} from "./styles";
import BN from "bn.js";
import { ConnectionContext } from "../../core/context/connectionContext";
import { IPool, IPoolWithMeta } from "../../core/typescript/interfaces";
import { useContracts } from "../../core/hooks/useContracts";
import {
  addCommasToNumber,
  fromWei,
  getApr,
  getPoolSizeBusd,
  getPrice,
  roundString,
  sqrt,
} from "../../core/utils";
import { ADDRESSES, ONE_ETHER, PROVIDER_URL } from "../../core/constants";
import { useEffect } from "react";
import { PriceContext } from "../../core/context/priceContext";
import Button from "../../components/Button";
import FeaturedCard from "./FeaturedCard";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import pools from "../../core/pools";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [{ address, network }] = useContext(ConnectionContext);
  const { tokenFarm, lemonToken, getBep20 } = useContracts();
  const [lemonPrice] = useContext(PriceContext);

  const [tvl, setTvl] = useState<undefined | BN>();
  const [harvestAmount, setHarvestAmount] = useState<undefined | BN>();
  const [balance, setBalance] = useState<undefined | BN>();
  const [busdBalance, setBusdBalance] = useState<undefined | number>();
  const [totalPools, setTotalPools] = useState<undefined | number>();
  const [hottestPool, setHottestPool] = useState<undefined | string>();
  const [featuredPools, setFeaturedPools] = useState<undefined | IPoolWithMeta[]>();

  const [allPools, setAllPools] = useState<undefined | IPoolWithMeta[]>();

  const addresses = network !== "invalid" ? ADDRESSES[network] : ADDRESSES.testnet;
  const web3 = new Web3(PROVIDER_URL);

  const _fetchPools = async () => {
    const rawPools: IPool[] = await tokenFarm.methods.getPools().call();
    const poolsWithMeta: IPoolWithMeta[] = rawPools.map((p, idx) => {
      return { ...p, ...pools[idx], index: idx };
    });
    setTotalPools(poolsWithMeta.length);
    setFeaturedPools(poolsWithMeta!.filter((p) => p.homepage));
    setAllPools(poolsWithMeta);
  };

  const _fetchPrices = async () => {
    try {
      let res = new BN(0);
      for (const pool of allPools!) {
        const poolSizeBusd = getPoolSizeBusd(web3, pool, addresses);
        res = res.add(await poolSizeBusd);
      }
      setTvl(res.div(ONE_ETHER));
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  const _fetchHarvests = async () => {
    let lemons = new BN(0);
    let _hottestPool: IPoolWithMeta | undefined = undefined;

    for (const pool of allPools!) {
      console.log("HOT", pool);
      if (address) {
        const res = await tokenFarm.methods
          .userAvailableHarvest(pool.index)
          .call({ from: address });
        lemons = lemons.add(new BN(res));
      }
      if (_hottestPool) {
        const currPoolSizeBusd = await getPoolSizeBusd(web3, pool, addresses);
        const hottestPoolSizeBusd = await getPoolSizeBusd(web3, _hottestPool, addresses);
        if (currPoolSizeBusd.gt(hottestPoolSizeBusd)) _hottestPool = pool;
      } else {
        _hottestPool = pool;
      }
    }
    setHottestPool(_hottestPool ? pools[_hottestPool.index].name : "");
    setHarvestAmount(lemons);
  };

  const _fetchBalances = async () => {
    if (!lemonPrice || !harvestAmount || !address!.length) return;
    const _balance = new BN(await lemonToken.methods.balanceOf(address).call());
    setBalance(_balance);
    const lemonPriceNumber = Number(fromWei(lemonPrice));
    const totalLemons = _balance.add(harvestAmount);
    const totalLemonsNumber = Number(fromWei(totalLemons));
    const totalBusd = lemonPriceNumber * totalLemonsNumber;
    setBusdBalance(totalBusd);
  };

  const fetchEverything = async () => {
    await _fetchPrices();
    await _fetchHarvests();
    if (!address) {
      setBalance(new BN(0));
      setBusdBalance(0);
      setHarvestAmount(new BN(0));
      return;
    }
    await _fetchBalances();
  };

  useEffect(() => {
    _fetchPools();
  }, []);

  useEffect(() => {
    if (allPools) fetchEverything();
  }, [address, lemonPrice, allPools]);

  return (
    <>
      <TitleWithPadding>
        <span>Lime</span> finance
      </TitleWithPadding>
      <MainGrid>
        <StatsCard>
          <h3>Your holdings</h3>
          <Stat>
            <h2>
              {typeof busdBalance === "number" ? (
                "$" + addCommasToNumber(roundString(busdBalance.toString(), 2))
              ) : (
                <Skeleton />
              )}
            </h2>
            <span>Estimated invested balance</span>
          </Stat>
          <Stat>
            <h4>{harvestAmount ? roundString(fromWei(harvestAmount), 2) : <Skeleton />}</h4>
            <span>LIME to harvest</span>
          </Stat>
          <Stat>
            <h4>{balance ? roundString(fromWei(balance), 2) : <Skeleton />}</h4>
            <span>LIME in wallet</span>
          </Stat>
        </StatsCard>
        <UserInfoCard>
          <h3>Reward stats</h3>

          <StatsContainer>
            <Stat>
              <h2>{tvl ? "$" + roundString(fromWei(tvl), 2) : <Skeleton />}</h2>
              <span>Total Value Locked (TVL)</span>
            </Stat>
            <Stat>
              <h4>{totalPools ? totalPools : <Skeleton />}</h4>
              <span>Pools and farms</span>
            </Stat>
            <Stat>
              <h4>{hottestPool ? hottestPool : <Skeleton />}</h4>
              <span>Hottest pool</span>
            </Stat>
          </StatsContainer>
        </UserInfoCard>
        <FeaturedCard
          pool={featuredPools && featuredPools[0]}
          loading={!(featuredPools && lemonPrice)}
          lemonPrice={lemonPrice}
        />
        <FeaturedCard
          pool={featuredPools && featuredPools[1]}
          loading={!(featuredPools && lemonPrice)}
          lemonPrice={lemonPrice}
        />
      </MainGrid>
    </>
  );
};

export default Home;
