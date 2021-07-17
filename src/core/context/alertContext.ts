import { createContext, Dispatch, SetStateAction } from "react";
import { IAlert } from "../typescript/interfaces";

export const AlertContext = createContext<
  [IAlert | null, Dispatch<SetStateAction<IAlert | null>>]
>([null, () => {}]);
