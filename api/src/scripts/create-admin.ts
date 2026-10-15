import {createInterface} from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import {Writable} from 'node:stream';
import bcrypt from 'bcrypt';
import {PrismaService} from '../prisma/prisma.service.js';

async function main() {
  if (!stdin.isTTY || !stdout.isTTY) {
    throw new Error('Запустіть команду в інтерактивному терміналі.');
  }

  let muted = false;
  const output = new Writable({
    write(chunk, encoding, callback) {
      if (!muted) stdout.write(chunk, encoding);
      callback();
    },
  });
  const readline = createInterface({input: stdin, output, terminal: true});
  const abortController = new AbortController();
  readline.on('SIGINT', () => abortController.abort());

  const question = (prompt: string) =>
    readline.question(prompt, {signal: abortController.signal});

  const askPassword = async (prompt: string) => {
    stdout.write(prompt);
    muted = true;
    try {
      return await question('');
    } finally {
      muted = false;
      stdout.write('\n');
    }
  };

  let login: string;
  let password: string;
  try {
    login = (await question('Логін: ')).trim();
    if (!login) throw new Error('Логін не може бути порожнім.');

    password = await askPassword('Пароль (щонайменше 12 символів): ');
    if (password.length < 12 || Buffer.byteLength(password, 'utf8') > 72) {
      throw new Error('Пароль має містити щонайменше 12 символів і не більше 72 байтів UTF-8.');
    }

    const confirmation = await askPassword('Повторіть пароль: ');
    if (password !== confirmation) throw new Error('Паролі не збігаються.');
  } finally {
    readline.close();
    output.end();
  }

  const prisma = new PrismaService();
  try {
    const existing = await prisma.auth.findUnique({where: {login}});
    if (existing) throw new Error('Користувач із таким логіном уже існує.');

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.auth.create({
      data: {login, password: hashedPassword},
      select: {id: true},
    });
    console.log('Користувача створено. У поточній схемі БД ролі відсутні.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  if (error instanceof Error && error.name === 'AbortError') {
    console.error('Створення користувача скасовано.');
    process.exitCode = 130;
    return;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2002'
  ) {
    console.error('Користувач із таким логіном уже існує.');
  } else {
    console.error(error instanceof Error ? error.message : 'Не вдалося створити користувача.');
  }
  process.exitCode = 1;
});
