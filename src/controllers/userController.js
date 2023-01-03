import User from "../models/User.js";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, location } = req.body;
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
