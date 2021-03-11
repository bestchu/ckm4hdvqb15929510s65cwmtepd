import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserProfileServiceBase } from "./base/userProfile.service.base";

@Injectable()
export class UserProfileService extends UserProfileServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
