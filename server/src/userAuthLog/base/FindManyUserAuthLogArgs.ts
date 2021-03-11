import { ArgsType, Field } from "@nestjs/graphql";
import { UserAuthLogWhereInput } from "./UserAuthLogWhereInput";

@ArgsType()
class FindManyUserAuthLogArgs {
  @Field(() => UserAuthLogWhereInput, { nullable: true })
  where?: UserAuthLogWhereInput;
}

export { FindManyUserAuthLogArgs };
