import React, { useContext, useState, useEffect } from "react";
import {
  Nav,
  LinkList,
  Address,
  PriceContainer,
  DesktopNav,
  SideMenuToggle,
  Overlay,
  MobileNav,
  MobileConnectButton,
} from "./styles";
import { Link } from "react-router-dom";
import Button from "../Button";
import { ConnectionContext } from "../../core/context/connectionContext";
import { AlertContext } from "../../core/context/alertContext";
import { PriceContext } from "../../core/context/priceContext";
import { fromWei, roundString } from "../../core/utils";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import Skeleton from "react-loading-skeleton";
import SideMenu from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { _connectToWeb3 } from "./web3connections";

const Navbar = () => {
  const [{ address: account, network }, setConnectionInfo] = useContext(ConnectionContext);
  const [loading, setLoading] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [, pushAlert] = useContext(AlertContext);
  const [price] = useContext(PriceContext);

  useEffect(() => {
    (async () => {
      if (!account) {
        setLoading(true);
        await _connectToWeb3(pushAlert, setConnectionInfo);
        setLoading(false);
      }
    })();
  }, [account, pushAlert, setConnectionInfo]);

  const toggleMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  const connectToWeb3 = () => {
    _connectToWeb3(pushAlert, setConnectionInfo);
  };

  return (
    <>
      <Nav>
        <DesktopNav>
          <PriceContainer>
            <Logo />
            <h5>{price ? roundString(fromWei(price), 5) + "$" : <Skeleton />}</h5>
          </PriceContainer>
          <LinkList>
            <Link to={"/"}>Home</Link>
            <Link to={"/pools/"}>Pools</Link>
            <Link to={"/farm/"}>Farm</Link>
            <Link to={"/lottery/"}>
              Lottery
              <FontAwesomeIcon icon={faExclamationCircle} />
            </Link>
            <Link to={"/audits/"}>Audits</Link>
            <Link to={"/guide/"}>Guide</Link>
          </LinkList>
          {account ? (
            <Address>
              {account.slice(0, 5)}...{account.slice(32, account.length)}
            </Address>
          ) : (
            <Button onClick={connectToWeb3} disabled={loading || network === "invalid"}>
              {loading && "Loading..."}
              {network === "invalid" && "Connect to BSC"}
              {!loading && network !== "invalid" && "Connect wallet"}
            </Button>
          )}
        </DesktopNav>
        <MobileNav>
          <SideMenuToggle>
            <FontAwesomeIcon icon={faBars} onClick={toggleMenu} size={"1x"} />
          </SideMenuToggle>

          {account ? (
            <Address>
              {account.slice(0, 5)}...{account.slice(32, account.length)}
            </Address>
          ) : (
            <MobileConnectButton
              onClick={connectToWeb3}
              disabled={loading || network === "invalid"}
            >
              {loading && "Loading..."}
              {network === "invalid" && "Connect to BSC"}
              {!loading && network !== "invalid" && "Connect wallet"}
            </MobileConnectButton>
          )}
        </MobileNav>
      </Nav>
      <Overlay show={showSideMenu} onClick={toggleMenu} />
      <SideMenu show={showSideMenu} lemonPrice={price} onDismiss={toggleMenu} />
    </>
  );
};

export default Navbar;
