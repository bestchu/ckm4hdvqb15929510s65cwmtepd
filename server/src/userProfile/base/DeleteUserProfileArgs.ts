import { ArgsType, Field } from "@nestjs/graphql";
import { UserProfileWhereUniqueInput } from "./UserProfileWhereUniqueInput";

@ArgsType()
class DeleteUserProfileArgs {
  @Field(() => UserProfileWhereUniqueInput, { nullable: false })
  where!: UserProfileWhereUniqueInput;
}

export { DeleteUserProfileArgs };
