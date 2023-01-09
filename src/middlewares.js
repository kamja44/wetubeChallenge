import multer from "multer";
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  // console.log(req.session);
  // console.group("Session's Local", res.locals);
  next();
};
export const protectorMiddleware = (req, res, next) => {
  if (!res.locals.loggedIn) {
    return res.redirect("/login");
  }
  return next();
};
export const publicOnlyMiddleware = (req, res, next) => {
  if (res.locals.loggedIn) {
    return res.redirect("/");
  }
  return next();
};
export const uploadFiles = multer({ dest: "uploads/" });
