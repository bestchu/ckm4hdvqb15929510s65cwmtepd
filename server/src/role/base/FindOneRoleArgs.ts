import { ArgsType, Field } from "@nestjs/graphql";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";

@ArgsType()
class FindOneRoleArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
}

export { FindOneRoleArgs };
