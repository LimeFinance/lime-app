import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "./core/style/theme";
import GlobalStyle from "./core/style/globalStyle";
import Home from "./pages/Home";
import Pools from "./pages/Pools";
import Farm from "./pages/Farm";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import { ConnectionContext } from "./core/context/connectionContext";
import Web3 from "web3";
import { AlertContext } from "./core/context/alertContext";
import Alert from "./components/Alert";
import { PROVIDER_URL, DEFAULT_NET, DAY_SECONDS } from "./core/constants";
import PriceUpdater from "./components/PriceUpdater";
import {
  IConnectionInfo,
  IAlert,
  IHarvestingContext,
} from "./core/typescript/interfaces";
import { PriceContext } from "./core/context/priceContext";
import BN from "bn.js";
import { HarvestingContext } from "./core/context/harvestingContext";
import Lottery from "./pages/Lottery";
import { ThemeSetterContext } from "./core/context/themeSetterContext";

const App = () => {
  const [web3, setWeb3] = useState<IConnectionInfo>({
    web3: new Web3(PROVIDER_URL),
    network: DEFAULT_NET,
    address: "",
  });
  const [alert, pushAlert] = useState<IAlert | null>(null);
  const [price, setPrice] = useState<BN | null>(null);
  const [theme, setTheme] = useState<typeof lightMode | typeof darkMode>(
    lightMode
  );
  const [harvestingContext, setHarvestingContext] =
    useState<IHarvestingContext>({
      status: "loading",
      nextHarvestingDate: null,
    });

  const getNextHarvestingDate = async () => {
    const _web3 = new Web3(PROVIDER_URL);
    const blockNumber = await _web3.eth.getBlockNumber();
    const block = await _web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp;

    if (typeof timestamp === "string") return;

    const r = (timestamp + DAY_SECONDS * 2) % (DAY_SECONDS * 14);
    if (r < DAY_SECONDS) {
      setHarvestingContext({ status: "done", nextHarvestingDate: new Date() });
      return;
    }
    const a = DAY_SECONDS * 14;
    const nextHarvesting = new Date((timestamp + (a - r)) * 1000);
    setHarvestingContext({
      status: "done",
      nextHarvestingDate: nextHarvesting,
    });
  };

  useEffect(() => {
    getNextHarvestingDate();
  }, []);

  const toggleTheme = () => {
    if (theme === lightMode) {
      setTheme(darkMode);
    } else {
      setTheme(lightMode);
    }
  };

  return (
    <ThemeSetterContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <ConnectionContext.Provider value={[web3, setWeb3]}>
          <AlertContext.Provider value={[alert, pushAlert]}>
            <PriceContext.Provider value={[price, setPrice]}>
              <HarvestingContext.Provider value={harvestingContext}>
                <PriceUpdater />
                <Router>
                  <GlobalStyle />
                  <Navbar />
                  {alert && <Alert message={alert.message} type={alert.type} />}
                  <Container>
                    <Switch>
                      <Route path={"/"} exact={true}>
                        <Home />
                      </Route>
                      <Route path={"/pools/"} exact={true}>
                        <Pools />
                      </Route>
                      <Route path={"/farm/"} exact={true}>
                        <Farm />
                      </Route>
                      <Route path={"/lottery/"} exact={true}>
                        <Lottery />
                      </Route>
                    </Switch>
                  </Container>
                </Router>
              </HarvestingContext.Provider>
            </PriceContext.Provider>
          </AlertContext.Provider>
        </ConnectionContext.Provider>
      </ThemeProvider>
    </ThemeSetterContext.Provider>
  );
};

export default App;
