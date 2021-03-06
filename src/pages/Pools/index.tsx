import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useContracts } from "../../core/hooks/useContracts";
import { IPool } from "../../core/typescript/interfaces";
import StakingCard from "../../components/StakingCard";
import { PoolContainer, Searchbar, SearchContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import poolMeta from "../../core/pools";
import HarvestCountdown from "../../components/HarvestCountdown";
import Skeletons from "./Skeletons";
import Fuse from "fuse.js";
import Skeleton from "react-loading-skeleton";

const Pools = () => {
  const [loading, setLoading] = useState(false);
  const [fuse, setFuse] = useState<undefined | Fuse<IPool>>();
  const [poolsSearched, setPoolsSearched] = useState<Fuse.FuseResult<IPool>[]>(
    []
  );
  const [pools, setPools] = useState<IPool[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { tokenFarm } = useContracts();

  useEffect(() => {
    if (fuse) {
      const result = fuse.search(searchInput);
      setPoolsSearched(result);
    }
  }, [searchInput, setSearchInput]);

  useEffect(() => {
    let mounted = true;
    const getPools = async () => {
      if (!mounted) return;
      setLoading(true);
      const _pools: IPool[] = await tokenFarm.methods.getPools().call();

      const allPools = _pools
        .map((pool, index) => {
          return { ...pool, ...poolMeta[index], index };
        })
        .filter((pool) => !pool.name.includes("LP"));

      const options = {
        keys: ["name"],
      };
      const _fuse = new Fuse(allPools, options);
      setFuse(_fuse);
      setPools(allPools);

      setLoading(false);
    };
    getPools();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearchChanged: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchInput(e.target.value);
  };

  return (
    <div style={{ minHeight: "130vh" }}>
      <Title>
        Staking <span>pools</span>
      </Title>
      <HarvestCountdown />
      <PoolContainer>
        <SearchContainer>
          {fuse && !loading ? (
            <>
              <FontAwesomeIcon icon={faSearch} />
              <Searchbar
                placeholder="Search pool..."
                value={searchInput}
                onChange={handleSearchChanged}
              />
            </>
          ) : (
            <Skeleton width={"100%"} />
          )}
        </SearchContainer>
        <div className="dummy1" />
        <div className="dummy2" />
        {!loading ? (
          searchInput || poolsSearched.length ? (
            poolsSearched.map(({ item: pool }) => (
              <StakingCard
                pool={pool}
                poolIndex={pool.index}
                key={pool.index}
              />
            ))
          ) : (
            pools.map((pool) => (
              <StakingCard
                pool={pool}
                poolIndex={pool.index}
                key={pool.index}
              />
            ))
          )
        ) : (
          <Skeletons />
        )}
      </PoolContainer>
    </div>
  );
};

export default Pools;
