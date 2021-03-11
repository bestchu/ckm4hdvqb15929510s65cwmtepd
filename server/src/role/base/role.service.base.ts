import { PrismaService } from "nestjs-prisma";
import {
  FindOneRoleArgs,
  FindManyRoleArgs,
  RoleCreateArgs,
  RoleUpdateArgs,
  RoleDeleteArgs,
  Subset,
} from "@prisma/client";

export class RoleServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyRoleArgs>(args: Subset<T, FindManyRoleArgs>) {
    return this.prisma.role.findMany(args);
  }
  findOne<T extends FindOneRoleArgs>(args: Subset<T, FindOneRoleArgs>) {
    return this.prisma.role.findOne(args);
  }
  create<T extends RoleCreateArgs>(args: Subset<T, RoleCreateArgs>) {
    return this.prisma.role.create<T>(args);
  }
  update<T extends RoleUpdateArgs>(args: Subset<T, RoleUpdateArgs>) {
    return this.prisma.role.update<T>(args);
  }
  delete<T extends RoleDeleteArgs>(args: Subset<T, RoleDeleteArgs>) {
    return this.prisma.role.delete(args);
  }
}
