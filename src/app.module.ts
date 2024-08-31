import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from '@modules/core/auth';
import { UserModule } from '@modules/user';
import { AdminModule } from '@modules/admin';
import { ProductModule } from '@modules/product';

@Module({
  imports: [AuthenticationModule, UserModule, AdminModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
