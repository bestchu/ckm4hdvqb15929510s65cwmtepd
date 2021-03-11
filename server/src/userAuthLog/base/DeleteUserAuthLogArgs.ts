import { ArgsType, Field } from "@nestjs/graphql";
import { UserAuthLogWhereUniqueInput } from "./UserAuthLogWhereUniqueInput";

@ArgsType()
class DeleteUserAuthLogArgs {
  @Field(() => UserAuthLogWhereUniqueInput, { nullable: false })
  where!: UserAuthLogWhereUniqueInput;
}

export { DeleteUserAuthLogArgs };
