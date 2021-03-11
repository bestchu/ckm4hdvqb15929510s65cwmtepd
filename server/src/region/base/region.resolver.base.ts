import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteRegionArgs } from "./DeleteRegionArgs";
import { FindManyRegionArgs } from "./FindManyRegionArgs";
import { FindOneRegionArgs } from "./FindOneRegionArgs";
import { Region } from "./Region";
import { RegionService } from "../region.service";

@graphql.Resolver(() => Region)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RegionResolverBase {
  constructor(
    protected readonly service: RegionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Region])
  @nestAccessControl.UseRoles({
    resource: "Region",
    action: "read",
    possession: "any",
  })
  async regions(
    @graphql.Args() args: FindManyRegionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Region[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Region",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Region, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Region",
    action: "read",
    possession: "own",
  })
  async region(
    @graphql.Args() args: FindOneRegionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Region | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Region",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Region)
  @nestAccessControl.UseRoles({
    resource: "Region",
    action: "delete",
    possession: "any",
  })
  async deleteRegion(
    @graphql.Args() args: DeleteRegionArgs
  ): Promise<Region | null> {
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
}
