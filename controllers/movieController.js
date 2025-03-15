import connection from '../data/db.js';

function index(req, res) {
  const sql = 'SELECT * FROM movies';

  const queryResult = (err, results) => {
    if (err) res.status(500), json({ error: 'Server error -> Index function' });
    else return res.json(results);
  };

  connection.query(sql, (err, results) => queryResult(err, results));
}

export { index };
