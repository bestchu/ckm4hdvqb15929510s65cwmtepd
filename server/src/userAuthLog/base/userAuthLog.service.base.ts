import { PrismaService } from "nestjs-prisma";
import {
  FindOneUserAuthLogArgs,
  FindManyUserAuthLogArgs,
  UserAuthLogCreateArgs,
  UserAuthLogUpdateArgs,
  UserAuthLogDeleteArgs,
  Subset,
} from "@prisma/client";

export class UserAuthLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyUserAuthLogArgs>(
    args: Subset<T, FindManyUserAuthLogArgs>
  ) {
    return this.prisma.userAuthLog.findMany(args);
  }
  findOne<T extends FindOneUserAuthLogArgs>(
    args: Subset<T, FindOneUserAuthLogArgs>
  ) {
    return this.prisma.userAuthLog.findOne(args);
  }
  create<T extends UserAuthLogCreateArgs>(
    args: Subset<T, UserAuthLogCreateArgs>
  ) {
    return this.prisma.userAuthLog.create<T>(args);
  }
  update<T extends UserAuthLogUpdateArgs>(
    args: Subset<T, UserAuthLogUpdateArgs>
  ) {
    return this.prisma.userAuthLog.update<T>(args);
  }
  delete<T extends UserAuthLogDeleteArgs>(
    args: Subset<T, UserAuthLogDeleteArgs>
  ) {
    return this.prisma.userAuthLog.delete(args);
  }
}
