export const sendToken = async (user, statusCode, res) => {
  const token = user.getJWT();

  user = user.toObject();
  delete user.password;

  const options = {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? false : "none",
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE
    ),
  };

  res
    .cookie("token", token, options)
    .status(statusCode)
    .json({ success: true, user });
};
