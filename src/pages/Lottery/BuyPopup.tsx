import React, { FC, useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useContracts } from "../../core/hooks/useContracts";
import { fromWei } from "../../core/utils";
import { Label, NormalText, Popup, SameLine } from "./styles";
import Skeleton from "react-loading-skeleton";
import BN from "bn.js";
import { ConnectionContext } from "../../core/context/connectionContext";
import { ADDRESSES, ONE_ETHER } from "../../core/constants";
import { AlertContext } from "../../core/context/alertContext";
import { useStateSafe } from "../../core/hooks/useStateSafe";

interface BuyPopupProps {
  show: boolean;
  onDismiss: () => void;
  onBuyNumbers: (numbers: number[]) => void;
}

const BuyPopup: FC<BuyPopupProps> = ({ show, onDismiss, onBuyNumbers }) => {
  const [{ address, network }] = useContext(ConnectionContext);
  const [, pushAlert] = useContext(AlertContext);

  const [showPopup, setShowPopup] = useStateSafe(false);
  const [ticketPrice, setTicketPrice] = useStateSafe<undefined | number>();
  const [ticketPriceBN, setTicketPriceBN] = useStateSafe<undefined | BN>();
  const [userLimeBalance, setUserLimeBalance] = useStateSafe<BN>(new BN("0"));
  const [loading, setLoading] = useStateSafe<undefined | boolean>();
  const [generating, setGenerating] = useStateSafe<undefined | boolean>();
  const [approving, setApproving] = useStateSafe<undefined | boolean>();
  const [amountToBuy, setAmountToBuy] = useState<undefined | number>();
  const { lottery, limeToken } = useContracts();

  const fetchData = async () => {
    const ticketPriceBN = await lottery.methods.getTicketPrice().call();
    const _limeBalance = address && (await limeToken.methods.balanceOf(address).call());

    setTicketPrice(Number(fromWei(ticketPriceBN)));
    setTicketPriceBN(new BN(ticketPriceBN));
    address && setUserLimeBalance(new BN(_limeBalance));
  };

  const buyTickets = async () => {
    const randomNumbers = await generateRandom(amountToBuy - 1);

    try {
      setApproving(true);
      const tot = ticketPriceBN.mul(new BN(amountToBuy));
      await limeToken.methods.approve(ADDRESSES[network].lottery, tot).send({ from: address });

      setApproving(false);
      setLoading(true);
      await lottery.methods.buyTickets(randomNumbers).send({ from: address });
      pushAlert({
        type: "success",
        message: "Tickets bought successfully!",
      });
      onBuyNumbers(randomNumbers);
      onDismiss();
    } catch (e) {
      console.error(e);
      pushAlert({
        type: "error",
        message: "Couldn't buy tickets",
      });
    }
    setApproving(false);
    setLoading(false);
  };

  const generateRandom = async (amount: number): Promise<number[]> => {
    setGenerating(true);
    const res = [];
    while (res.length <= amount) {
      const randomNum = Math.floor(Math.random() * 100000);
      if (!(await lottery.methods.isNumberUsed(randomNum).call()) && !res.includes(randomNum)) {
        res.push(randomNum);
      }
    }
    setGenerating(false);
    return res;
  };

  const getButtonStatus = () => {
    if (generating) {
      return { enabled: false, text: "Generating numbers..." };
    }
    if (approving) {
      return { enabled: false, text: "Approving contract..." };
    }
    if (loading) {
      return { enabled: false, text: "Loading..." };
    }
    if (!amountToBuy) {
      return { enabled: false, text: "Pay" };
    }
    if (!address) {
      return { enabled: false, text: "Connect to wallet" };
    }
    if (amountToBuy && new BN(amountToBuy * ticketPrice).mul(ONE_ETHER).gt(userLimeBalance)) {
      return { enabled: false, text: "Not enough LIME" };
    }
    if (amountToBuy && amountToBuy > 49) {
      return { enabled: false, text: "Too many tickets" };
    }
    return { enabled: true, text: "Pay" };
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(show);
    }, 10);
  }, [show]);

  useEffect(() => {
    fetchData();
  }, [address]);

  return (
    <Popup show={showPopup}>
      <h3>
        <span>LIME</span> lottery
      </h3>
      <Label htmlFor="amt">Buy tickets (49 max.)</Label>
      <Input
        id="amt"
        placeholder={"Enter amount..."}
        min={0}
        max={49}
        type="tel"
        maxLength={2}
        value={amountToBuy}
        onChange={(e) => setAmountToBuy(Number(e.target.value))}
      />
      <SameLine>
        <NormalText>Ticket price:</NormalText>
        <NormalText>{ticketPrice ? ticketPrice : <Skeleton />} LIME</NormalText>
      </SameLine>
      <hr />
      <SameLine>
        <NormalText>Total:</NormalText>
        <NormalText>{amountToBuy ? ticketPrice * amountToBuy : 0} LIME</NormalText>
      </SameLine>
      <Button fullWidth={true} disabled={!getButtonStatus().enabled} onClick={buyTickets}>
        {getButtonStatus().text}
      </Button>
      <NormalText>Note: This will burn $LIME and automatically pick random numbers</NormalText>
    </Popup>
  );
};

export default BuyPopup;
