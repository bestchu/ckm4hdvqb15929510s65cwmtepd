import { ArgsType, Field } from "@nestjs/graphql";
import { UserGroupCreateInput } from "./UserGroupCreateInput";

@ArgsType()
class CreateUserGroupArgs {
  @Field(() => UserGroupCreateInput, { nullable: false })
  data!: UserGroupCreateInput;
}

export { CreateUserGroupArgs };
