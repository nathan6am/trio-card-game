import MenuButton from "../../components/menu/MenuButton";

import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function AdminLeft() {
  const dispactch = useDispatch();
  return (
    <div className="flex flex-col">
      <p className="text-center text-pastelRed-500 my-10">
        The creator of the lobby has left the game.
      </p>
      <MenuButton
        color={"success"}
        size="md"
        onClick={() => {
          dispactch(changeMenu("party-mode"));
        }}
      >
        Continue to menu
      </MenuButton>
    </div>
  );
}
