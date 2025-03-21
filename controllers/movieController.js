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

  // const sql = 'SELECT * FROM movies WHERE id = ?';
  const sql = `
  SELECT movies.*, ROUND(AVG(reviews.vote)) AS average_vote
  FROM movies
  LEFT JOIN reviews ON movie_id = movies.id
  WHERE movies.id = ?`;
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ? ORDER BY updated_at DESC';

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
      movie.average_vote = parseInt(movie.average_vote);
      res.json(movie);
    });
  });
}

function storeReview(req, res) {
  const id = req.params.id;
  const { name, vote, text } = req.body;

  const sql = 'INSERT INTO reviews ( movie_id, name, vote, text ) VALUES (?,?,?,?)';

  const queryResult = (err, results) => {
    if (err) res.status(500).json({ error: 'Server Error -> Store Review Function' });
    else res.status(201).json({ message: 'Review added correctly' });
  };

  connection.query(sql, [id, name, vote, text], (err, results) => queryResult(err, results));
}

export { index, show, storeReview };
