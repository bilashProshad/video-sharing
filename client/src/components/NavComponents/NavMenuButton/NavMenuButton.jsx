import { AiOutlineMenu } from "react-icons/ai";
import "./NavMenuButton.scss";

const NavMenuButton = ({ ...rest }) => {
  return (
    <button type="button" className={`navMenuButton`} {...rest}>
      <AiOutlineMenu />
    </button>
  );
};

export default NavMenuButton;
