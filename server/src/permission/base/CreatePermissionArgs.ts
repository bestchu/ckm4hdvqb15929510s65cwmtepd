import { ArgsType, Field } from "@nestjs/graphql";
import { PermissionCreateInput } from "./PermissionCreateInput";

@ArgsType()
class CreatePermissionArgs {
  @Field(() => PermissionCreateInput, { nullable: false })
  data!: PermissionCreateInput;
}

export { CreatePermissionArgs };
