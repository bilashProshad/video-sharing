import "./SignIn.scss";
import logo from "../../assets/logo.png";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0) {
      setEmailError(false);
    }

    if (password.length > 0) {
      setPasswordError(false);
    }
  }, [email, password]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError(true);
      setEmailError(true);
      return;
    }

    if (!password) {
      setError(true);
      setPasswordError(true);
      return;
    }
  };

  return (
    <div className="signin">
      <div className="form-container">
        <div className="top">
          <img src={logo} alt="VidVibes Logo" />
          <h2>Login</h2>
          <p>to continue to VidVibes</p>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="input-box">
            <Input
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && emailError && <span>*** Please enter a valid email</span>}
          </div>
          <div className="input-box">
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && passwordError && (
              <span>*** Please enter your password</span>
            )}
          </div>
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
