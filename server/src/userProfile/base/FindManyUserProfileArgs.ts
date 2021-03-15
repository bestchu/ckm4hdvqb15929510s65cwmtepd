import { ArgsType, Field } from "@nestjs/graphql";
import { UserProfileWhereInput } from "./UserProfileWhereInput";

@ArgsType()
class FindManyUserProfileArgs {
  @Field(() => UserProfileWhereInput, { nullable: true })
  where?: UserProfileWhereInput;
}

export { FindManyUserProfileArgs };
