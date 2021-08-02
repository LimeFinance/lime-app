import React, { FC, useEffect, useState } from "react";
import { OverlayDiv } from "./styles";

const Overlay: FC<{ onClick: () => void }> = ({ onClick }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowOverlay(true);
    }, 10);
    return () => setShowOverlay(false);
  }, []);

  return <OverlayDiv show={showOverlay} onClick={onClick} />;
};

export default Overlay;
