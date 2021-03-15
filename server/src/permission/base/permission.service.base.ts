import { PrismaService } from "nestjs-prisma";
import {
  FindOnePermissionArgs,
  FindManyPermissionArgs,
  PermissionCreateArgs,
  PermissionUpdateArgs,
  PermissionDeleteArgs,
  Subset,
} from "@prisma/client";

export class PermissionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyPermissionArgs>(
    args: Subset<T, FindManyPermissionArgs>
  ) {
    return this.prisma.permission.findMany(args);
  }
  findOne<T extends FindOnePermissionArgs>(
    args: Subset<T, FindOnePermissionArgs>
  ) {
    return this.prisma.permission.findOne(args);
  }
  create<T extends PermissionCreateArgs>(
    args: Subset<T, PermissionCreateArgs>
  ) {
    return this.prisma.permission.create<T>(args);
  }
  update<T extends PermissionUpdateArgs>(
    args: Subset<T, PermissionUpdateArgs>
  ) {
    return this.prisma.permission.update<T>(args);
  }
  delete<T extends PermissionDeleteArgs>(
    args: Subset<T, PermissionDeleteArgs>
  ) {
    return this.prisma.permission.delete(args);
  }
}
