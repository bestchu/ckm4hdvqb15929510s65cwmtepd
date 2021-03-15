import { ArgsType, Field } from "@nestjs/graphql";
import { RegionWhereUniqueInput } from "./RegionWhereUniqueInput";

@ArgsType()
class DeleteRegionArgs {
  @Field(() => RegionWhereUniqueInput, { nullable: false })
  where!: RegionWhereUniqueInput;
}

export { DeleteRegionArgs };
