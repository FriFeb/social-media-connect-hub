import mysql from 'mysql';

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      // password: 'root',
      database: 'social_media',
    });
  }

  _connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
      }
    });
  }

  _disconnect() {
    this.connection.end((err) => {
      if (err) {
        console.error('Error while closing connection: ', err.stack);
        return;
      }
    });
  }

  async makeRequest(cb) {
    this._connect();

    const result = await cb();

    this._disconnect();

    console.log(result);
    return result;
  }
}

export default Database;
