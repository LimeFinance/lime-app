import React, { FC, useState } from "react";
import { IPool } from "../../core/typescript/interfaces";
import {
  StakingContainer,
  DetailsToggle,
  StakeInput,
  StakeInputGroup,
  CurrencyIndicator,
  InputHolder,
  CardContainer,
  PoolWrapper,
} from "./styles";
import pools from "../../core/pools";
import {
  fromWei,
  tokens,
  roundString,
  getApr,
  requestUpdate,
  addCommasToNumber,
} from "../../core/utils";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as TaxFreeLabel } from "../../assets/images/tax-free.svg";
import BN from "bn.js";
import { useContext } from "react";
import { PriceContext } from "../../core/context/priceContext";
import { AlertContext } from "../../core/context/alertContext";
import { useContracts } from "../../core/hooks/useContracts";
import { ConnectionContext } from "../../core/context/connectionContext";
import { useEffect } from "react";
import CardSlide from "./CardSlide";
import Skeleton from "react-loading-skeleton";

interface StakingCardProps {
  pool: IPool;
  poolIndex: number;
}

const StakingCard: FC<StakingCardProps> = ({ pool, poolIndex }) => {
  const [showCurrency, setShowCurrency] = useState(false);
  const [stakeAmountInput, setStakeAmountInput] = useState<undefined | string>();
  const [userTokenBalance, setUserTokenBalance] = useState<undefined | string>();
  const [showCardSlide, setShowCardSlide] = useState(false);

  const { getBep20, tokenFarm } = useContracts();
  const [loading, setLoading] = useState(false);
  const [{ network, address }] = useContext(ConnectionContext);
  const [, pushAlert] = useContext(AlertContext);
  const [lemonPrice] = useContext(PriceContext);

  const _toggleShowCurrency = () => {
    setShowCurrency(!showCurrency);
  };

  const _stakeTokens = async () => {
    setLoading(true);
    if (!stakeAmountInput) return;
    try {
      const bep20 = getBep20(pool.token);
      const amount = tokens(stakeAmountInput);
      await bep20.methods.approve(tokenFarm.options.address, amount).send({ from: address });
      await tokenFarm.methods.depositTokens(amount, poolIndex).send({ from: address });
      await requestUpdate(poolIndex);
      pushAlert({ type: "success", message: "Deposit completed successfully" });
    } catch (e) {
      console.error(e);
      pushAlert({ type: "error", message: "Couldn't stake tokens" });
    }

    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    const getBalance = async () => {
      if (!mounted) return;
      setLoading(true);
      try {
        const bep20 = getBep20(pool.token);
        const balance = await bep20.methods.balanceOf(address).call();
        setUserTokenBalance(balance);
      } catch (e) {
        console.error(e);
        pushAlert({ type: "error", message: "Couldn't retrieve balance" });
      }
      setLoading(false);
    };
    if (address) {
      getBalance();
    }
    return () => {
      mounted = false;
    };
  }, [address]);

  const limePerBlock = new BN(pool.limePerBlock);
  const poolSize = new BN(pool.poolSize !== "0" ? pool.poolSize : new BN(tokens("1")));
  const Image = pools[poolIndex].image;

  const handleStakeInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStakeAmountInput(e.target.value);
  };

  const toggleCardSlide = () => {
    setShowCardSlide(!showCardSlide);
  };

  const handleMaxClicked = () => {
    setStakeAmountInput(userTokenBalance ? roundString(fromWei(userTokenBalance), 2) : "0");
  };

  const isStakingDisabled =
    loading ||
    network === "invalid" ||
    !address ||
    !stakeAmountInput ||
    Number(stakeAmountInput) <= 0 ||
    Number(fromWei(userTokenBalance || "0")) < Number(stakeAmountInput);

  return (
    <CardContainer
      goldenShadow={pools[poolIndex].isFeatured}
      className={showCardSlide ? "expanded" : ""}
    >
      <StakingContainer>
        {pool.taxFree && <TaxFreeLabel />}
        {pools[poolIndex].name.includes("LP") ? (
          <div>{<Image />}</div>
        ) : (
          <PoolWrapper>{<Image />}</PoolWrapper>
        )}

        <span>{fromWei(pool.limePerBlock)} LIME per block</span>
        <h4>{pools[poolIndex].name}</h4>
        <h5>
          {lemonPrice ? (
            addCommasToNumber(roundString(fromWei(getApr(limePerBlock, lemonPrice, poolSize)), 2)) +
            "% APR"
          ) : (
            <Skeleton />
          )}
        </h5>

        <StakeInputGroup>
          <InputHolder>
            <StakeInput
              type="number"
              min="0"
              placeholder="Enter amount..."
              onFocus={_toggleShowCurrency}
              onBlur={_toggleShowCurrency}
              onChange={handleStakeInputChange}
              value={stakeAmountInput}
            />
            <CurrencyIndicator show={showCurrency} onClick={handleMaxClicked}>
              max
            </CurrencyIndicator>
          </InputHolder>
          <Button disabled={isStakingDisabled} onClick={_stakeTokens}>
            {loading ? "Loading..." : "Stake"}
          </Button>
        </StakeInputGroup>
        <DetailsToggle onClick={toggleCardSlide} rotateSvg={showCardSlide}>
          <FontAwesomeIcon icon={faAngleDoubleDown} size={"xs"} /> {showCardSlide ? "Hide" : "Show"}{" "}
          details
        </DetailsToggle>
      </StakingContainer>
      <CardSlide
        show={showCardSlide}
        pool={pool}
        unit={pools[poolIndex].name.includes("LP") ? "LP" : pools[poolIndex].name}
      />
    </CardContainer>
  );
};

export default StakingCard;
