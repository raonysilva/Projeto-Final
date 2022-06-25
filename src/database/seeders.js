import { readFileSync } from 'fs';

import Host from '../models/Host.js';

function up() {
  const content = readFileSync('src/database/seeders.json');
  const data = JSON.parse(content);

  for (const host of data.hosts) {
    Host.create(host);
  }
}

export default { up };