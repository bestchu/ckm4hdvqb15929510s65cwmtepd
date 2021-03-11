import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UserProfileResolverBase } from "./base/userProfile.resolver.base";
import { UserProfile } from "./base/UserProfile";
import { UserProfileService } from "./userProfile.service";

@graphql.Resolver(() => UserProfile)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserProfileResolver extends UserProfileResolverBase {
  constructor(
    protected readonly service: UserProfileService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
