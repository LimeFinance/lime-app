import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
import { ConnectionContext } from "../../core/context/connectionContext";
import { useContracts } from "../../core/hooks/useContracts";
import { CardSlideContainer, InputGroup, SameLineFlex } from "./styles";
import BN from "bn.js";
import { AlertContext } from "../../core/context/alertContext";
import {
  fromWei,
  tokens,
  roundString,
  getPoolSizeBusd,
  addCommasToNumber,
  requestUpdate,
} from "../../core/utils";
import Button from "../Button";
import Input from "../Input";
import { useInterval } from "../../core/hooks/useInterval";
import { HarvestingContext } from "../../core/context/harvestingContext";
import { ADDRESSES, DAY_SECONDS, DEFAULT_NET, PROVIDER_URL } from "../../core/constants";
import Skeleton from "react-loading-skeleton";
import Web3 from "web3";
import pools from "../../core/pools";
import { IPool } from "../../core/typescript/interfaces";

interface CardSlideProps {
  show: boolean;
  pool: IPool;
  unit: string;
}

const CardSlide: FC<CardSlideProps> = ({ show, pool, unit }) => {
  const [userStake, setUserStake] = useState<null | string>(null);
  const [userLemons, setUserLemons] = useState<null | string>(null);
  const [securedLime, setSecuredLime] = useState<null | string>(null);
  const [poolSizeBusd, setPoolSizeBusd] = useState<undefined | BN>();
  const [amountToWithdraw, setAmountToWithdraw] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { status, nextHarvestingDate } = useContext(HarvestingContext);
  const [, pushAlert] = useContext(AlertContext);
  const [{ address }] = useContext(ConnectionContext);
  const { tokenFarm } = useContracts();

  const _fetchData = async () => {
    if (address && address.length === 42) {
      try {
        const stake = await tokenFarm.methods.userStakeInPool(pool.index).call({ from: address });
        const lemons = await tokenFarm.methods
          .userAvailableHarvest(pool.index)
          .call({ from: address });
        const _securedLime = await tokenFarm.methods
          .userDebtInPool(pool.index)
          .call({ from: address });

        console.log(_securedLime);
        setSecuredLime(_securedLime);
        setUserStake(stake);
        setUserLemons(new BN(lemons).sub(new BN(_securedLime)).toString());
      } catch (e) {
        console.error(e);
        pushAlert({
          type: "error",
          message: "Could not retrieve user information",
        });
        setUserStake("0");
        setUserLemons("0");
      }
    } else {
      setUserStake("0");
      setUserLemons("0");
    }
  };

  const _withdrawTokens = async () => {
    setLoading(true);
    try {
      await tokenFarm.methods
        .withdrawTokens(tokens(amountToWithdraw), pool.index)
        .send({ from: address });
      await requestUpdate(pool.index);
      pushAlert({ type: "success", message: "Withdrawal completed" });
    } catch (e) {
      console.error(e);
      pushAlert({ type: "error", message: "Couldn't withdraw tokens" });
    }
    setLoading(false);
  };

  const _harvestTokens = async () => {
    setLoading(true);
    try {
      await tokenFarm.methods.harvestLimes(pool.index).send({ from: address });
      pushAlert({ type: "success", message: "Harvest completed" });
    } catch (e) {
      console.error(e);
      pushAlert({ type: "error", message: "Couldn't withdraw tokens" });
    }
    setLoading(false);
  };

  const _setCheckpoint = async () => {
    setLoading(true);
    try {
      await tokenFarm.methods.checkpoint(pool.index).send({ from: address });

      pushAlert({ type: "success", message: "Checkpoint set successfully" });
    } catch (e) {
      console.error(e);
      pushAlert({ type: "error", message: "Couldn't set checkpoint" });
    }
    setLoading(false);
  };

  const getPoolSize = async () => {
    const res = await getPoolSizeBusd(
      new Web3(PROVIDER_URL),
      { ...pool, ...pools[pool.index] },
      ADDRESSES[DEFAULT_NET]
    );
    setPoolSizeBusd(res);
  };

  useEffect(() => {
    _fetchData();
    getPoolSize();
  }, [address]);

  useInterval(_fetchData, 5000);
  useInterval(getPoolSize, 10000);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setAmountToWithdraw(e.target.value);

  const isHarvestingDisabled =
    loading || status === "loading" || +nextHarvestingDate! - +Date.now() > DAY_SECONDS;

  return (
    <CardSlideContainer show={show}>
      <SameLineFlex>
        <div>
          <span>Pool size</span>
          <h5>
            {poolSizeBusd ? (
              "$" + roundString(addCommasToNumber(fromWei(poolSizeBusd)), 2)
            ) : (
              <Skeleton />
            )}
          </h5>
        </div>
      </SameLineFlex>
      <SameLineFlex>
        <div>
          <span>Unsecured rewards (LIME):</span>
          <h5>{userLemons && roundString(fromWei(userLemons), 4)}</h5>
        </div>
        <Button disabled={isHarvestingDisabled} onClick={_harvestTokens}>
          {loading ? "Loading..." : "Harvest"}
        </Button>
      </SameLineFlex>
      <SameLineFlex>
        <div>
          <span>Secured rewards (LIME):</span>
          <h5>{securedLime ? roundString(fromWei(securedLime), 4) : "0"}</h5>
        </div>
      </SameLineFlex>

      <SameLineFlex>
        <div>
          <span>Stake amount:</span>
          <h5>
            {userStake && roundString(fromWei(userStake), 4)}
            {unit}
          </h5>
        </div>
        <InputGroup>
          <Input type="number" min="0" placeholder={unit} onChange={handleInputChange} />
          <Button
            type="outlined"
            disabled={
              !amountToWithdraw ||
              userStake === null ||
              new BN(tokens(amountToWithdraw)).gt(new BN(userStake)) ||
              loading
            }
            onClick={_withdrawTokens}
          >
            {loading ? "Loading..." : "Withdraw"}
          </Button>
        </InputGroup>
      </SameLineFlex>
      <Button
        fullWidth={true}
        onClick={_setCheckpoint}
        disabled={Number(userStake) <= 0 || loading}
      >
        {loading ? "Loading..." : "Checkpoint"}
      </Button>
    </CardSlideContainer>
  );
};

export default CardSlide;
