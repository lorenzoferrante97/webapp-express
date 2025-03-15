function setImagePath(req, res, next) {
  // req.protocol -> http
  // req.get("host") -> localhost
  req.imagePath = `${req.protocol}://${req.get('host')}/imgs/book/`;
  next();
}

export default setImagePath;
