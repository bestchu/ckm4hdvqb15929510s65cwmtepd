import { ArgsType, Field } from "@nestjs/graphql";
import { UserProfileWhereUniqueInput } from "./UserProfileWhereUniqueInput";
import { UserProfileUpdateInput } from "./UserProfileUpdateInput";

@ArgsType()
class UpdateUserProfileArgs {
  @Field(() => UserProfileWhereUniqueInput, { nullable: false })
  where!: UserProfileWhereUniqueInput;
  @Field(() => UserProfileUpdateInput, { nullable: false })
  data!: UserProfileUpdateInput;
}

export { UpdateUserProfileArgs };
