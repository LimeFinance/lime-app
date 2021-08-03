import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Background } from "../../assets/images/Background.svg";
import { ReactComponent as LotterySvg } from "../../assets/images/Lottery.svg";
import {
  BackgroundContainer,
  CTA,
  Hero,
  HeroSvgWrapper,
  HeroText,
  Stat,
  StatsFlex,
} from "./styles";
import Overlay from "./Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faClock,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import BuyPopup from "./BuyPopup";
import { useContracts } from "../../core/hooks/useContracts";
import Skeleton from "react-loading-skeleton";
import { fromWei, roundString, trimAddress } from "../../core/utils";
import { useInterval } from "../../core/hooks/useInterval";
import { ConnectionContext } from "../../core/context/connectionContext";
import TicketSlider from "./TicketSlider";
import { ReactComponent as Bnb } from "../../assets/images/BNB-coin.svg";

const Lottery = () => {
  const { lottery } = useContracts();
  const [{ address }] = useContext(ConnectionContext);
  const [showPopup, setShowPopup] = useState(false);
  const [participants, setParticipants] = useState<undefined | number>();
  const [pot, setPot] = useState<undefined | string>();
  const [ticketsBought, setTicketsBought] = useState<undefined | number>();
  const [lotteryState, setLotteryState] = useState<undefined | string>();
  const [currWinner, setCurrWinner] = useState<any>();
  const [lastWonAmount, setLastWonAmount] = useState<undefined | string>();
  const [userNumbers, setUserNumbers] = useState<undefined | number[]>();

  const fetchData = async () => {
    setParticipants(
      Number(await lottery.methods.currLotteryParticipations().call())
    );
    setTicketsBought(
      Number(await lottery.methods.getTotalTicketsBought().call())
    );
    setPot(fromWei(await lottery.methods.getPot().call()));
    setLotteryState(await lottery.methods.lotteryState().call());
    setCurrWinner(await lottery.methods.currWinner().call());
    setLastWonAmount(await lottery.methods.lastWonAmount().call());
    if (address) {
      setUserNumbers(
        await lottery.methods.getUserNumbers().call({ from: address })
      );
    }
  };

  const handleBuyNumbers = (numbers: number[]) => {
    setUserNumbers(numbers);
  };

  const toggleOverlay = () => {
    setShowPopup(!showPopup);
  };

  useInterval(fetchData, 5000);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BackgroundContainer>
        <Background />
      </BackgroundContainer>
      {showPopup && <Overlay onClick={toggleOverlay} />}
      <BuyPopup
        onBuyNumbers={handleBuyNumbers}
        show={showPopup}
        onDismiss={toggleOverlay}
      />
      <Hero>
        <HeroText>
          {userNumbers?.length ? (
            <>
              <h1>
                You are participating in the
                <span> LIME </span>
                lottery!
              </h1>
              <TicketSlider numbers={userNumbers} />
              <h5>Current pot:</h5>
              <h3>
                {typeof pot !== "undefined" ? (
                  <>
                    {roundString(pot, 4)}
                    <Bnb />
                  </>
                ) : (
                  <Skeleton />
                )}
              </h3>
            </>
          ) : (
            <>
              <h1>
                {lotteryState === "0" && (
                  <>
                    Burn your <br />
                    <span> LIME </span>
                    and <br />
                    take the prize!
                  </>
                )}
                {lotteryState === "1" && "And the winner is..."}
                {lotteryState === "2" &&
                  "The lottery is calculating a winner..."}{" "}
                {!lotteryState && <Skeleton />}
              </h1>
              <h5>
                {lotteryState === "1" ? (
                  currWinner ? (
                    <>
                      Address <b>{trimAddress(currWinner.owner)}</b> with the
                      number <b>{currWinner.number}</b>!
                    </>
                  ) : (
                    <Skeleton />
                  )
                ) : (
                  "Current pot"
                )}
              </h5>
              <h3>
                {lotteryState === "1" && currWinner ? (
                  lastWonAmount ? (
                    fromWei(lastWonAmount) + "BNB won"
                  ) : (
                    <Skeleton />
                  )
                ) : typeof pot !== "undefined" ? (
                  <>
                    {roundString(pot, 4)}
                    <Bnb />
                  </>
                ) : (
                  <Skeleton />
                )}
              </h3>
              <CTA
                onClick={toggleOverlay}
                disabled={lotteryState && lotteryState === "1"}
              >
                {lotteryState && lotteryState === "1"
                  ? "Waiting for next lottery..."
                  : "Enter now"}
              </CTA>
            </>
          )}
        </HeroText>
        <HeroSvgWrapper>
          <LotterySvg />
        </HeroSvgWrapper>
      </Hero>

      <StatsFlex>
        <Stat>
          <FontAwesomeIcon icon={faUserFriends} size={"lg"} />
          <h5>
            <span>
              {typeof participants !== undefined ? participants : <Skeleton />}
            </span>{" "}
            participations
          </h5>
        </Stat>
        <Stat>
          <FontAwesomeIcon icon={faClock} size={"lg"} />
          <h5>
            <span>1d 2h 32m</span> left until draw
          </h5>
        </Stat>
        <Stat>
          <FontAwesomeIcon icon={faTicketAlt} size={"lg"} />
          <h5>
            <span>
              {typeof ticketsBought !== undefined ? (
                ticketsBought
              ) : (
                <Skeleton />
              )}
            </span>{" "}
            tickets bought
          </h5>
        </Stat>
      </StatsFlex>
    </>
  );
};

export default Lottery;
