import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import db from './db';
import { QueryTypes } from 'sequelize';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const admins = await db.query(`SELECT id FROM "Admins";`, { type: QueryTypes.SELECT});

  if( admins.length < 1 )
    await db.query(
      `INSERT INTO "Admins" (email, password, name) VALUES (:email, :password, :name);`,
      {
        replacements: {
          name: 'Owoade Anu',
          email: 'owoade@techinnover.com',
          password:
            '$2a$10$OlBo8cN7R3RfgfJOq6gxQuNbCHuQ3AyLV0qJ4HxpEbUy9YfZZQL4G',
        },
      },
    );
  
  await app.listen(3000);
}
bootstrap();
