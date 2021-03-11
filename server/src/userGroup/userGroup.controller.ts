import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserGroupService } from "./userGroup.service";
import { UserGroupControllerBase } from "./base/userGroup.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("user-groups")
@common.Controller("user-groups")
export class UserGroupController extends UserGroupControllerBase {
  constructor(
    protected readonly service: UserGroupService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
