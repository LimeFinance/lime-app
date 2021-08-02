import React from "react";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/Button";
import { roundString, addCommasToNumber } from "../../core/utils";
import { FeaturedPool, Placeholder } from "./styles";
import BN from "bn.js";
import { useHistory } from "react-router-dom";
import pools from "../../core/pools";

interface FeaturedCardProps {
  loading: boolean;
  pool: any | undefined;
  lemonPrice: BN | null;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ loading, pool }) => {
  const getImage = (Img: new () => React.Component<any, any>) => <Img />;
  const p = pool ? pool.data() : undefined;
  const history = useHistory();

  const handleClick = () => {
    !p.isLp ? history.push("/pools") : history.push("/farm");
  };

  return (
    <FeaturedPool>
      {!loading ? (
        <>
          {getImage(pools[pool.id].image)}
          <span>Featured {!p.isLp ? "pool" : "farm"}</span>
          <h4>{p.name}</h4>
          <h5>{p.apr && addCommasToNumber(roundString(p.apr, 2))}% APR</h5>
          <Button fullWidth={true} onClick={handleClick}>
            Stake
          </Button>
        </>
      ) : (
        <>
          <Placeholder>
            <Skeleton />
          </Placeholder>
          <span>
            <Skeleton />
          </span>
          <h4>
            <Skeleton />
          </h4>
        </>
      )}
    </FeaturedPool>
  );
};

export default FeaturedCard;
