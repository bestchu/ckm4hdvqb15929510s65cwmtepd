import { ArgsType, Field } from "@nestjs/graphql";
import { RoleWhereInput } from "./RoleWhereInput";

@ArgsType()
class FindManyRoleArgs {
  @Field(() => RoleWhereInput, { nullable: true })
  where?: RoleWhereInput;
}

export { FindManyRoleArgs };
