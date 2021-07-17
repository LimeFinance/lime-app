import styled, { css } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Card from "../Card";

export const AlertContainer = styled(Card)<{ show: boolean }>`
  position: fixed;
  padding: 1.75em;
  z-index: 9;
  top: 10%;
  max-height: 120px;
  max-width: 300px;
  opacity: 0;
  right: 0%;
  transition: all 400ms;
  text-align: center;
  min-width: 200px;

  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      right: 50%;
      transform: translateX(50%);

      ${breakpoint("tablet")`
        right: 15%;
      `}
    `}

  h5 {
    margin-top: 0.85rem;
    margin-bottom: 0.5rem;
  }
`;
