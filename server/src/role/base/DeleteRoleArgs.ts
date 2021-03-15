import { ArgsType, Field } from "@nestjs/graphql";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";

@ArgsType()
class DeleteRoleArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
}

export { DeleteRoleArgs };
