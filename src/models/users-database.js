import Database from './database-template.js';

class UsersDatabase extends Database {
  create(user) {
    super.makeRequest(() => {
      const sql = `INSERT INTO users (email, password, nickname, avatar, first_name, second_name) VALUES (?, ?, ?, ?, ?, ?)`;

      const values = [
        user.email,
        user.pass,
        user.nickName,
        user.imagePath,
        user.firstName,
        user.secondName,
      ];

      this.connection.query(sql, values, (error) => {
        if (error) throw error;
      });
    });
  }

  read(id) {
    return super.makeRequest(() => {
      const sql = `SELECT user_id, email, password, nickname, avatar, registration_time, first_name, second_name FROM users WHERE user_id = ?`;

      this.connection.query(sql, [id], (error, res) => {
        if (error) throw error;
        console.log({ res });
        return res;
      });
    });

    // return user with given id
  }
  readAll() {
    super.connect();

    // return all the users

    super.disconnect();
  }
  update(user) {
    super.connect();

    // update user where userID
    // with new user values

    super.disconnect();
  }
  delete(user) {
    super.connect();

    // delete the user where userID

    super.disconnect();
  }
}

const usersDatabase = new UsersDatabase();

export default usersDatabase;
