import { ArgsType, Field } from "@nestjs/graphql";
import { RegionWhereInput } from "./RegionWhereInput";

@ArgsType()
class FindManyRegionArgs {
  @Field(() => RegionWhereInput, { nullable: true })
  where?: RegionWhereInput;
}

export { FindManyRegionArgs };
