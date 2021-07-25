import { ReactComponent as BnbLemon } from "../assets/images/BNB-LIME.svg";
import { ReactComponent as BusdLemon } from "../assets/images/BUSD-LIME.svg";
import { ReactComponent as UsdtLemon } from "../assets/images/USDT-LIME.svg";
import { ReactComponent as Busd } from "../assets/images/BUSD.svg";
import { ReactComponent as Dai } from "../assets/images/DAI.svg";
import { ReactComponent as Usdt } from "../assets/images/USDT.svg";
import { IPoolMeta } from "./typescript/interfaces";

const pools: any[] = [
  {
    name: "BUSD/LIME LP",
    image: BusdLemon,
    isFeatured: true,
    tokenAddress: "0x72e5C6DfBef1E481E6FC11d14A4D743dAeB0A294",
  },
  {
    name: "BNB/LIME LP",
    image: BnbLemon,
    isFeatured: true,
    tokenAddress: "0x25426a3F652ef782de76CF89A82D7F6F6926BAB3",
    homepage: true,
  },
  {
    name: "USDT/LIME LP",
    image: UsdtLemon,
    isFeatured: false,
    tokenAddress: "0xf593C3336A5bf3D01464B79c932F0E127b6E395d",
    homepage: true,
  },
  {
    name: "BUSD",
    image: Busd,
    isFeatured: true,
    tokenAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
  },
  {
    name: "USDT",
    image: Usdt,
    isFeatured: false,
    tokenAddress: "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684",
  },
  {
    name: "DAI",
    image: Dai,
    isFeatured: false,
    tokenAddress: "0x8a9424745056eb399fd19a0ec26a14316684e274",
  },
];
export default pools;
