import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import io from "socket.io-client";

export const WebsocketContext = createContext(null);

const WebsocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  const options = useMemo(() => ({}), []);

  useEffect(() => {
    try {
      const socket = io("https://damp-lowlands-35197.herokuapp.com/", options);
      setConnection(socket);
    } catch (err) {
      console.log(err);
    }
  }, [options]);

  return (
    <WebsocketContext.Provider value={connection}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => {
  const ctx = useContext(WebsocketContext);
  if (ctx === undefined) {
    throw new Error("useWebsocket can only be used inside WebsocketContext");
  }
  return ctx;
};

export default WebsocketProvider;
