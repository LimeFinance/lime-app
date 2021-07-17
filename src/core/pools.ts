import { ReactComponent as BnbLemon } from "../assets/images/BNB-LIME.svg";
import { ReactComponent as BusdLemon } from "../assets/images/BUSD-LIME.svg";
import { ReactComponent as UsdtLemon } from "../assets/images/USDT-LIME.svg";
import { ReactComponent as Busd } from "../assets/images/BUSD.svg";
import { IPoolMeta } from "./typescript/interfaces";

const pools: IPoolMeta[] = [
  {
    name: "BUSD/LIME LP",
    image: BusdLemon,
    isFeatured: true,
    tokenAddress: "0xCBBFd09FC03F34495D00c79c206B38ea82D08757",
  },
  {
    name: "BNB/LIME LP",
    image: BnbLemon,
    isFeatured: true,
    tokenAddress: "0x5312a579eE43c8074a0Ea81b56BF4d47843D8eDD",
    homepage: true,
  },
  {
    name: "USDT/LIME LP",
    image: UsdtLemon,
    isFeatured: false,
    tokenAddress: "0x162d343f7C008e85ABdA134Ac9817e9b22058374",
    homepage: true,
  },
  {
    name: "BUSD",
    image: Busd,
    isFeatured: true,
    tokenAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
  },
];
export default pools;
