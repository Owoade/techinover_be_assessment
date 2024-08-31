import { Module } from "@nestjs/common";
import { AdminModelProvider } from "./model";
import { AdminRepository } from "./repo";
import { AdminService } from "./service";
import { AuthenticationModule } from "@modules/core/auth";
import { UserModule } from "@modules/user";
import { AdminController } from "./controller";
import { ProductModule } from "@modules/product";

@Module({
    controllers: [AdminController],
    imports: [AuthenticationModule, UserModule, ProductModule],
    providers: [AdminModelProvider, AdminRepository, AdminService ],
    exports: [AdminRepository, AdminService]
})
export class AdminModule {}