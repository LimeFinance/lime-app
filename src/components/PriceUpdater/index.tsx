import React, { useContext } from "react";
import { ConnectionContext } from "../../core/context/connectionContext";
import { useInterval } from "../../core/hooks/useInterval";
import { PriceContext } from "../../core/context/priceContext";
import PancakeRouter from "../../assets/contracts/PancakeRouter.json";
import { AbiItem } from "web3-utils";
import { tokens, fromWei, getPrice } from "../../core/utils";
import { ADDRESSES } from "../../core/constants";
import BN from "bn.js";
import { useEffect } from "react";

const PriceUpdater = () => {
  const [{ web3, network }] = useContext(ConnectionContext);
  const [, setPrice] = useContext(PriceContext);

  const _fetchPrice = async () => {
    const addresses =
      network !== "invalid" ? ADDRESSES[network] : ADDRESSES.testnet;
    return getPrice(web3, addresses.lemonToken, addresses);
  };

  const _updatePrice = async () => {
    try {
      const price = await _fetchPrice();
      setPrice(price);
    } catch (e) {
      console.log("It errored out");
      console.error(e);
    }
  };
  useEffect(() => {
    _updatePrice();
  }, []);

  useInterval(_updatePrice, 10000);

  return null;
};

export default PriceUpdater;
