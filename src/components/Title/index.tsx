import styled from "styled-components";

export default styled.h2`
  text-align: center;
  margin-top: 3.5%;
  margin-bottom: 0.35rem;
  span {
    color: ${(props) => props.theme.colors.toned};
  }
`;
