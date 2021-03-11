import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RegionService } from "./region.service";
import { RegionControllerBase } from "./base/region.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("regions")
@common.Controller("regions")
export class RegionController extends RegionControllerBase {
  constructor(
    protected readonly service: RegionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
