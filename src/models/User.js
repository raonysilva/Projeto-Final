import bcrypt from 'bcrypt';

import Database from '../database/index.js';

const saltRounds = Number(process.env.BCRYPT_SALT);

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      id, name, email
    FROM
      users
  `;

  return await db.all(sql);
}

async function readById(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      id, name, email
    FROM
      users
    WHERE
      id = ?
  `;

  return await db.get(sql, [id]);
}

async function readByEmail(email) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      email = ?
  `;

  return await db.get(sql, [email]);
}

async function create(user) {
  const db = await Database.connect();

  const { name, email, password } = user;

  const hash = await bcrypt.hash(password, saltRounds);

  const sql = `
    INSERT INTO
      users (name, email, password)
    VALUES
      (?, ?, ?)
  `;

  const { lastID } = await db.run(sql, [name, email, hash]);

  return await readById(lastID);
}

async function update(id, user) {
  const db = await Database.connect();

  const { name, email, password } = user;

  const hash = await bcrypt.hash(password, saltRounds);

  const sql = `
    UPDATE
      users
    SET
      name = ? , email = ?, password = ?
    WHERE
      id = ?
  `;

  await db.run(sql, [name, email, hash, id]);

  return await readById(id);
}

async function remove(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      users
    WHERE
      id = ?
  `;

  await db.run(sql, [id]);
}

export default { create, readAll, readById, readByEmail, update, remove };