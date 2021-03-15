import { ArgsType, Field } from "@nestjs/graphql";
import { UserGroupWhereUniqueInput } from "./UserGroupWhereUniqueInput";

@ArgsType()
class FindOneUserGroupArgs {
  @Field(() => UserGroupWhereUniqueInput, { nullable: false })
  where!: UserGroupWhereUniqueInput;
}

export { FindOneUserGroupArgs };
