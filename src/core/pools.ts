import { ReactComponent as BnbLime } from "../assets/images/BNB-LIME.svg";
import { ReactComponent as BusdLime } from "../assets/images/BUSD-LIME.svg";
import { ReactComponent as BnbBusd } from "../assets/images/BNB-BUSD.svg";
import { ReactComponent as DaiBusd } from "../assets/images/DAI-BUSD.svg";

import { ReactComponent as Busd } from "../assets/images/BUSD.svg";
import { ReactComponent as Cake } from "../assets/images/CAKE.svg";
import { ReactComponent as Eth } from "../assets/images/ETH.svg";
import { ReactComponent as Bnb } from "../assets/images/BNB.svg";
import { ReactComponent as Lime } from "../assets/images/LIME.svg";

const pools: any[] = [
  {
    name: "BNB/LIME LP",
    image: BnbLime,
    isFeatured: true,
  },
  {
    name: "BUSD/LIME LP",
    image: BusdLime,
    isFeatured: true,
  },
  {
    name: "BNB/BUSD LP",
    image: BnbBusd,
    isFeatured: false,
  },
  {
    name: "DAI/BUSD LP",
    image: DaiBusd,
    isFeatured: false,
  },
  {
    name: "LIME",
    image: Lime,
    isFeatured: true,
  },
  {
    name: "WBNB",
    image: Bnb,
    isFeatured: true,
  },
  {
    name: "BUSD",
    image: Busd,
    isFeatured: true,
  },
  {
    name: "ETH",
    image: Eth,
    isFeatured: false,
  },
  {
    name: "CAKE",
    image: Cake,
    isFeatured: false,
  },
];
export default pools;
