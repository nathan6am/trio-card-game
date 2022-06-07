import { useEffect, useState } from "react";
import "./App.css";
import "@material-tailwind/react/tailwind.css";
import Home from "./screens/Home";
import { useWebsocket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { updateStoredSocketId } from "./redux/actionCreators";
import SinglePlayer from "./screens/SinglePlayer";
import MultiPlayer from "./screens/MultiPlayer";
import LobbyScreen from "./screens/LobbyScreen";
export default function App() {
  const dispatch = useDispatch();
  const socket = useWebsocket();
  const displayName = useSelector((state) => state.user.displayName);

  const [display, setDisplay] = useState("home");
  const storedId = useSelector((state) => state.user.socketId);
  const singlePlayerActive = useSelector(
    (state) => state.singlePlayerGame.active
  );
  const multiPlayerActive = useSelector((state) => state.lobby.gameActive);
  const inLobby = useSelector((state) => state.lobby.connectedToLobby);
  useEffect(() => {
    if (singlePlayerActive) {
      setDisplay("singlePlayer");
    } else if (inLobby) {
      setDisplay("lobby");
    } else {
      setDisplay("home");
    }
  }, [singlePlayerActive, multiPlayerActive, inLobby]);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected");
      console.log(socket.id);
      dispatch(updateStoredSocketId(socket.id));
    });
    if (displayName) {
      console.log(displayName);
      socket?.emit("user:setDisplayName", displayName);
    }
    return () => {
      socket?.off("connect");
    };
  }, [socket, dispatch, displayName]);
  return (
    <>
      <div className="flex items-stretch min-h-screen w-screen items-center justify-center blue-bg">
        <ScreenToDisplay display={display} />
      </div>
    </>
  );
}

const ScreenToDisplay = ({ display }) => {
  switch (display) {
    case "home":
      return <Home />;
    case "singlePlayer":
      return <SinglePlayer />;
    case "lobby":
      return <LobbyScreen />;
    default:
      return <Home />;
  }
};
