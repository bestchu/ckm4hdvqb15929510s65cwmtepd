import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ApplicationWhereUniqueInput } from "../../application/base/ApplicationWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class PermissionUpdateInput {
  @ApiProperty({
    required: false,
    type: ApplicationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ApplicationWhereUniqueInput)
  @IsOptional()
  @Field(() => ApplicationWhereUniqueInput, {
    nullable: true,
  })
  app?: ApplicationWhereUniqueInput;
}
export { PermissionUpdateInput };
