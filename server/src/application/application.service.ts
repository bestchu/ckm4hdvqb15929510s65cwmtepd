import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ApplicationServiceBase } from "./base/application.service.base";

@Injectable()
export class ApplicationService extends ApplicationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
