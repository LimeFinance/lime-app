import React from "react";
import styled from "styled-components";

export default styled.div<{
  alignItems?: "center" | "flex-end" | "flex-start";
  justifyContent?: "center" | "space-between" | "space-around" | "flex-end";
}>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;
