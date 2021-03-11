import { ArgsType, Field } from "@nestjs/graphql";
import { UserGroupWhereUniqueInput } from "./UserGroupWhereUniqueInput";

@ArgsType()
class DeleteUserGroupArgs {
  @Field(() => UserGroupWhereUniqueInput, { nullable: false })
  where!: UserGroupWhereUniqueInput;
}

export { DeleteUserGroupArgs };
