import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'AppDB.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Native DB';
const database_size = 200000;

export const getDBConnection = async () => {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size,
  );
};

// Create table if not exists
export const createTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    number TEXT
  );`;
  await db.executeSql(query);
};

// Insert user
export const insertUser = async (db, user) => {
  const insertQuery = `INSERT INTO users (username, number) VALUES (?, ?)`;
  return db.executeSql(insertQuery, [user.username, user.number]);
};

// Get all users
export const getUsers = async db => {
  const results = await db.executeSql(`SELECT * FROM users`);
  const users = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }
  });
  return users;
};
