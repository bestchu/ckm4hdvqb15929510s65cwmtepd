import { PrismaService } from "nestjs-prisma";
import {
  FindOneRegionArgs,
  FindManyRegionArgs,
  RegionCreateArgs,
  RegionUpdateArgs,
  RegionDeleteArgs,
  Subset,
} from "@prisma/client";

export class RegionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyRegionArgs>(args: Subset<T, FindManyRegionArgs>) {
    return this.prisma.region.findMany(args);
  }
  findOne<T extends FindOneRegionArgs>(args: Subset<T, FindOneRegionArgs>) {
    return this.prisma.region.findOne(args);
  }
  create<T extends RegionCreateArgs>(args: Subset<T, RegionCreateArgs>) {
    return this.prisma.region.create<T>(args);
  }
  update<T extends RegionUpdateArgs>(args: Subset<T, RegionUpdateArgs>) {
    return this.prisma.region.update<T>(args);
  }
  delete<T extends RegionDeleteArgs>(args: Subset<T, RegionDeleteArgs>) {
    return this.prisma.region.delete(args);
  }
}
