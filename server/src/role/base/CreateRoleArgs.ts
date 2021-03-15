import { ArgsType, Field } from "@nestjs/graphql";
import { RoleCreateInput } from "./RoleCreateInput";

@ArgsType()
class CreateRoleArgs {
  @Field(() => RoleCreateInput, { nullable: false })
  data!: RoleCreateInput;
}

export { CreateRoleArgs };
