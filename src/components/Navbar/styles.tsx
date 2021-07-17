import styled, { css } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Button from "../Button";

export const DesktopNav = styled.div`
  display: none;
  height: 83px;
  flex: 1;
  ${breakpoint("desktop")`
    padding: 0 15%;
    display:flex;
    padding: 0 10%;
	`}
  align-items: center;
  h5 {
    margin: 0 1.15rem 0 0;
  }
  button {
    margin-left: auto;
  }
`;
export const Nav = styled.nav`
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(219, 219, 219, 0.25);
  padding: 0 7.5%;
  margin-bottom: 2em;
  ${breakpoint("desktop")`
    padding:0;
    height:83px;
    margin-bottom:0;
  `}
`;

export const LinkList = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 2.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
  }
`;

export const Address = styled.h6`
  font-size: 0.75rem;
  margin: 0 0 0 auto;
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 0.5rem;
  border-radius: 15px;

  ${breakpoint("tablet")`
    font-size:1rem
  `}
`;
export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  // background-color: ${(props) => props.theme.colors.disabled};
  border-radius: 10px;
  padding: 0.25rem;
  margin-right: 1em;
  > svg {
    width: 30px;
    height: 30px;
    margin-right: 0.75rem;
  }
`;
export const SideMenuContainer = styled.div<{ show: boolean }>`
  position: fixed;
  width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  top: 0;
  height: 100%;
  z-index: 11;
  transition: 300ms;
  max-width: 450px;
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  > svg {
    position: absolute;
    right: 0;
    padding: 1em 1.4em;
  }
  ${(props) =>
    props.show &&
    css`
      width: 63%;
      ${breakpoint("tablet")`
        width:50% 
      `}
    `};
`;

export const MobileNav = styled.nav`
  ${breakpoint("desktop")`
    display:none;
	`}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;
export const SideMenuToggle = styled.div`
  svg {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const Overlay = styled.div<{ show: boolean }>`
  display: none;
  opacity: 0;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;

  background-color: ${(props) => props.theme.colors.background};

  ${(props) =>
    props.show &&
    css`
      opacity: 0.4;
      display: block;
    `};
`;
export const MobileConnectButton = styled(Button)`
  padding: 0.5rem;
`;
export const MenuPriceContainer = styled.div`
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;

  > svg {
    width: 2.15rem;
    padding-right: 0.5rem;
    padding-bottom: 0.25rem;
  }
`;
export const MenuLinkList = styled.ul`
  list-style: none;
`;
export const MenuItem = styled.li`
  span {
    width: 2.55em;
    display: inline-block;
  }
  a {
    display: inline-block;
    padding: 0.85rem 1.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.secondaryText};

    svg {
      color: ${(props) => props.theme.colors.secondaryText};
      padding-right: 1rem;
    }

    &.active {
      color: ${(props) => props.theme.colors.toned};
      svg {
        color: ${(props) => props.theme.colors.toned};
      }
    }
  }
`;
export const SocialContainer = styled.div`
  margin-top: auto;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  max-width: 200px;
  a {
    color: ${(props) => props.theme.colors.secondaryText};
    font-size: 0.85rem;
  }
`;
