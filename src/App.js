import SinglePlayer from "./screens/SinglePlayer";
import MainMenu from "./screens/menus/MainMenu";
import "./App.css";
import "@material-tailwind/react/tailwind.css";
import Home from "./screens/Home";

export default function App() {
  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center offwhite-bg">
        <div className="container flex items-center justify-center">
          <div className="px-10 py-5">
            <Home />
          </div>
        </div>
      </div>
    </>
  );
}
