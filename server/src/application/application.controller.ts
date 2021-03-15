import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ApplicationService } from "./application.service";
import { ApplicationControllerBase } from "./base/application.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("applications")
@common.Controller("applications")
export class ApplicationController extends ApplicationControllerBase {
  constructor(
    protected readonly service: ApplicationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
