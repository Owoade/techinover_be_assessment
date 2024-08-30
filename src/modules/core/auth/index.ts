import { Module } from "@nestjs/common";
import { AuthenticationUtils } from "./urtls";

@Module({
    exports: [AuthenticationUtils],
    providers: [AuthenticationUtils]
})
export class AuthenticationModule {}