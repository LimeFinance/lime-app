import { useContext } from "react";
import { ConnectionContext } from "../../core/context/connectionContext";
import { useInterval } from "../../core/hooks/useInterval";
import { PriceContext } from "../../core/context/priceContext";
import { getPrice } from "../../core/utils";
import { ADDRESSES } from "../../core/constants";
import { useEffect } from "react";
import Web3 from "web3";
import BN from "bn.js";

const _fetchPrice = async (network: string, web3: Web3) => {
  const addresses =
    network !== "invalid" ? ADDRESSES[network] : ADDRESSES.testnet;
  return getPrice(web3, addresses.limeToken, addresses);
};

const _updatePrice = async (
  setPrice: React.Dispatch<React.SetStateAction<BN>>,
  network: string,
  web3: Web3
) => {
  try {
    const price = await _fetchPrice(network, web3);
    setPrice(price);
  } catch (e) {
    console.error(e);
  }
};
const PriceUpdater = () => {
  const [{ web3, network }] = useContext(ConnectionContext);
  const [, setPrice] = useContext(PriceContext);

  useEffect(() => {
    _updatePrice(setPrice, network, web3);
  }, [network, setPrice, web3]);

  useInterval(() => _updatePrice(setPrice, network, web3), 10000);

  return null;
};

export default PriceUpdater;
