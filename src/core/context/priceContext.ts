import { createContext, Dispatch, SetStateAction } from "react";
import BN from "bn.js";

export const PriceContext = createContext<
  [BN | null, Dispatch<SetStateAction<BN | null>>]
>([null, () => {}]);
