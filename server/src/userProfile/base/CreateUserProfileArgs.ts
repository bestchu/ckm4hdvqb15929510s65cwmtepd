import { ArgsType, Field } from "@nestjs/graphql";
import { UserProfileCreateInput } from "./UserProfileCreateInput";

@ArgsType()
class CreateUserProfileArgs {
  @Field(() => UserProfileCreateInput, { nullable: false })
  data!: UserProfileCreateInput;
}

export { CreateUserProfileArgs };
