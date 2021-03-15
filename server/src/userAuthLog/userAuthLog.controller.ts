import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserAuthLogService } from "./userAuthLog.service";
import { UserAuthLogControllerBase } from "./base/userAuthLog.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("user-auth-logs")
@common.Controller("user-auth-logs")
export class UserAuthLogController extends UserAuthLogControllerBase {
  constructor(
    protected readonly service: UserAuthLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
