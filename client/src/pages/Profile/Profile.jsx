import { useState } from "react";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import "./Profile.scss";
import avatar from "../../assets/profile.png";
import Button from "../../components/Button/Button";

const Profile = () => {
  const [name, setName] = useState("Bilash Prosad");
  const [email, setEmail] = useState("pbilash64@gmail.com");

  const [edit, setEdit] = useState(false);

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) {
      setError(true);
      setNameError(true);
      return;
    }

    if (!email) {
      setError(true);
      setEmailError(true);
      return;
    }
  };

  return (
    <Layout>
      <div className="profile signin">
        <div className="form-container">
          <img src={avatar} alt="" />
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!edit}
              />
              {error && nameError && <span>*** Please enter your name</span>}
            </div>
            <div className="input-box">
              <Input
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!edit}
              />
              {error && emailError && (
                <span>*** Please enter a valid email</span>
              )}
            </div>
            <div className="buttons">
              {!edit && (
                <Button width="w-max" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
              {edit && (
                <Button
                  width="w-max"
                  onClick={() => setEdit(false)}
                  color="danger"
                >
                  Cancel
                </Button>
              )}
              {edit && (
                <Button type="submit" width="w-max">
                  Update
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
