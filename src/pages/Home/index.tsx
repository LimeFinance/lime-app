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
  Ad,
} from "./styles";
import BN from "bn.js";
import { ConnectionContext } from "../../core/context/connectionContext";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { useContracts } from "../../core/hooks/useContracts";
import { addCommasToNumber, fromWei, roundString } from "../../core/utils";
import { useEffect } from "react";
import { PriceContext } from "../../core/context/priceContext";
import FeaturedCard from "./FeaturedCard";
import firebase from "../../core/initFirebase";
import { DEFAULT_NET, ONE_ETHER } from "../../core/constants";
import CountdownText from "./countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Lime } from "../../assets/images/logo.svg";

const Home = () => {
  const [stats] = useDocument(
    firebase
      .firestore()
      .collection("networks")
      // @ts-ignore
      .doc(DEFAULT_NET !== "mainnet" ? "testnet" : "mainnet")
      .collection("stats")
      .doc("main")
  );
  const [poolCollection, loadingPools, poolsError] = useCollection(
    firebase
      .firestore()
      .collection("networks")
      // @ts-ignore
      .doc(DEFAULT_NET !== "mainnet" ? "testnet" : "mainnet")
      .collection("pools")
  );

  const [{ address }] = useContext(ConnectionContext);
  const { tokenFarm, limeToken } = useContracts();
  const [lemonPrice] = useContext(PriceContext);

  const [harvestAmount, setHarvestAmount] = useState<undefined | BN>();
  const [balance, setBalance] = useState<undefined | BN>();
  const [busdBalance, setBusdBalance] = useState<undefined | number>();
  const [totalPools, setTotalPools] = useState<undefined | number>();
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
    let mounted = true;
    if (!loadingPools && !poolsError && poolCollection && mounted) fetchEverything();
    return () => {
      mounted = false;
    };
  }, [address, lemonPrice, poolCollection]);

  return (
    <div style={{ minHeight: "130vh" }}>
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
            <span>worth of LIME</span>
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
        <Ad>
          <Lime />
          <h2>
            <span>Presale</span>
            <CountdownText />
          </h2>
          <a href="https://app.unicrypt.network/amm/pancake-v2/ilo/0x5fed2ba0bef64a95c5e5f4be544af32e0360054e">
            <FontAwesomeIcon icon={faAngleDoubleRight} size={"sm"} /> Check it out
          </a>
        </Ad>
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
    </div>
  );
};

export default Home;
