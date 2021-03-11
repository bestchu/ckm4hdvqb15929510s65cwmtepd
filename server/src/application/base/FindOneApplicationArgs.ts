import { ArgsType, Field } from "@nestjs/graphql";
import { ApplicationWhereUniqueInput } from "./ApplicationWhereUniqueInput";

@ArgsType()
class FindOneApplicationArgs {
  @Field(() => ApplicationWhereUniqueInput, { nullable: false })
  where!: ApplicationWhereUniqueInput;
}

export { FindOneApplicationArgs };
