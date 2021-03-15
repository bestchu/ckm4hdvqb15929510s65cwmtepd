import { ArgsType, Field } from "@nestjs/graphql";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";
import { RoleUpdateInput } from "./RoleUpdateInput";

@ArgsType()
class UpdateRoleArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
  @Field(() => RoleUpdateInput, { nullable: false })
  data!: RoleUpdateInput;
}

export { UpdateRoleArgs };
