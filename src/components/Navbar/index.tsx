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
import Web3Modal from "web3modal";
import Web3 from "web3";
import Authereum from "authereum";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AlertContext } from "../../core/context/alertContext";
import { PROVIDER_URL, DEFAULT_NET } from "../../core/constants";
import { PriceContext } from "../../core/context/priceContext";
import { fromWei, roundString } from "../../core/utils";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import Skeleton from "react-loading-skeleton";
import SideMenu from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [{ address: account, network }, setConnectionInfo] = useContext(ConnectionContext);
  const [loading, setLoading] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [, pushAlert] = useContext(AlertContext);
  const [price] = useContext(PriceContext);

  useEffect(() => {
    !account && _connectToWeb3();
  }, []);

  const _refreshConnection = async (web3: Web3) => {
    let network: "mainnet" | "testnet" | "invalid" | "local";
    const chainId = await web3.eth.getChainId();

    if (chainId === 56) {
      network = "mainnet";
    } else if (chainId === 97) {
      network = "testnet";
    } else if (chainId === 1337) {
      network = "local";
    } else {
      network = "invalid";
    }

    let _account: null | string = null;

    if (network === "invalid") {
      pushAlert({
        type: "error",
        message: "Please connect to BSC to use the dApp",
      });
      web3 = new Web3(PROVIDER_URL);
    } else {
      _account = (await web3.eth.getAccounts())[0];
      pushAlert({
        type: "success",
        message: "Successfully connected",
      });
    }

    setConnectionInfo({
      web3,
      address: _account,
      network,
    });
  };

  const addProviderListeners = (provider: any, web3: Web3) => {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      _refreshConnection(web3);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", () => {
      _refreshConnection(web3);
    });

    // Subscribe to provider connection
    provider.on("connect", () => {
      _refreshConnection(web3);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", () => {
      setConnectionInfo({
        web3: new Web3(PROVIDER_URL),
        address: null,
        network: DEFAULT_NET,
      });

      pushAlert({
        type: "info",
        message: "Account disconnected",
      });
    });
  };

  const _connectToWeb3 = async () => {
    setLoading(true);
    const providerOptions = {
      /* See Provider Options Section */
      authereum: {
        package: Authereum,

        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          },
          network: "binance",
        },
      },
      torus: {
        package: Torus,
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          },
          network: "binance",
        },
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          },
          network: "binance",
        },
      },
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      network: "binance",
      providerOptions, // required
    });

    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      _refreshConnection(web3);
      addProviderListeners(provider, web3);
    } catch (e) {
      pushAlert({
        type: "error",
        message: "Couldn't connect to wallet",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setShowSideMenu(!showSideMenu);
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
            <Link to={"/audits/"}>Audits</Link>
            <Link to={"/guide/"}>Guide</Link>
          </LinkList>
          {account ? (
            <Address>
              {account.slice(0, 5)}...{account.slice(32, account.length)}
            </Address>
          ) : (
            <Button onClick={_connectToWeb3} disabled={loading || network === "invalid"}>
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
              onClick={_connectToWeb3}
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
