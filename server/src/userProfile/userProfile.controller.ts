import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserProfileService } from "./userProfile.service";
import { UserProfileControllerBase } from "./base/userProfile.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("user-profiles")
@common.Controller("user-profiles")
export class UserProfileController extends UserProfileControllerBase {
  constructor(
    protected readonly service: UserProfileService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
