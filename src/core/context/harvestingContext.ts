import { createContext } from "react";
import { IHarvestingContext } from "../typescript/interfaces";

export const HarvestingContext = createContext<IHarvestingContext>({
  status: "loading",
  nextHarvestingDate: null,
});
