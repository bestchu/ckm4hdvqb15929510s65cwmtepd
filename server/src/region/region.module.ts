import { Module } from "@nestjs/common";
import { RegionModuleBase } from "./base/region.module.base";
import { RegionService } from "./region.service";
import { RegionController } from "./region.controller";
import { RegionResolver } from "./region.resolver";

@Module({
  imports: [RegionModuleBase],
  controllers: [RegionController],
  providers: [RegionService, RegionResolver],
  exports: [RegionService],
})
export class RegionModule {}
