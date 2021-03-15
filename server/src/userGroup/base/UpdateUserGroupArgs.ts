import { ArgsType, Field } from "@nestjs/graphql";
import { UserGroupWhereUniqueInput } from "./UserGroupWhereUniqueInput";
import { UserGroupUpdateInput } from "./UserGroupUpdateInput";

@ArgsType()
class UpdateUserGroupArgs {
  @Field(() => UserGroupWhereUniqueInput, { nullable: false })
  where!: UserGroupWhereUniqueInput;
  @Field(() => UserGroupUpdateInput, { nullable: false })
  data!: UserGroupUpdateInput;
}

export { UpdateUserGroupArgs };
