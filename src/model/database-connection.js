import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'root',
  database: 'test_db',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.query('SELECT * FROM Persons', (err, rows, fields) => {
  if (err) throw err;

  console.log('The solution is: ', rows[0]);
});

connection.end();
