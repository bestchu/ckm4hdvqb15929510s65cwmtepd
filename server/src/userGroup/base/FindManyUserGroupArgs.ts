import { ArgsType, Field } from "@nestjs/graphql";
import { UserGroupWhereInput } from "./UserGroupWhereInput";

@ArgsType()
class FindManyUserGroupArgs {
  @Field(() => UserGroupWhereInput, { nullable: true })
  where?: UserGroupWhereInput;
}

export { FindManyUserGroupArgs };
