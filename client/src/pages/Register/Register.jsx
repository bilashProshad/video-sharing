import "./Register.scss";
import logo from "../../assets/logo.png";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../../contexts/Actions/AuthActions";
import api from "../../http";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const { loading, dispatch, error: loginError } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [loginError, dispatch]);

  useEffect(() => {
    if (name.length > 0) {
      setNameError(false);
    }

    if (email.length > 0) {
      setEmailError(false);
    }

    if (password.length > 0) {
      setPasswordError(false);
    }

    if (confirmPassword.length > 0) {
      setConfirmPasswordError(false);
    }
  }, [confirmPassword, email, name, password]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      setError(true);
      setNameError(true);
      return;
    }

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

    if (!confirmPassword) {
      setError(true);
      setConfirmPasswordError(true);
      return;
    }

    try {
      dispatch({ type: REGISTER_REQUEST });
      const { data } = await api.post(`/api/v1/user/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  return (
    <div className="signin">
      <div className="form-container">
        <div className="top">
          <img src={logo} alt="VidVibes Logo" onClick={() => navigate("/")} />
          <h2>Register</h2>
          <p>to continue to VidVibes</p>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="input-box">
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && nameError && <span>*** Please enter your name</span>}
          </div>
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
          <div className="input-box">
            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && confirmPasswordError && (
              <span>*** Please enter your confirm password</span>
            )}
          </div>
          <div className="actions">
            <Button variant="empty" onClick={() => navigate("/login")}>
              Have an account?
            </Button>
            <Button type="submit" loading={loading}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
