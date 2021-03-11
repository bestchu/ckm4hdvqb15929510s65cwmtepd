import { PrismaService } from "nestjs-prisma";
import {
  FindOneApplicationArgs,
  FindManyApplicationArgs,
  ApplicationCreateArgs,
  ApplicationUpdateArgs,
  ApplicationDeleteArgs,
  Subset,
} from "@prisma/client";

export class ApplicationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyApplicationArgs>(
    args: Subset<T, FindManyApplicationArgs>
  ) {
    return this.prisma.application.findMany(args);
  }
  findOne<T extends FindOneApplicationArgs>(
    args: Subset<T, FindOneApplicationArgs>
  ) {
    return this.prisma.application.findOne(args);
  }
  create<T extends ApplicationCreateArgs>(
    args: Subset<T, ApplicationCreateArgs>
  ) {
    return this.prisma.application.create<T>(args);
  }
  update<T extends ApplicationUpdateArgs>(
    args: Subset<T, ApplicationUpdateArgs>
  ) {
    return this.prisma.application.update<T>(args);
  }
  delete<T extends ApplicationDeleteArgs>(
    args: Subset<T, ApplicationDeleteArgs>
  ) {
    return this.prisma.application.delete(args);
  }
}
