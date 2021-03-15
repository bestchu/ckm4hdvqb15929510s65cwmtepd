import { PrismaService } from "nestjs-prisma";
import {
  FindOneUserGroupArgs,
  FindManyUserGroupArgs,
  UserGroupCreateArgs,
  UserGroupUpdateArgs,
  UserGroupDeleteArgs,
  Subset,
} from "@prisma/client";

export class UserGroupServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyUserGroupArgs>(
    args: Subset<T, FindManyUserGroupArgs>
  ) {
    return this.prisma.userGroup.findMany(args);
  }
  findOne<T extends FindOneUserGroupArgs>(
    args: Subset<T, FindOneUserGroupArgs>
  ) {
    return this.prisma.userGroup.findOne(args);
  }
  create<T extends UserGroupCreateArgs>(args: Subset<T, UserGroupCreateArgs>) {
    return this.prisma.userGroup.create<T>(args);
  }
  update<T extends UserGroupUpdateArgs>(args: Subset<T, UserGroupUpdateArgs>) {
    return this.prisma.userGroup.update<T>(args);
  }
  delete<T extends UserGroupDeleteArgs>(args: Subset<T, UserGroupDeleteArgs>) {
    return this.prisma.userGroup.delete(args);
  }
}
