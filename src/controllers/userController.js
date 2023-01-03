import User from "../models/User.js";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password Confirmation does not match",
    });
  }
  const emailExists = await User.exists({ email });
  const usernameExists = await User.exists({ username });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This email is already taken.",
    });
  }
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username is already taken",
    });
  }
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const Remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("User Login");
export const logout = (req, res) => res.send("User Logout");
export const see = (req, res) => res.send("See User Profile");
