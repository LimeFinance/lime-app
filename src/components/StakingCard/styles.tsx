import styled, { css } from "styled-components";
import Input from "../Input";

export const CardContainer = styled.section<{
  goldenShadow?: boolean;
}>`
  border-radius: 15px;
  position: relative;
  transition: 300ms;
  max-width: 475px;
  justify-self: center;
  overflow: hidden;
  z-index: 0;
  box-shadow: ${(props) =>
    props.goldenShadow
      ? `0px 4px 18px 10px rgba(85, 251, 57, 0.25);`
      : `0px 6px 14px rgba(219, 219, 219, 0.25)`};
`;

export const PoolWrapper = styled.div`
  max-width: 27.5%;
  padding: 1rem 0.25rem;
`;

export const StakingContainer = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: white;

  padding: 1rem 1.5rem;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
  }
  span {
    font-family: "Avenir-regular";
    font-size: 0.9rem;
  }
  h4 {
    margin-top: 0.15rem;
    margin-bottom: 0.55rem;
  }
  h5 {
    margin-top: 0.25rem;
    margin-bottom: 0.85rem;
  }
`;
export const DetailsToggle = styled.span<{ rotateSvg: boolean }>`
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    opacity: 0.8;
  }
  svg {
    margin-right: 0.5rem;
    transition: 300ms;
    transform: rotate(-90deg);
  }
  ${(props) =>
    props.rotateSvg &&
    css`
      svg {
        transform: rotate(0deg);
      }
    `}
`;

export const StakeInputGroup = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;
export const CurrencyIndicator = styled.h6<{ show: boolean }>`
  font-size: 0.9rem;
  background-color: white;
  padding: 0.25rem 0.15rem;
  position: absolute;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
  right: 1.5rem;
`;
export const StakeInput = styled(Input)`
  position: relative;
  margin-right: 0.5rem;
  padding-right: 2.5rem;
  flex-grow: 1;
`;
export const InputHolder = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
`;
export const CardSlideContainer = styled.div<{ show: boolean }>`
  padding: 1.5rem !important;
  padding-top: 12.5% !important;
  position: relative;
  top: -7.5%;
  z-index: -1;

  transition: 300ms;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.light};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  span {
    font-family: "Avenir-regular";
    font-size: 0.9rem;
    margin-bottom: 0;
  }

  h5 {
    margin-top: 0;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  input {
    width: 25%;
    margin-right: 0.5rem;
  }
`;
export const SameLineFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;

  h5 {
    margin-bottom: 0.25em;
  }
  > div {
    &:first-child {
      width: 70%;
    }
  }
`;
