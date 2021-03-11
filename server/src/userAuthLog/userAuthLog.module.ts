import { Module } from "@nestjs/common";
import { UserAuthLogModuleBase } from "./base/userAuthLog.module.base";
import { UserAuthLogService } from "./userAuthLog.service";
import { UserAuthLogController } from "./userAuthLog.controller";
import { UserAuthLogResolver } from "./userAuthLog.resolver";

@Module({
  imports: [UserAuthLogModuleBase],
  controllers: [UserAuthLogController],
  providers: [UserAuthLogService, UserAuthLogResolver],
  exports: [UserAuthLogService],
})
export class UserAuthLogModule {}
