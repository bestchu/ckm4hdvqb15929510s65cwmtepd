import { ApplicationWhereUniqueInput } from "../application/ApplicationWhereUniqueInput";

export type RoleWhereInput = {
  app?: ApplicationWhereUniqueInput;
  createdAt?: Date;
  id?: string;
  updatedAt?: Date;
};
