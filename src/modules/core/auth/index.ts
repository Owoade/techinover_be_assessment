import { Module } from "@nestjs/common";
import { AuthenticationUtils } from "./utils";

@Module({
    exports: [AuthenticationUtils],
    providers: [AuthenticationUtils]
})
export class AuthenticationModule {}