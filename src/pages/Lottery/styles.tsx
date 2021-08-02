import styled, { css } from "styled-components";
import Button from "../../components/Button";
import breakpoint from "styled-components-breakpoint";

export const OverlayDiv = styled.div<{ show: boolean }>`
  opacity: 0;
  background-color: ${(props) => props.theme.colors.text};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 300ms;
  ${(props) =>
    props.show &&
    css`
      opacity: 0.6;
      z-index: 1;
    `}
`;

export const BackgroundContainer = styled.div`
  overflow: hidden;
  max-width: 100vw;
  z-index: -1;
  position: absolute;
  left: 0;
  top: calc(-1 * 17vh);
  width: 100%;
  height: 130%;
  > svg {
    position: absolute;
    min-width: 1500px;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export const Hero = styled.div`
  display: grid;
  padding: 2.5%;
  grid-template-columns: 1fr;
  // gap: 1em;
  position: relative;
  bottom: 5%;
  text-align: center;
  br {
    display: none;
  }
  ${breakpoint("tablet")`
    br{
      display:inline;
    }
    bottom:0%;
    grid-template-columns: 1fr 1fr;
    text-align:left;
    gap:0;
    padding: 7.5%;
  `}
`;

export const HeroSvgWrapper = styled.section`
  width: 275px;
  margin: auto;
  grid-row: 1;
  align-self: center;
  ${breakpoint("tablet")`
    margin:unset;
    grid-column:2;
    width: auto;
    max-width: 480px;
  `}
  path {
    animation: float 6s ease-in-out infinite;
  }
  .floating-star {
    animation: float-ext 6s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(5px, -5px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
  @keyframes float-ext {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(10px, -10px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
`;

export const HeroText = styled.section`
  grid-column: 1;
  padding-top: 2.5%;
  > * {
    position: relative;
    bottom: 1rem;
    ${breakpoint("tablet")`
      bottom:0;
    `}
  }
  h1 {
    max-width: 500px;
    font-size: 2.252rem;
    line-height: 1.195;
    margin: auto;
    span {
      color: ${(props) => props.theme.colors.toned};
    }
    ${breakpoint("tablet")`
      margin: unset;
      font-size:3.052rem; 
    `}
    ${breakpoint("desktop")`
    `}
  }
  h5 {
    font-size: 0.95rem;
    font-family: "Avenir-regular";
    margin-bottom: 0.25rem;
    ${breakpoint("tablet")`
      font-size:1.25rem;
      margin-bottom: 0.5rem;
    `}
  }
  h3 {
    font-size: 1.55rem;
    margin-top: 0;
    margin-bottom: 0.85rem;
    > span {
      display: inline-block;
      margin-right: 0.35em;
      width: 5em;
    }
    ${breakpoint("tablet")`
      font-size:1.953rem;
    `}
  }
`;

export const CTA = styled(Button)`
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.toned};
  padding: 1rem 2.5rem;
`;

export const StatsFlex = styled.section`
  padding: 1em 0em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${breakpoint("tablet")`
    padding: 4.5em 0;
    justify-content: space-between;
  `}
`;

export const Stat = styled.div`
  display: flex;
  margin: 0 2rem;
  align-items: center;
  h5 {
    opacity: 0.85;
  }

  > svg {
    color: ${(props) => props.theme.colors.toned};
    margin-bottom: 0.25rem;
    margin-right: 0.75rem;
  }
`;

export const Popup = styled.div<{ show: boolean }>`
  display: none;
  overflow: hidden;
  ${(props) =>
    props.show &&
    css`
      display: block;
    `}
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 220px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 2.25em 2.75em;
  z-index: 2;
  max-width: 97.5vw;

  ${breakpoint("tablet")`
    min-width: 270px;
    max-width: 400px;
  `}

  h3 {
    text-align: center;
    span {
      color: ${(props) => props.theme.colors.toned};
    }
  }
  input {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1em;
  }
  > p {
    padding-top: 1.5rem;
  }
  > button {
    margin-top: 1rem;
  }
`;

export const Label = styled.label`
  font-family: "Avenir";
  display: block;
  text-align: center;
  font-size: 1.05rem;
  padding-bottom: 0.75rem;
`;
export const NormalText = styled.p`
  font-family: "Avenir-regular";
  margin: 0;
  max-width: 270px;
`;

export const SameLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85em 0;
`;

export const TicketWrapper = styled.div`
  position: relative;
  max-width: 300px;
`;
export const TicketContent = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;

  > svg {
    cursor: pointer;
  }
  > span{
    display:inline-block;
    width: 16px;
  }

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox *
`;

export const CountIndicator = styled.span`
  font-family: "Avenir-regular";
  position: absolute;
  bottom: 0.85rem;
  left: 50%;
  transform: translateX(-50%);
`;
