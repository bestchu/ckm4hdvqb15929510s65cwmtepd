import { ApplicationWhereUniqueInput } from "../application/ApplicationWhereUniqueInput";

export type PermissionWhereInput = {
  createdAt?: Date;
  id?: string;
  updatedAt?: Date;
  app?: ApplicationWhereUniqueInput;
};
