import React, { useContext } from "react";
import { useState } from "react";
import { DAY_SECONDS } from "../../core/constants";
import { HarvestingContext } from "../../core/context/harvestingContext";
import { useInterval } from "../../core/hooks/useInterval";
import { ICountdown } from "../../core/typescript/interfaces";
import { CountdownCard, TimeUnit } from "./styles";
import Skeleton from "react-loading-skeleton";
import Flex from "../Flex";

const HarvestCountdown = () => {
  const { status, nextHarvestingDate } = useContext(HarvestingContext);

  const calculateTimeLeft = (): ICountdown | null => {
    if (status === "done") {
      const delta = +nextHarvestingDate! - +Date.now();
      let timeLeft;
      if (delta > DAY_SECONDS) {
        timeLeft = {
          days: Math.floor(delta / (1000 * 60 * 60 * 24)),
          hours: Math.floor((delta / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((delta / 1000 / 60) % 60),
          seconds: Math.floor((delta / 1000) % 60),
        };
        return timeLeft;
      }
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return null;
  };
  const [timeUntilHarvesting, setTimeUntilHarvesting] =
    useState<null | ICountdown>(calculateTimeLeft());

  useInterval(() => setTimeUntilHarvesting(calculateTimeLeft), 1000);

  return (
    <CountdownCard>
      {timeUntilHarvesting ? (
        <>
          <h4>Next harvesting period</h4>
          <Flex justifyContent="center">
            {Object.entries(timeUntilHarvesting).map(([unit, value], index) => (
              <TimeUnit key={index}>
                <h3>{value < 10 ? "0" + value.toString() : value}</h3>
                <span>{unit}</span>
              </TimeUnit>
            ))}
          </Flex>
        </>
      ) : (
        <div style={{ padding: "1em" }}>
          <h3>
            <Skeleton />
          </h3>
          <span>
            <Skeleton />
          </span>
        </div>
      )}
    </CountdownCard>
  );
};

export default HarvestCountdown;
