import connection from '../data/db.js';

function index(req, res) {
  const sql = 'SELECT * FROM movies';

  const queryResult = (err, results) => {
    if (err) res.status(500), json({ error: 'Server error -> Index function' });
    else {
      const movies = results.map((movie) => {
        return {
          ...movie,
          imagePath: `${req.imagePath}${movie.image}`,
        };
      });
      return res.json(movies);
    }
  };

  connection.query(sql, (err, results) => queryResult(err, results));
}

function show(req, res) {
  const id = req.params.id;

  const sql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

  const serverError = () => {
    res.status(500);
    return { error: 'Server error -> Show function' };
  };

  const getMovie = (err, results) => {
    if (err) {
      const error = serverError();
      res.json(error);
    } else if (results.length === 0) res.status(404), res.json({ 'error code': 404, error: 'Movie Not Found' });
    else return results[0];
  };

  const getReviews = (err, results) => {
    if (err) {
      const error = serverError();
      res.json(error);
    } else return results;
  };

  connection.query(sql, [id], (err, results) => {
    const movie = getMovie(err, results);

    movie.imagePath = `${req.imagePath}${movie.image}`;

    connection.query(reviewsSql, [id], (err, reviewsResult) => {
      const reviews = getReviews(err, reviewsResult);
      movie.reviews = reviews;
      res.json(movie);
    });
  });
}

function storeReview(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const sql = 'INSERT INTO reviews ( text, name, vote, book_id ) VALUES (?,?,?,?)';
}

export { index, show };
