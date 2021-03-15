import { ArgsType, Field } from "@nestjs/graphql";
import { UserAuthLogWhereUniqueInput } from "./UserAuthLogWhereUniqueInput";
import { UserAuthLogUpdateInput } from "./UserAuthLogUpdateInput";

@ArgsType()
class UpdateUserAuthLogArgs {
  @Field(() => UserAuthLogWhereUniqueInput, { nullable: false })
  where!: UserAuthLogWhereUniqueInput;
  @Field(() => UserAuthLogUpdateInput, { nullable: false })
  data!: UserAuthLogUpdateInput;
}

export { UpdateUserAuthLogArgs };
