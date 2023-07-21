import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import "./Profile.scss";
import avatar from "../../assets/profile.png";
import Button from "../../components/Button/Button";
import { useAuthContext } from "../../contexts/AuthContext";
import api from "../../http";
import { toast } from "react-hot-toast";
import {
  CLEAR_ERROR,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../../contexts/Actions/AuthActions";

const Profile = () => {
  const { user, dispatch, loading, error: updateError } = useAuthContext();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(avatar);

  const [edit, setEdit] = useState(false);

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (user && user.avatar && user.avatar.public_id) {
      setImagePreview(user.avatar.url);
    }
  }, [user]);

  useEffect(() => {
    async function updateImage(myForm) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const { data } = await api.put(`/api/v1/user/avatar`, myForm, config);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
        setEdit(false);
        toast.success("The user updated successfully.");
      } catch (error) {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: error.response.data.message,
        });
      }
    }

    if (image) {
      const myForm = new FormData();
      myForm.append("image", image);
      updateImage(myForm);
    }
  }, [image, dispatch]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [updateError, dispatch]);

  const setImageFile = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = async (e) => {
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

    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const { data } = await api.put(`/api/v1/user`, { name, email });
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
      setEdit(false);
      toast.success("The user updated successfully.");
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  return (
    <Layout>
      <div className="profile signin">
        <div className="form-container">
          <label htmlFor="user-image">
            <img src={imagePreview} alt={user?.name} />
            <input
              type="file"
              name="image"
              id="user-image"
              style={{ display: "none" }}
              accept="image/*"
              onChange={setImageFile}
            />
          </label>
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
                <Button type="submit" width="w-max" loading={loading}>
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
