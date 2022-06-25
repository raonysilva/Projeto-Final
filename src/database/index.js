import Database from 'sqlite-async';

function getDatabase() {
  const databases = {
    development: 'database.dev.sqlite',
    test: 'database.test.sqlite',
    production: 'database.production.sqlite',
  };

  const NODE_ENV = process.env.NODE_ENV || 'development';

  return databases[NODE_ENV];
}

async function connect() {
  return await Database.open(`src/database/${getDatabase()}`);
}

export default { connect };