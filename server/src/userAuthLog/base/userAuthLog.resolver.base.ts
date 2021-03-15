import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateUserAuthLogArgs } from "./CreateUserAuthLogArgs";
import { UpdateUserAuthLogArgs } from "./UpdateUserAuthLogArgs";
import { DeleteUserAuthLogArgs } from "./DeleteUserAuthLogArgs";
import { FindManyUserAuthLogArgs } from "./FindManyUserAuthLogArgs";
import { FindOneUserAuthLogArgs } from "./FindOneUserAuthLogArgs";
import { UserAuthLog } from "./UserAuthLog";
import { User } from "../../user/base/User";
import { UserAuthLogService } from "../userAuthLog.service";

@graphql.Resolver(() => UserAuthLog)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserAuthLogResolverBase {
  constructor(
    protected readonly service: UserAuthLogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [UserAuthLog])
  @nestAccessControl.UseRoles({
    resource: "UserAuthLog",
    action: "read",
    possession: "any",
  })
  async userAuthLogs(
    @graphql.Args() args: FindManyUserAuthLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserAuthLog[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UserAuthLog",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => UserAuthLog, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserAuthLog",
    action: "read",
    possession: "own",
  })
  async userAuthLog(
    @graphql.Args() args: FindOneUserAuthLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserAuthLog | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "UserAuthLog",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => UserAuthLog)
  @nestAccessControl.UseRoles({
    resource: "UserAuthLog",
    action: "create",
    possession: "any",
  })
  async createUserAuthLog(
    @graphql.Args() args: CreateUserAuthLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserAuthLog> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "UserAuthLog",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"UserAuthLog"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @graphql.Mutation(() => UserAuthLog)
  @nestAccessControl.UseRoles({
    resource: "UserAuthLog",
    action: "update",
    possession: "any",
  })
  async updateUserAuthLog(
    @graphql.Args() args: UpdateUserAuthLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserAuthLog | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "UserAuthLog",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"UserAuthLog"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          user: {
            connect: args.data.user,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => UserAuthLog)
  @nestAccessControl.UseRoles({
    resource: "UserAuthLog",
    action: "delete",
    possession: "any",
  })
  async deleteUserAuthLog(
    @graphql.Args() args: DeleteUserAuthLogArgs
  ): Promise<UserAuthLog | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserAuthLog",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: UserAuthLog,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .user();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
