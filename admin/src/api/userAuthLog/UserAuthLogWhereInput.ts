import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserAuthLogWhereInput = {
  createdAt?: Date;
  id?: string;
  updatedAt?: Date;
  user?: UserWhereUniqueInput;
};
