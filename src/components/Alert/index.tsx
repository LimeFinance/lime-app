import React, { FC, useEffect, useState } from "react";
import { AlertContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Flex from "../Flex";
import { lightMode } from "../../core/style/theme";

interface AlertProps {
  // onDismiss?: () => void;
  message: string;
  type: "error" | "info" | "success";
}

const Alert: FC<AlertProps> = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);

    setTimeout(() => setShow(false), 2500);
  }, [message, type]);

  return (
    <AlertContainer show={show}>
      <Flex justifyContent="center">
        {type === "success" && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            size={"2x"}
            color={lightMode.colors.success}
          />
        )}
        {type === "error" && (
          <FontAwesomeIcon
            icon={faTimesCircle}
            size={"2x"}
            color={lightMode.colors.error}
          />
        )}
        {type === "info" && (
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"2x"}
            color={lightMode.colors.info}
          />
        )}
      </Flex>
      <h5>{message}</h5>
    </AlertContainer>
  );
};

export default Alert;
