import { useEffect } from "react";
import "./App.css";
import "@material-tailwind/react/tailwind.css";
import Home from "./screens/Home";
import { useWebsocket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { updateStoredSocketId } from "./redux/actionCreators";
export default function App() {
  const dispatch = useDispatch();
  const socket = useWebsocket();
  const displayName = useSelector((state) => state.user.displayName);
  const storedId = useSelector((state) => state.user.socketId);
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected");
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
      <div className="flex items-stretch min-h-screen w-screen items-center justify-center offwhite-bg">
        <Home />
      </div>
    </>
  );
}
