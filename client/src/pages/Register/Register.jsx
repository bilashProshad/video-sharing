import "./Register.scss";
import logo from "../../assets/logo.png";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="signin">
      <div className="form-container">
        <div className="top">
          <img src={logo} alt="VidVibes Logo" />
          <h2>Register</h2>
          <p>to continue to VidVibes</p>
        </div>

        <form>
          <Input type="text" label="Name" />
          <Input type="text" label="Email" />
          <Input type="password" label="Password" />
          <Input type="password" label="Confirm password" />
          <div className="actions">
            <Button variant="empty" onClick={() => navigate("/login")}>
              Have an account?
            </Button>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
