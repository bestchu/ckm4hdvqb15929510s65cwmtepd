import { ArgsType, Field } from "@nestjs/graphql";
import { PermissionWhereUniqueInput } from "./PermissionWhereUniqueInput";

@ArgsType()
class DeletePermissionArgs {
  @Field(() => PermissionWhereUniqueInput, { nullable: false })
  where!: PermissionWhereUniqueInput;
}

export { DeletePermissionArgs };
