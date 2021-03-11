import { ArgsType, Field } from "@nestjs/graphql";
import { RegionWhereUniqueInput } from "./RegionWhereUniqueInput";

@ArgsType()
class FindOneRegionArgs {
  @Field(() => RegionWhereUniqueInput, { nullable: false })
  where!: RegionWhereUniqueInput;
}

export { FindOneRegionArgs };
