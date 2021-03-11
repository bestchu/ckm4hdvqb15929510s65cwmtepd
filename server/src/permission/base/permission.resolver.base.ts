import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreatePermissionArgs } from "./CreatePermissionArgs";
import { UpdatePermissionArgs } from "./UpdatePermissionArgs";
import { DeletePermissionArgs } from "./DeletePermissionArgs";
import { FindManyPermissionArgs } from "./FindManyPermissionArgs";
import { FindOnePermissionArgs } from "./FindOnePermissionArgs";
import { Permission } from "./Permission";
import { FindManyRoleArgs } from "../../role/base/FindManyRoleArgs";
import { Role } from "../../role/base/Role";
import { Application } from "../../application/base/Application";
import { PermissionService } from "../permission.service";

@graphql.Resolver(() => Permission)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PermissionResolverBase {
  constructor(
    protected readonly service: PermissionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Permission])
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "any",
  })
  async permissions(
    @graphql.Args() args: FindManyPermissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Permission",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Permission, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "own",
  })
  async permission(
    @graphql.Args() args: FindOnePermissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Permission",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Permission)
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "create",
    possession: "any",
  })
  async createPermission(
    @graphql.Args() args: CreatePermissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Permission",
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
        `providing the properties: ${properties} on ${"Permission"} creation is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Permission)
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "update",
    possession: "any",
  })
  async updatePermission(
    @graphql.Args() args: UpdatePermissionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Permission",
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
        `providing the properties: ${properties} on ${"Permission"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Permission)
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "delete",
    possession: "any",
  })
  async deletePermission(
    @graphql.Args() args: DeletePermissionArgs
  ): Promise<Permission | null> {
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

  @graphql.ResolveField(() => [Role])
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "any",
  })
  async roles(
    @graphql.Parent() parent: Permission,
    @graphql.Args() args: FindManyRoleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Role[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Role",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .roles(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Application, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "any",
  })
  async app(
    @graphql.Parent() parent: Permission,
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
