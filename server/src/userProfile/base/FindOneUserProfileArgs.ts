import { ArgsType, Field } from "@nestjs/graphql";
import { UserProfileWhereUniqueInput } from "./UserProfileWhereUniqueInput";

@ArgsType()
class FindOneUserProfileArgs {
  @Field(() => UserProfileWhereUniqueInput, { nullable: false })
  where!: UserProfileWhereUniqueInput;
}

export { FindOneUserProfileArgs };
