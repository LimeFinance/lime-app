import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

const Container = styled.main`
  font-family: Avenir;
  min-height: 100vh;

  ${breakpoint("mobile")`
    padding: 0 2.5%;
  `}
  ${breakpoint("tablet")`
    padding: 0 5%;
  `}
  ${breakpoint("desktop")`
    padding: 0 15%;
  `}
`;

export default Container;
