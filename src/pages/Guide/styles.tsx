import styled from "styled-components";

export const GuideContainer = styled.div`
  display: flex;
`;
export const GuideContent = styled.div``;

export const Navigation = styled.div`
  padding: 0 2rem;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
    font-family: "Avenir-Regular";
    font-size: 1.25rem;
  }
  .active a {
    font-family: "Avenir";
    font-weight: 900;
    font-size: 1.5rem;
  }
  ul {
    list-style: none;
  }
`;
