import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateUserGroupArgs } from "./CreateUserGroupArgs";
import { UpdateUserGroupArgs } from "./UpdateUserGroupArgs";
import { DeleteUserGroupArgs } from "./DeleteUserGroupArgs";
import { FindManyUserGroupArgs } from "./FindManyUserGroupArgs";
import { FindOneUserGroupArgs } from "./FindOneUserGroupArgs";
import { UserGroup } from "./UserGroup";
import { FindManyUserArgs } from "../../user/base/FindManyUserArgs";
import { User } from "../../user/base/User";
import { UserGroupService } from "../userGroup.service";

@graphql.Resolver(() => UserGroup)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserGroupResolverBase {
  constructor(
    protected readonly service: UserGroupService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [UserGroup])
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "read",
    possession: "any",
  })
  async userGroups(
    @graphql.Args() args: FindManyUserGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserGroup[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UserGroup",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => UserGroup, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "read",
    possession: "own",
  })
  async userGroup(
    @graphql.Args() args: FindOneUserGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserGroup | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "UserGroup",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => UserGroup)
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "create",
    possession: "any",
  })
  async createUserGroup(
    @graphql.Args() args: CreateUserGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserGroup> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "UserGroup",
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
        `providing the properties: ${properties} on ${"UserGroup"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        manager: args.data.manager
          ? {
              connect: args.data.manager,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => UserGroup)
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "update",
    possession: "any",
  })
  async updateUserGroup(
    @graphql.Args() args: UpdateUserGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserGroup | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "UserGroup",
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
        `providing the properties: ${properties} on ${"UserGroup"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          manager: args.data.manager
            ? {
                connect: args.data.manager,
              }
            : undefined,
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

  @graphql.Mutation(() => UserGroup)
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "delete",
    possession: "any",
  })
  async deleteUserGroup(
    @graphql.Args() args: DeleteUserGroupArgs
  ): Promise<UserGroup | null> {
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

  @graphql.ResolveField(() => [User])
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "read",
    possession: "any",
  })
  async users(
    @graphql.Parent() parent: UserGroup,
    @graphql.Args() args: FindManyUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .users(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserGroup",
    action: "read",
    possession: "any",
  })
  async manager(
    @graphql.Parent() parent: UserGroup,
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
      .manager();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
