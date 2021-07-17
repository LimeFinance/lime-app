import styled, { css } from "styled-components";

const Button = styled.button<{
  disabled?: boolean;
  fullWidth?: boolean;
  type?: any;
}>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.disabled
      : props.type === "outlined"
      ? "#ffffff"
      : props.theme.colors.primary};
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  border-radius: 5px;
  font-size: 1rem;
  color: white;
  outline: none;
  border: none;
  padding: 0.75em 1.25em;
  font-family: "Avenir";
  box-shadow: 0px 6px 14px rgba(219, 219, 219, 0.25);
  cursor: pointer;
  transition: 300ms;

  &:disabled,
  &[disabled="disabled"] {
    cursor: initial;
  }
  &:hover {
    opacity: 0.8;
    box-shadow: none;
  }

  ${(props) =>
    props.type === "outlined" &&
    !props.disabled &&
    css`
      color: ${props.theme.colors.primary};
      border: 2px solid ${props.theme.colors.primary};
      &:hover {
        opacity: 1 !important;
        background-color: ${props.theme.colors.primary};
        color: white;
      }
    `}
`;

export default Button;
