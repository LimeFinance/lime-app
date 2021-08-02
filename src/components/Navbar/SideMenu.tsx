import React, { FC } from "react";
import {
  MenuItem,
  MenuLinkList,
  MenuPriceContainer,
  SideMenuContainer,
  SocialContainer,
} from "./styles";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDonate,
  faTractor,
  faShieldAlt,
  faBook,
  faTimes,
  faMoneyBill,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";
import BN from "bn.js";
import { fromWei, roundString } from "../../core/utils";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { SOCIAL } from "../../core/constants";

interface SideMenuProps {
  show: boolean;
  lemonPrice: BN | null;
  onDismiss: () => void;
}
const SideMenu: FC<SideMenuProps> = ({ show, lemonPrice, onDismiss }) => {
  return (
    <SideMenuContainer show={show}>
      <FontAwesomeIcon icon={faArrowLeft} onClick={onDismiss} size={"sm"} />
      <MenuPriceContainer>
        <Logo />
        <h5>{lemonPrice ? "$" + roundString(fromWei(lemonPrice), 2) : <Skeleton />}</h5>
      </MenuPriceContainer>

      <MenuLinkList>
        <MenuItem>
          <NavLink to={"/"} activeClassName="active" exact={true} onClick={onDismiss}>
            <span>
              <FontAwesomeIcon icon={faHome} size={"lg"} />
            </span>
            Home
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/pools/"} activeClassName="active" onClick={onDismiss}>
            <span>
              <FontAwesomeIcon icon={faDonate} size={"lg"} />
            </span>
            Pools
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/farm/"} activeClassName="active" onClick={onDismiss}>
            <span>
              <FontAwesomeIcon icon={faTractor} size={"lg"} />
            </span>
            Farm
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/lottery/"} activeClassName="active" onClick={onDismiss}>
            <span>
              <FontAwesomeIcon icon={faMoneyBill} size={"lg"} />
            </span>
            Lottery
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/audits/"} activeClassName="active" onClick={onDismiss}>
            <span>
              <FontAwesomeIcon icon={faShieldAlt} size={"lg"} />
            </span>
            Audits
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/guide/"} activeClassName="active" onClick={onDismiss}>
            <span>
              <FontAwesomeIcon icon={faBook} size={"lg"} />
            </span>
            Guide
          </NavLink>
        </MenuItem>
      </MenuLinkList>
      <SocialContainer>
        <a href={SOCIAL.twitter.link}>
          <FontAwesomeIcon icon={faTwitter} />
          {SOCIAL.twitter.username}
        </a>
        <a href={SOCIAL.telegram.link}>
          <FontAwesomeIcon icon={faTelegram} />
          {SOCIAL.telegram.username}
        </a>
      </SocialContainer>
    </SideMenuContainer>
  );
};

export default SideMenu;
