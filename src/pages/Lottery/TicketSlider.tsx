import React, { FC, useState } from "react";
import { ReactComponent as Ticket } from "../../assets/images/Ticket.svg";
import { CountIndicator, TicketContent, TicketWrapper } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TicketSlider: FC<{ numbers: number[] }> = ({ numbers }) => {
  const [index, setIndex] = useState(0);

  const addIndex = () => {
    index + 1 < numbers.length && setIndex(index + 1);
  };

  const reduceIndex = () => {
    index - 1 >= 0 && setIndex(index - 1);
  };

  return (
    <TicketWrapper>
      <Ticket />
      <TicketContent>
        {index - 1 >= 0 ? (
          <FontAwesomeIcon icon={faArrowLeft} onClick={reduceIndex} />
        ) : (
          <span />
        )}
        <h2>{numbers[index]}</h2>
        {index + 1 < numbers.length ? (
          <FontAwesomeIcon icon={faArrowRight} onClick={addIndex} />
        ) : (
          <span />
        )}
      </TicketContent>
      <CountIndicator>
        {index + 1}/{numbers.length}
      </CountIndicator>
    </TicketWrapper>
  );
};

export default TicketSlider;
