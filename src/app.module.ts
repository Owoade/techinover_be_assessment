import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from '@modules/core/auth';
import { UserModule } from '@modules/user';
import { AdminModule } from '@modules/admin';
import { ProductModule } from '@modules/product';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    AdminModule,
    ProductModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
