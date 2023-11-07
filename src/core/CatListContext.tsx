import { createContext } from "react";
import { Cat } from "./interface";

interface CatListContextProps {
  cats: Cat[] | null,
}

const CatListContext = createContext<CatListContextProps>({
  cats: null,
});

export default CatListContext;
