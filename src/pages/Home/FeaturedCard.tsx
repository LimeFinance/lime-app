import React from "react";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/Button";
import { IPoolWithMeta } from "../../core/typescript/interfaces";
import { roundString, fromWei, getApr, tokens } from "../../core/utils";
import { FeaturedPool, Placeholder } from "./styles";
import BN from "bn.js";
import { useHistory } from "react-router-dom";

interface FeaturedCardProps {
  loading: boolean;
  pool: IPoolWithMeta | undefined;
  lemonPrice: BN | null;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ loading, pool, lemonPrice }) => {
  const getImage = (Img: new () => React.Component<any, any>) => <Img />;
  const poolSize = pool
    ? new BN(pool.poolSize !== "0" ? pool.poolSize : new BN(tokens("1")))
    : null;
  const isPool = !pool?.name.includes("LP");
  const history = useHistory();

  const handleClick = () => {
    isPool ? history.push("/pools") : history.push("/farm");
  };

  return (
    <FeaturedPool>
      {!loading && pool ? (
        <>
          {getImage(pool.image)}
          <span>Featured {isPool ? "pool" : "farm"}</span>
          <h4>{pool.name}</h4>
          <h5>
            {roundString(
              fromWei(
                // @ts-ignore
                getApr(new BN(pool.limePerBlock), lemonPrice, poolSize)
              ),
              2
            )}
            % APR
          </h5>
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
