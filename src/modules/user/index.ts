import { Module } from "@nestjs/common";
import { UserController } from "./controller";
import { UserModelProvider } from "./model";
import { UserRepository } from "./repo";
import { UserService } from "./service";
import { AuthenticationUtils } from "@modules/core/auth/utils";
import { AuthenticationModule } from "@modules/core/auth";
import { ProductModule } from "@modules/product";
import { ProductService } from "@modules/product/service";

@Module({
    controllers: [UserController],
    imports: [AuthenticationModule, ProductModule],
    exports: [UserRepository, UserService, UserModelProvider],
    providers: [UserModelProvider, UserRepository, UserService]
})
export class UserModule {}