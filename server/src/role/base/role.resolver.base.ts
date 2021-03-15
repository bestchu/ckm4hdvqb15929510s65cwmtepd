import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateRoleArgs } from "./CreateRoleArgs";
import { UpdateRoleArgs } from "./UpdateRoleArgs";
import { DeleteRoleArgs } from "./DeleteRoleArgs";
import { FindManyRoleArgs } from "./FindManyRoleArgs";
import { FindOneRoleArgs } from "./FindOneRoleArgs";
import { Role } from "./Role";
import { FindManyPermissionArgs } from "../../permission/base/FindManyPermissionArgs";
import { Permission } from "../../permission/base/Permission";
import { Application } from "../../application/base/Application";
import { RoleService } from "../role.service";

@graphql.Resolver(() => Role)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RoleResolverBase {
  constructor(
    protected readonly service: RoleService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Role])
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "read",
    possession: "any",
  })
  async roles(
    @graphql.Args() args: FindManyRoleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Role[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Role",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Role, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "read",
    possession: "own",
  })
  async role(
    @graphql.Args() args: FindOneRoleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Role | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Role",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Role)
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "create",
    possession: "any",
  })
  async createRole(
    @graphql.Args() args: CreateRoleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Role> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Role",
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
        `providing the properties: ${properties} on ${"Role"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        app: {
          connect: args.data.app,
        },
      },
    });
  }

  @graphql.Mutation(() => Role)
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "update",
    possession: "any",
  })
  async updateRole(
    @graphql.Args() args: UpdateRoleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Role | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Role",
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
        `providing the properties: ${properties} on ${"Role"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          app: {
            connect: args.data.app,
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

  @graphql.Mutation(() => Role)
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "delete",
    possession: "any",
  })
  async deleteRole(@graphql.Args() args: DeleteRoleArgs): Promise<Role | null> {
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

  @graphql.ResolveField(() => [Permission])
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "read",
    possession: "any",
  })
  async permissions(
    @graphql.Parent() parent: Role,
    @graphql.Args() args: FindManyPermissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Permission",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .permissions(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Application, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Role",
    action: "read",
    possession: "any",
  })
  async app(
    @graphql.Parent() parent: Role,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Application | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Application",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .app();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
