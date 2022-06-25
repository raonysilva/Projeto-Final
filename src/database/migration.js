import Database from './index.js';

async function up() {
  const db = await Database.connect();

  const usersSql = `
    CREATE TABLE users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL
    )
  `;

  await db.exec(usersSql);

  const hostsSql = `
    CREATE TABLE hosts (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL,
      address VARCHAR(50) NOT NULL
    )
  `;

  await db.exec(hostsSql);
}

export default { up };