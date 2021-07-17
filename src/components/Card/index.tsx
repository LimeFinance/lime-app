import styled from "styled-components";

export default styled.div<{ goldenShadow?: boolean }>`
  border-radius: 15px;
  box-shadow: ${(props) =>
    props.goldenShadow
      ? `0px 4px 10px 10px rgba(85, 251, 57, 0.25)`
      : `0px 6px 14px rgba(219, 219, 219, 0.25)`};

  background-color: #ffff;
`;
