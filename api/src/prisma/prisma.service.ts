import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {PrismaMariaDb} from '@prisma/adapter-mariadb';
import 'dotenv/config';
import {PrismaClient} from '../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    super({adapter: new PrismaMariaDb(databaseUrl)});
  }

  async onModuleInit() {
    this.logger.log('Connecting to the database...');
    try {
      await this.$connect();
      this.logger.log('Database connection established');
    } catch (error) {
      this.logger.error(
        'Failed to connect to the database',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}
