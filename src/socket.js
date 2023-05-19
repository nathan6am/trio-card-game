import React, { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";
import io from "socket.io-client";

export const WebsocketContext = createContext(null);
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const certificate = process.env.REACT_APP_CERTIFICATE;
const WebsocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  const options = useMemo(() => ({}), []);

  useEffect(() => {
    try {
      const socket = io(socketUrl, {
        secure: true,
        rejectUnauthorized: false,
        ca: certificate,
      });
      setConnection(socket);
    } catch (err) {
      console.log(err);
    }
  }, [options]);

  return <WebsocketContext.Provider value={connection}>{children}</WebsocketContext.Provider>;
};

export const useWebsocket = () => {
  const ctx = useContext(WebsocketContext);
  if (ctx === undefined) {
    throw new Error("useWebsocket can only be used inside WebsocketContext");
  }
  return ctx;
};

export default WebsocketProvider;
