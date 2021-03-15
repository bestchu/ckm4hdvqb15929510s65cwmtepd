import { ArgsType, Field } from "@nestjs/graphql";
import { ApplicationWhereUniqueInput } from "./ApplicationWhereUniqueInput";

@ArgsType()
class DeleteApplicationArgs {
  @Field(() => ApplicationWhereUniqueInput, { nullable: false })
  where!: ApplicationWhereUniqueInput;
}

export { DeleteApplicationArgs };
