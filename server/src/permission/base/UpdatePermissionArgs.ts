import { ArgsType, Field } from "@nestjs/graphql";
import { PermissionWhereUniqueInput } from "./PermissionWhereUniqueInput";
import { PermissionUpdateInput } from "./PermissionUpdateInput";

@ArgsType()
class UpdatePermissionArgs {
  @Field(() => PermissionWhereUniqueInput, { nullable: false })
  where!: PermissionWhereUniqueInput;
  @Field(() => PermissionUpdateInput, { nullable: false })
  data!: PermissionUpdateInput;
}

export { UpdatePermissionArgs };
