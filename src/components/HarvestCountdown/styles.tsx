import styled from "styled-components";
import Card from "../Card";

export const CountdownCard = styled(Card)`
  margin: 1.5em auto;
  max-width: 370px;
  padding: 0.05rem 1rem;
  > h4 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;
export const TimeUnit = styled.div`
  max-width: 17%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  padding-bottom: 1em;
  h3 {
    flex: 1;
    margin: 0;
    font-family: "Avenir-regular";
  }
  span {
    font-size: 0.65rem;
  }
`;
