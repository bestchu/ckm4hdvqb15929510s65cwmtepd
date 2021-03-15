import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ApplicationWhereUniqueInput } from "../../application/base/ApplicationWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class RoleCreateInput {
  @ApiProperty({
    required: true,
    type: ApplicationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ApplicationWhereUniqueInput)
  @Field(() => ApplicationWhereUniqueInput)
  app!: ApplicationWhereUniqueInput;
}
export { RoleCreateInput };
