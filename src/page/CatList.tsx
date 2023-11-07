import { useContext } from "react";
import CatListContext from "../core/CatListContext";

function CatList() {

  const { cats } = useContext(CatListContext);

  return (
    <div>
      <h1>ねこですよろしくおねがいします</h1>
      <pre>{ JSON.stringify(cats, null, 2) }</pre>
    </div>
  );
}

export default CatList;
