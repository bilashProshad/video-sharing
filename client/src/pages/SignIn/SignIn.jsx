import "./SignIn.scss";
import logo from "../../assets/logo.png";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="signin">
      <div className="form-container">
        <div className="top">
          <img src={logo} alt="VidVibes Logo" />
          <h2>Login</h2>
          <p>to continue to VidVibes</p>
        </div>

        <form>
          <Input type="text" label="Email" />
          <Input type="password" label="Password" />
          <div className="actions">
            <Button variant="empty" onClick={() => navigate("/register")}>
              Create account
            </Button>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
