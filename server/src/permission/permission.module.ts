import { Module } from "@nestjs/common";
import { PermissionModuleBase } from "./base/permission.module.base";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { PermissionResolver } from "./permission.resolver";

@Module({
  imports: [PermissionModuleBase],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionResolver],
  exports: [PermissionService],
})
export class PermissionModule {}
