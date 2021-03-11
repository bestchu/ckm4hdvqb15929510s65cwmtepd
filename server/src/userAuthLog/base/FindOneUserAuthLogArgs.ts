import { ArgsType, Field } from "@nestjs/graphql";
import { UserAuthLogWhereUniqueInput } from "./UserAuthLogWhereUniqueInput";

@ArgsType()
class FindOneUserAuthLogArgs {
  @Field(() => UserAuthLogWhereUniqueInput, { nullable: false })
  where!: UserAuthLogWhereUniqueInput;
}

export { FindOneUserAuthLogArgs };
