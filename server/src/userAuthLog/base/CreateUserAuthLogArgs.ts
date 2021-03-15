import { ArgsType, Field } from "@nestjs/graphql";
import { UserAuthLogCreateInput } from "./UserAuthLogCreateInput";

@ArgsType()
class CreateUserAuthLogArgs {
  @Field(() => UserAuthLogCreateInput, { nullable: false })
  data!: UserAuthLogCreateInput;
}

export { CreateUserAuthLogArgs };
