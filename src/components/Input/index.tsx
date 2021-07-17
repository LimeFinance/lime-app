import styled from "styled-components";

export default styled.input`
  background-color: white;
  padding: 0.85rem 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 1px 9px 3px rgba(228, 228, 228, 0.61);
  transition: box-shadow 300ms;
  font-family: "Avenir-regular";
  font-size: 1rem;

  &:focus {
    border: none;
    outline: none;
    box-shadow: 0px 1px 9px 3px rgba(228, 228, 228, 0.91);
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
