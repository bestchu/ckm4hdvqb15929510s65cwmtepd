import { ArgsType, Field } from "@nestjs/graphql";
import { ApplicationWhereInput } from "./ApplicationWhereInput";

@ArgsType()
class FindManyApplicationArgs {
  @Field(() => ApplicationWhereInput, { nullable: true })
  where?: ApplicationWhereInput;
}

export { FindManyApplicationArgs };
