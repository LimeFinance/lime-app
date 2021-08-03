import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Card from "../../components/Card";
import Title from "../../components/Title";

export const TitleWithPadding = styled(Title)`
  margin-top: 1rem;
  padding: 1.5rem 0;
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);

  ${breakpoint("tablet")`
  grid-template-columns: repeat(12, minmax(40px, 1fr));
    grid-template-rows: repeat(7, 1fr);
  `}

  gap: 1.5em;
`;

export const StatsCard = styled(Card)`
  padding: 0.75rem 1.75rem;
  grid-column: 1/13;
  grid-row: span 3;

  ${breakpoint("tablet")`
    grid-column: 1/7;
    grid-row: 1/5;
  `}
`;
export const Stat = styled.div`
  padding-bottom: 1.25rem;
  padding-top: 0.5rem;

  h2 {
    margin: 0.15rem 0;
  }
  h4 {
    margin: 0.15rem 0;
  }
  span {
    font-family: "Avenir-regular";
  }
`;
export const UserInfoCard = styled(Card)`
  padding: 0.75rem 1.75rem;
  grid-column: 1/13;
  grid-row: span 3;
  ${breakpoint("tablet")`
    grid-column: 7/13;
    grid-row: 1/5;
  `}
`;
export const FeaturedPool = styled(Card)`
  grid-row: span 1;
  max-height: 252px;
  padding: 0.75rem 1.75rem;

  ${breakpoint("tablet")`
    grid-column: span 3;
    grid-row: span 3;
  `}

  @media (max-width: 1700px) {
    grid-column: span 4;
    grid-row: span 4;
  }

  @media (max-width: 1000px) {
    grid-column: span 6;
    grid-row: span 4;
  }
  @media (max-width: 737px) {
    grid-column: span 12;
  }

  svg {
    max-height: 77.5px;
    display: block;
    margin-right: auto;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  span {
    font-family: "Avenir-regular";
  }
  h4 {
    margin: 0.15rem 0;
  }
  h5 {
    margin-top: 0.65rem;
  }
`;
export const StatsContainer = styled.div``;
export const Placeholder = styled.div`
  height: 30%;
  width: 100%;
`;

export const Ad = styled.section`
  grid-row: span 4;
  grid-column: span 6;
`;
