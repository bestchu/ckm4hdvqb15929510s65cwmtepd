import { ArgsType, Field } from "@nestjs/graphql";
import { PermissionWhereUniqueInput } from "./PermissionWhereUniqueInput";

@ArgsType()
class FindOnePermissionArgs {
  @Field(() => PermissionWhereUniqueInput, { nullable: false })
  where!: PermissionWhereUniqueInput;
}

export { FindOnePermissionArgs };
