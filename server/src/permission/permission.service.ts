import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PermissionServiceBase } from "./base/permission.service.base";

@Injectable()
export class PermissionService extends PermissionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
