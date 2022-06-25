import Database from '../database/index.js';

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      hosts
  `;

  return await db.all(sql);
}

async function readById(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      hosts
    WHERE
      id = ?
  `;

  return await db.get(sql, [id]);
}

async function create(host) {
  const db = await Database.connect();

  const { name, address } = host;

  const sql = `
    INSERT INTO
      hosts (name, address)
    VALUES
      (?, ?)
  `;

  const { lastID } = await db.run(sql, [name, address]);

  return await readById(lastID);
}

async function update(id, host) {
  const db = await Database.connect();

  const { name, address } = host;

  const sql = `
    UPDATE
      hosts
    SET
      name = ?, address = ?
    WHERE
      id = ?
  `;

  await db.run(sql, [name, address, id]);

  return await readById(id);
}

async function remove(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      hosts
    WHERE
      id = ?
  `;

  await db.run(sql, [id]);
}

export default { create, readAll, readById, update, remove };