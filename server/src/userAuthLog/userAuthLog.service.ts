import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserAuthLogServiceBase } from "./base/userAuthLog.service.base";

@Injectable()
export class UserAuthLogService extends UserAuthLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
