function setImagePath(req, res, next) {
  // req.protocol -> http
  // req.get("host") -> localhost
  req.imagePath = `${req.protocol}://${req.get('host')}/imgs/books/`;
  next();
}

export default setImagePath;
