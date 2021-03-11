import { PrismaService } from "nestjs-prisma";
import {
  FindOneUserProfileArgs,
  FindManyUserProfileArgs,
  UserProfileCreateArgs,
  UserProfileUpdateArgs,
  UserProfileDeleteArgs,
  Subset,
} from "@prisma/client";

export class UserProfileServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyUserProfileArgs>(
    args: Subset<T, FindManyUserProfileArgs>
  ) {
    return this.prisma.userProfile.findMany(args);
  }
  findOne<T extends FindOneUserProfileArgs>(
    args: Subset<T, FindOneUserProfileArgs>
  ) {
    return this.prisma.userProfile.findOne(args);
  }
  create<T extends UserProfileCreateArgs>(
    args: Subset<T, UserProfileCreateArgs>
  ) {
    return this.prisma.userProfile.create<T>(args);
  }
  update<T extends UserProfileUpdateArgs>(
    args: Subset<T, UserProfileUpdateArgs>
  ) {
    return this.prisma.userProfile.update<T>(args);
  }
  delete<T extends UserProfileDeleteArgs>(
    args: Subset<T, UserProfileDeleteArgs>
  ) {
    return this.prisma.userProfile.delete(args);
  }
}
