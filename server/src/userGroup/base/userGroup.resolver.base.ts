import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
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
}
