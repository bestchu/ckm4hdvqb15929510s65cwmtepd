import { ArgsType, Field } from "@nestjs/graphql";
import { PermissionWhereInput } from "./PermissionWhereInput";

@ArgsType()
class FindManyPermissionArgs {
  @Field(() => PermissionWhereInput, { nullable: true })
  where?: PermissionWhereInput;
}

export { FindManyPermissionArgs };
