import React, { useContext } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  TitleWithPadding,
  MainGrid,
  StatsCard,
  UserInfoCard,
  StatsContainer,
  Stat,
} from "./styles";
import BN from "bn.js";
import { ConnectionContext } from "../../core/context/connectionContext";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { IPool, IPoolMeta, IPoolWithMeta } from "../../core/typescript/interfaces";
import { useContracts } from "../../core/hooks/useContracts";
import { addCommasToNumber, fromWei, roundString } from "../../core/utils";
import { useEffect } from "react";
import { PriceContext } from "../../core/context/priceContext";
import FeaturedCard from "./FeaturedCard";
import firebase from "../../core/initFirebase";
import { DEFAULT_NET, ONE_ETHER } from "../../core/constants";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "@google-cloud/firestore";

const Home = () => {
  const [stats, loadingStats, statsError] = useDocument(
    firebase.firestore().collection("networks").doc(DEFAULT_NET).collection("stats").doc("main")
  );
  const [poolCollection, loadingPools, poolsError] = useCollection(
    firebase.firestore().collection("networks").doc(DEFAULT_NET).collection("pools")
  );

  const [{ address, network }] = useContext(ConnectionContext);
  const { tokenFarm, limeToken, getBep20 } = useContracts();
  const [lemonPrice] = useContext(PriceContext);

  const [harvestAmount, setHarvestAmount] = useState<undefined | BN>();
  const [balance, setBalance] = useState<undefined | BN>();
  const [busdBalance, setBusdBalance] = useState<undefined | number>();
  const [totalPools, setTotalPools] = useState<undefined | number>();
  const [hottestPool, setHottestPool] = useState<undefined | string>();
  const [featuredPools, setFeaturedPools] = useState<undefined | any>();

  const _fetchHarvests = async () => {
    if (!lemonPrice || !address) return;
    let lemons = new BN(0);
    const _balance = new BN(await limeToken.methods.balanceOf(address).call());
    setBalance(_balance);
    for (const pool of poolCollection.docs) {
      if (address) {
        const res = await tokenFarm.methods.userAvailableHarvest(pool.id).call({ from: address });
        lemons = lemons.add(new BN(res));
      }
    }
    const totalBusd = _balance.add(lemons).div(ONE_ETHER).mul(lemonPrice);
    setHarvestAmount(lemons);
    setBusdBalance(Number(fromWei(totalBusd)));
  };

  const fetchEverything = async () => {
    setTotalPools(poolCollection.docs.length);
    await _fetchHarvests();
    setFeaturedPools(poolCollection.docs.filter((p) => p.data().homepage));

    if (!address) {
      setBalance(new BN(0));
      setBusdBalance(0);
      setHarvestAmount(new BN(0));
      return;
    }
  };

  useEffect(() => {
    if (!loadingPools && !poolsError && poolCollection) fetchEverything();
  }, [address, lemonPrice, poolCollection]);

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
              <h2>
                {stats ? (
                  "$" + addCommasToNumber(roundString(stats.data().tvl.toString(), 2))
                ) : (
                  <Skeleton />
                )}
              </h2>
              <span>Total Value Locked (TVL)</span>
            </Stat>
            <Stat>
              <h4>{stats ? totalPools : <Skeleton />}</h4>
              <span>Pools and farms</span>
            </Stat>
            <Stat>
              <h4>{stats ? stats.data().hottestPool.name : <Skeleton />}</h4>
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
