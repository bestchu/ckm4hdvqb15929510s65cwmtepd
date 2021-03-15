import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserGroupServiceBase } from "./base/userGroup.service.base";

@Injectable()
export class UserGroupService extends UserGroupServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
