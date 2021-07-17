import React from "react";
import { Placeholder, TextPlaceholder } from "./styles";
import Skeleton from "react-loading-skeleton";

const Skeletons = () => {
  const amounts = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {amounts.map((num) => (
        <Placeholder key={num}>
          <TextPlaceholder>
            <Skeleton />
          </TextPlaceholder>
          <h2>
            <Skeleton />
          </h2>
          <h4>
            <Skeleton />
          </h4>
          <h3>
            <Skeleton />
          </h3>
        </Placeholder>
      ))}
    </>
  );
};

export default Skeletons;
