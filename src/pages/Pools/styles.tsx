import styled from "styled-components";
import Card from "../../components/Card";
import Input from "../../components/Input";

export const PoolContainer = styled.section`
  grid-template-columns: repeat(auto-fit, minmax(365px, 1fr));
  grid-template-rows: 90px auto;
  justify-content: center;
  gap: 1em;
  row-gap: 2em;
  display: grid;
  flex-wrap: wrap;
  margin-top: 3em;

  @media (max-width: 1609px) {
    .dummy2 {
      display: none;
    }
  }
`;
export const Placeholder = styled(Card)`
  grid-column: span 1;
  height: 360px;
  padding: 1rem;
`;
export const TextPlaceholder = styled.h1`
  font-size: 6em;
  padding-top: 5px;
`;
export const Searchbar = styled(Input)`
  box-shadow: none;
  width: 100%;
  &:focus {
    box-shadow: none;
  }
`;
export const SearchContainer = styled.div`
  background-color: white;
  padding: 0 0.75rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  grid-column: span 1;
  box-shadow: 0px 1px 9px 3px rgba(228, 228, 228, 0.61);
  height: 55px;
  width: 100%;
  box-sizing: border-box;
  max-width: 475px;
  justify-self: center;
  > span {
    width: 100%;
  }
  svg {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.8;
  }
`;
