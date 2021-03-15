import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UserAuthLogResolverBase } from "./base/userAuthLog.resolver.base";
import { UserAuthLog } from "./base/UserAuthLog";
import { UserAuthLogService } from "./userAuthLog.service";

@graphql.Resolver(() => UserAuthLog)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserAuthLogResolver extends UserAuthLogResolverBase {
  constructor(
    protected readonly service: UserAuthLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
