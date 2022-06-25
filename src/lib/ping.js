import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

async function ping(address, count = 3) {
  const command = `ping ${address} -c ${count}`;

  const { stdout } = await execAsync(command);

  const pattern = /time=(?<time>.+) ms/g;

  // const times = [];

  // for (const match of stdout.matchAll(pattern)) {
  //   const {
  //     groups: { time },
  //   } = match;

  //   times.push(Number(time));
  // }

  const times = Array.from(stdout.matchAll(pattern)).map((match) =>
    Number(match.groups.time)
  );
  console.log('TIMES', times);
  return {
    stdout,
    times,
  };
}

export default ping;
