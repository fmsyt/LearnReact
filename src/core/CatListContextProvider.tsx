import React, { useContext, useEffect } from "react";
import { Cat, isTypeOfReceiveAppendMessage, isTypeOfReceiveInitMessage } from "./interface";

import CatListContext from "./CatListContext";
import WebSocketContext from "./WebSocketContext";

interface CatListContextProviderProps {
  children: React.ReactNode,
}

const CatListContextProvider: React.FC<CatListContextProviderProps> = (props) => {

  const { children } = props;
  const { lastJsonMessage, readyState, sendJsonMessage } = useContext(WebSocketContext);

  const [cats, setCats] = React.useState<Cat[] | null>(null);

  useEffect(() => {

    if (readyState !== WebSocket.OPEN) {
      return;
    }

    sendJsonMessage({ method: "general.update" });
    sendJsonMessage({ method: "sheets.update" });

  }, [readyState, sendJsonMessage]);

  useEffect(() => {

    const method = lastJsonMessage?.method || "";

    console.log("method", method);

    switch (method) {
      case "init": {

        if (!isTypeOfReceiveInitMessage(lastJsonMessage)) {
          return;
        }

        setCats(lastJsonMessage.data);

        return;
      }
      case "append": {
        if (!isTypeOfReceiveAppendMessage(lastJsonMessage)) {
          return;
        }

        const data = lastJsonMessage.data;
        setCats((prev) => [...prev!, data]);

      }

    }

  }, [lastJsonMessage, sendJsonMessage]);

  const values = {
    cats,
  };

  return (
    <CatListContext.Provider value={values}>
      {children}
    </CatListContext.Provider>
  );
};

export default CatListContextProvider;
