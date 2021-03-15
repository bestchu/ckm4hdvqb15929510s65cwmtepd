import { Module } from "@nestjs/common";
import { UserGroupModuleBase } from "./base/userGroup.module.base";
import { UserGroupService } from "./userGroup.service";
import { UserGroupController } from "./userGroup.controller";
import { UserGroupResolver } from "./userGroup.resolver";

@Module({
  imports: [UserGroupModuleBase],
  controllers: [UserGroupController],
  providers: [UserGroupService, UserGroupResolver],
  exports: [UserGroupService],
})
export class UserGroupModule {}
