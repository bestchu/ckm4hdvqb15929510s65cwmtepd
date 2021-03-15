import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UserGroupResolverBase } from "./base/userGroup.resolver.base";
import { UserGroup } from "./base/UserGroup";
import { UserGroupService } from "./userGroup.service";

@graphql.Resolver(() => UserGroup)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserGroupResolver extends UserGroupResolverBase {
  constructor(
    protected readonly service: UserGroupService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
